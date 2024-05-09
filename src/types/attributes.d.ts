export interface Attribute {
  key: string
  value: number | string
}

export interface PlayerAttributes {
  attributes: Record<string, Attribute>
}
