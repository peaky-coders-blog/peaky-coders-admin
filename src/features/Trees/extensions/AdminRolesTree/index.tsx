import { Tree } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import { getDefaultSelectedItems, rolesToTreeData } from '../../utils/treeData'

import { Loader } from 'components/Loader'
import { I_AdminRole } from 'models/roles'
import { rolesAPI } from 'services/roles'

interface I_AdminRolesTreeProps {
  onChange: (values: any[]) => void
  adminRoles: I_AdminRole[]
}

export const AdminRolesTree = ({ onChange, adminRoles }: I_AdminRolesTreeProps) => {
  const [selectedItems, setSelectedItems] = useState<string[] | null>(null)

  // Получение ролей
  const [fetchGetRoles, { data: rolesData, isLoading: isRolesLoading }] =
    rolesAPI.useLazyGetRolesQuery()

  const treeData = useMemo(
    () => (rolesData?.data ? rolesToTreeData(rolesData.data, true) : []),
    [rolesData],
  )

  useEffect(() => {
    fetchGetRoles(null)
  }, [fetchGetRoles])

  useEffect(() => {
    if (rolesData?.data) {
      const values = getDefaultSelectedItems(treeData, adminRoles)
      setSelectedItems(values)

      const rolesIds = treeData
        .map((item) => (values.includes(String(item.key)) ? item.id : null))
        .filter((id) => id)
      if (rolesIds.length) {
        onChange(rolesIds as number[])
      }
    }
  }, [adminRoles, onChange, rolesData, treeData])

  const handleCheckTree = (values: any) => {
    setSelectedItems(values)
    const rolesIds = treeData
      .map((item) => (values.includes(String(item.key)) ? item.id : null))
      .filter((id) => id)
    onChange(rolesIds)
  }

  if (isRolesLoading) {
    return <Loader relative />
  }

  if (selectedItems) {
    return (
      <Tree
        checkedKeys={selectedItems}
        defaultExpandedKeys={['0', '1', '2']}
        onCheck={handleCheckTree}
        showLine={{ showLeafIcon: false }}
        checkable
        treeData={treeData}
      />
    )
  }

  return null
}
