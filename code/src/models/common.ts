export type Level = {
  key: string
  tile: string
  main: string
  ground: string
  layers: {
    key: string
    collisions?: number[][]
  }[]
}

export type SaveFileLevel = {
  name: string
  progress: number
}

export type SaveFile = {
  version: number
  level: string
  levels: Array<SaveFileLevel>
  position: {
    x: number
    y: number
  }
}
