import assets from '../../config/assets.json'
import general from '../../config/general.json'
import BaseSprite from '../BaseSprite'

export default class NonPlayerCharacter extends BaseSprite {
  protected player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

  public preload(): void {
    this.scene.load.multiatlas(this.config.key, this.config.path, this.config.baseUrl)
    super.preload()
  }

  public create(): void {
    if (!this.player) {
      this.player = this.scene.physics.add.sprite(
        assets.platform.width / 2,
        general.height - assets.platform.height - this.config.frames.frameHeight / 2,
        this.config.key,
        this.config.start,
      )
    }

    this.player.setBounce(0)
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
    this.player.anims.play(`${this.config.key}-walk`)
    super.create()
  }

  addCollider = (
    collideWith:
      | Phaser.GameObjects.GameObject
      | Phaser.GameObjects.Group
      | Phaser.GameObjects.GameObject[]
      | Phaser.GameObjects.Group[],
  ): void => {
    this.scene.physics.add.collider(this.player, collideWith)
  }
}
