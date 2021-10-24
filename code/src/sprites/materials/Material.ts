import { AssetDefinition } from '../../models/common'
import BaseSprite from '../BaseSprite'

export default class Material extends BaseSprite {
  protected material!: Phaser.GameObjects.Sprite

  public constructor(scene: Phaser.Scene, config: AssetDefinition) {
    super(scene, config)
  }

  public preload(): void {
    this.scene.load.multiatlas(this.config.key, this.config.path, this.config.baseUrl)
    super.preload()
  }

  public create(): void {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    return
  }
}
