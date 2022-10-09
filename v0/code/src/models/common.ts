export type Frames = {
  frameWidth: number
  frameHeight: number
  start?: number
  end?: number
  frameRate?: number
  repeat?: number
}
export type AssetDefinition = {
  key: string
  value: string
  width: number
  height: number
  path?: string
  frames?: Frames
}

export type GameConfig = Phaser.Core.Config & { showCommands: boolean }
