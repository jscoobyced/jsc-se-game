import assets from '../../config/assets.json'
import general from '../../config/general.json'
import BaseSprite from '../BaseSprite'

export default class PlayerCharacter extends BaseSprite {
  protected player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    null as unknown as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  protected hasTakenAction = false

  public create(): void {
    if (!this.player) {
      this.player = this.scene.physics.add.sprite(
        assets.platform.width / 2,
        general.height - assets.platform.height - this.config.frameHeight / 2,
        this.config.key,
      )
    }

    this.player.setBounce(0)
    this.player.setCollideWorldBounds(true)
    this.config.animations.forEach((animation) => {
      const frames: Phaser.Types.Animations.AnimationFrame[] = []
      if (!animation.frame && (animation.start || animation.start === 0) && (animation.end || animation.end === 0)) {
        this.scene.anims
          .generateFrameNumbers(this.config.key, {
            start: animation.start,
            end: animation.end,
          })
          .forEach((frame) => {
            frames.push(frame)
          })
      } else if (animation.frame) {
        frames.push({ key: this.config.key, frame: animation.frame })
      }
      this.scene.anims.create({
        key: animation.key,
        frames,
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      })
    })
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

  hasInteracted = (): boolean => {
    return this.hasTakenAction
  }
}
