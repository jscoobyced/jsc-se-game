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
