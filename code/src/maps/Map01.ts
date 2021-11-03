import Material from '../sprites/materials/Material'
import Grass from '../sprites/materials/static/Grass'
import assets from '../config/assets.json'

export default class Map01 extends Material {
  private grass!: Material
  private created = false

  public preload(): void {
    this.grass = new Grass(this.scene, assets.grass)
    this.grass.preload()
  }

  public create(): void {
    if (!this.created) {
      this.grass.create()
      this.created = true
    }
  }

  public hide(): void {
    this.grass.hide()
  }

  public show(): void {
    this.grass.show()
  }
}
