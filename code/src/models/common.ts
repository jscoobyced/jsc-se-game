export type AssetAnimation = {
  key: string
  frameRate: number
  start?: number
  end?: number
  frame?: number
  repeat?: number
}

export type AssetDefinition = {
  key: string
  value: string
  frameWidth: number
  frameHeight: number
  animations: AssetAnimation[]
}
