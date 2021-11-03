import { Scene } from 'phaser'
import { AssetDefinition } from '../models/common'
import Material from '../sprites/materials/Material'
import Map01 from './Map01'

export default class MapManager {
  private currentMapX = 1
  private currentMapY = 1
  private mapHeight = 3
  private mapWidth = 3
  private maps: Material[] = []

  public createWorld(scene: Scene): void {
    for (let index = 0; index < this.mapHeight * this.mapWidth; index++) {
      const map01 = new Map01(scene, undefined as unknown as AssetDefinition)
      map01.preload()
      this.maps.push(map01)
    }
  }

  public mapId = (): number => {
    return this.currentMapX + this.currentMapY * this.mapWidth
  }

  public displayCurrentMap(previousMap?: number): void {
    if (previousMap != undefined && previousMap >= 0) {
      this.maps[previousMap].hide()
    }
    this.maps[this.mapId()].create()
    this.maps[this.mapId()].show()
  }

  public north = (): void => {
    this.currentMapY = this.currentMapY + 1
    if (this.currentMapY >= this.mapHeight) {
      this.currentMapY = this.mapHeight - 1
    }
  }

  public south = (): void => {
    this.currentMapY = this.currentMapY - 1
    if (this.currentMapY <= 0) {
      this.currentMapY = 0
    }
  }

  public east = (): void => {
    this.currentMapX = this.currentMapX + 1
    if (this.currentMapX >= this.mapWidth) {
      this.currentMapX = this.mapWidth - 1
    }
  }

  public west = (): void => {
    this.currentMapX = this.currentMapX - 1
    if (this.currentMapX <= 0) {
      this.currentMapX = 0
    }
  }
}
