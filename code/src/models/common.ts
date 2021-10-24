export type Frames = {
  frameWidth: number
  frameHeight: number
  start?: number
  end?: number
  framerate?: number
  repeat?: number
}

export type AssetDefinition = {
  key: string
  value: string
  start?: string
  path?: string
  baseUrl?: string
  frames: Frames
}
