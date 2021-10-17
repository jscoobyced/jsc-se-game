import { AssetDefinition } from '../../models/common'
import BaseSprite from '../BaseSprite'

export default class Material extends BaseSprite {
  protected material: Phaser.GameObjects.Group = null as unknown as Phaser.GameObjects.Group
  protected materialCount = 1

  public constructor(scene: Phaser.Scene, config: AssetDefinition, materialCount: number) {
    super(scene, config)
    this.materialCount = materialCount
  }

  public create(): void {
    if (!this.material) {
      const materialChildren: Phaser.GameObjects.GameObject[] = []
      this.material = this.scene.add.group(materialChildren)
    }

    this.scene.anims.create({
      key: this.config.key,
      frames: this.scene.anims.generateFrameNumbers(this.config.key, { start: 0, end: 2 }),
      frameRate: 5,
    })
  }

  public update(): void {
    return
  }
}
