export interface IconProps {
  className?: string
}

export type ElementGroupName = string

export interface ElementGroup {
  selector: string
  accessibleName: string
  orderNumber: number
}

export type ElementGroups = Record<ElementGroupName, ElementGroup[]>
