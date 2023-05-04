import { Tree } from 'antd'
import { useMemo } from 'react'

import { rolesToTreeData } from '../../utils/treeData'

import { I_Role } from 'models/roles'

interface I_RoleTreeProps {
  roles: I_Role[]
}

export const RoleTree = ({ roles }: I_RoleTreeProps) => {
  const treeData = useMemo(() => rolesToTreeData(roles, false), [roles])

  return <Tree defaultExpandAll showLine={{ showLeafIcon: false }} checkable treeData={treeData} />
}
