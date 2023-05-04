import { Tree } from 'antd'

import { permissionsToTreeData } from 'features/FormRole/utils/treeData'

interface I_PermissionsSectionProps {
  onChange: (permissions: string[]) => void
  value: string[]
}

export const PermissionsSection = ({ onChange, value }: I_PermissionsSectionProps) => {
  const treeData = permissionsToTreeData()

  const handleCheck = (values: any) => {
    onChange(values as string[])
  }

  return <Tree treeData={treeData} checkedKeys={value} checkable onCheck={handleCheck} />
}
