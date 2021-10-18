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

    const frameNames = this.scene.anims.generateFrameNames(this.config.key, {
      start: this.config.frames.start,
      end: this.config.frames.end,
      zeroPad: 2,
      prefix: '',
      suffix: '.png',
    })
    this.scene.anims.create({
      key: `${this.config.key}-walk`,
      frames: frameNames,
      frameRate: this.config.frames.framerate,
      repeat: this.config.frames.repeat,
    })
    this.material.children.iterate((child) => {
      const material = child as Phaser.GameObjects.Sprite
      material.anims.play(`${this.config.key}-walk`, true)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    return
  }
}
