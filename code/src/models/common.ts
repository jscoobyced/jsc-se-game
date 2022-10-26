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

export type SaveFile = {
  level: {
    name: string
    progress: number
  }
  position: {
    x: number
    y: number
  }
}
