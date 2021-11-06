import Material from '../sprites/materials/Material'
import Grass from '../sprites/materials/static/Grass'
import assets from '../config/assets.json'
import Map01 from './01/Map01'
import { AssetDefinition } from '../models/common'

export default class Maps extends Material {
  private grass!: Material
  private maps!: Map01
  private mapNumber = 0

  public constructor(scene: Phaser.Scene, mapNumber: number) {
    super(scene, undefined as unknown as AssetDefinition)
    this.mapNumber = mapNumber
  }

  public preload(): void {
    this.grass = new Grass(this.scene, assets.grass)
    this.maps = new Map01(this.scene, assets.map01, this.mapNumber)
    this.grass.preload()
    this.maps.preload()
  }

  public create(): void {
    this.maps.create()
    this.grass.create()
    this.hide()
  }

  public hide(): void {
    this.grass.hide()
    this.maps.hide()
  }

  public show(): void {
    this.grass.show()
    this.maps.show()
  }
}
