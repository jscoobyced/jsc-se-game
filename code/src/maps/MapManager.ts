export default class MapManager {
  private currentMapX = 3
  private currentMapY = 3
  private mapHeight = 5
  private mapWidth = 5

  public mapId = (): number => {
    return this.currentMapX * this.currentMapY
  }

  public north = (): number => {
    this.currentMapY = this.currentMapY + 1
    if (this.currentMapY >= this.mapHeight) {
      this.currentMapY = this.mapHeight
    }
    return this.mapId()
  }

  public south = (): number => {
    this.currentMapY = this.currentMapY - 1
    if (this.currentMapY <= 1) {
      this.currentMapY = 1
    }
    return this.mapId()
  }

  public east = (): number => {
    this.currentMapX = this.currentMapX + 1
    if (this.currentMapX >= this.mapWidth) {
      this.currentMapX = this.mapWidth
    }
    return this.mapId()
  }

  public west = (): number => {
    this.currentMapX = this.currentMapX - 1
    if (this.currentMapX <= 1) {
      this.currentMapX = 1
    }
    return this.mapId()
  }
}
