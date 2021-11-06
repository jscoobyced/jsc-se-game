import { AssetDefinition } from '../../models/common'
import Material from '../../sprites/materials/Material'

export default class Map01 extends Material {
  private regionWidth = 6
  private regionHeight = 6
  private container: Phaser.Types.Physics.Arcade.SpriteWithStaticBody[] = []
  private mapNumber = 0

  public constructor(scene: Phaser.Scene, config: AssetDefinition, mapNumber: number) {
    super(scene, config)
    this.mapNumber = mapNumber
  }

  public create(): void {
    super.create()
    const w = this.config.frames?.frameWidth || 128
    const h = this.config.frames?.frameHeight || 128

    for (let i = 0; i < this.regionWidth; i++) {
      for (let j = 0; j < this.regionHeight; j++) {
        const image = this.getImage(i, j)
        const region = this.scene.physics.add.staticSprite(i * w + w / 2, j * h + h / 2, this.config.key, image)
        this.container.push(region)
      }
    }
  }

  public hide(): void {
    for (const grass of this.container) {
      grass.visible = false
    }
  }

  public show(): void {
    for (const grass of this.container) {
      grass.visible = true
    }
  }

  private getImage = (i: number, j: number): string => {
    if (i === 0 && j === 0 && this.mapNumber === 7) return '01.png'
    else if (i === 0 && j === this.regionHeight - 1 && this.mapNumber === 1) return '07.png'
    else if (i === this.regionWidth - 1 && j === 0 && this.mapNumber === 9) return '03.png'
    else if (i === this.regionWidth - 1 && j === this.regionHeight - 1 && this.mapNumber === 3) return '09.png'
    else if (j === 0 && [7, 8, 9].includes(this.mapNumber)) return '02.png'
    else if (i === this.regionWidth - 1 && [3, 6, 9].includes(this.mapNumber)) return '06.png'
    else if (i === 0 && [1, 4, 7].includes(this.mapNumber)) return '04.png'
    else if (j === this.regionHeight - 1 && [1, 2, 3].includes(this.mapNumber)) return '08.png'
    else return '05.png'
  }
}
