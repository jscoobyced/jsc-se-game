import { AssetDefinition } from '../models/common'

export default class BaseSprite {
  protected scene: Phaser.Scene
  protected config: AssetDefinition

  public constructor(scene: Phaser.Scene, config: AssetDefinition) {
    this.scene = scene
    this.config = config
  }

  public preload(): void {
    this.scene.load.spritesheet(this.config.key, this.config.value, {
      frameWidth: this.config.frameWidth,
      frameHeight: this.config.frameHeight,
    })
  }

  public create(): void {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    return
  }
}
