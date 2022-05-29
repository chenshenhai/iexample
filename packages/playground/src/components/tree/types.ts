
export interface TreeDataItem {
  id: string,
  text: string,
  children?: TreeDataItem[]
}

export type TreeData = TreeDataItem[];