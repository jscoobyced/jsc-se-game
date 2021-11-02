import BaseSprite from '../../BaseSprite'
import general from '../../../config/general.json'

export default class Hero extends BaseSprite {
  private walkRightAnimation!: false | Phaser.Animations.Animation
  private walkLeftAnimation!: false | Phaser.Animations.Animation
  private defaultWidth = 85
  private defaultHeight = 85
  private player!: Phaser.Types.Physics.Arcade.SpriteWithStaticBody
  private currentAnimation!: false | Phaser.Animations.Animation
  private pointerRight = false
  private pointerLeft = false
  private pointerUp = false
  private pointerDown = false

  preload(): void {
    super.preload()
    this.scene.load.multiatlas(this.config.key, this.config.path, general.baseUrls.images)
  }

  create(): void {
    this.player = this.scene.physics.add
      .staticSprite(
        this.gameWidth() / 2 - (this.config.frames?.frameWidth || this.defaultWidth) / 2,
        this.gameHeight() / 2 - (this.config.frames?.frameHeight || this.defaultHeight) / 2,
        this.config.key,
        '01.png',
      )
      .setBounce(0)

    const walkRightFrameNumbers = this.scene.anims.generateFrameNames(this.config.key, {
      start: 5,
      end: 8,
      zeroPad: 2,
      prefix: '',
      suffix: '.png',
    })

    const walkRightConfig = {
      key: 'walk-right',
      frames: walkRightFrameNumbers,
      frameRate: 6,
      repeat: -1,
    }
    const walkLeftFrameNumbers = this.scene.anims.generateFrameNames(this.config.key, {
      start: 1,
      end: 4,
      zeroPad: 2,
      prefix: '',
      suffix: '.png',
    })

    const walkLeftConfig = {
      key: 'walk-left',
      frames: walkLeftFrameNumbers,
      frameRate: 6,
      repeat: -1,
    }

    this.walkRightAnimation = this.scene.anims.create(walkRightConfig)
    this.walkLeftAnimation = this.scene.anims.create(walkLeftConfig)
  }

  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    super.update(cursors, time, delta)
    this.updatePointerPosition()
    let moveX = 0
    let moveY = 0
    if (cursors.right.isDown || this.pointerRight) {
      this.updateAnimation(this.walkRightAnimation)
      moveX = delta / 8
      if (this.player.x > this.gameWidth()) {
        this.player.x = 0
        this.mapManager.east()
      }
    } else if (cursors.left.isDown || this.pointerLeft) {
      this.updateAnimation(this.walkLeftAnimation)
      moveX = -delta / 8
      if (this.player.x < 0) {
        this.player.x = this.gameWidth()
        this.mapManager.west()
      }
    }
    if (cursors.down.isDown || this.pointerDown) {
      moveY = delta / 8
      if (this.player.y > this.gameHeight()) {
        this.player.y = 0
        this.mapManager.south()
      }
    } else if (cursors.up.isDown || this.pointerUp) {
      moveY = -delta / 8
      if (this.player.y < 0) {
        this.player.y = this.gameHeight()
        this.mapManager.north()
      }
    }
    if (this.gameConfig().showCommands && (moveX != 0 || moveY != 0)) {
      this.gameConfig().showCommands = false
    }

    if (moveX != 0 && moveY != 0) {
      moveX = moveX / Math.SQRT2
      moveY = moveY / Math.SQRT2
    }

    this.player.x += moveX
    this.player.y += moveY
    return
  }

  private updatePointerPosition = (): void => {
    this.pointerRight = false
    this.pointerLeft = false
    this.pointerUp = false
    this.pointerDown = false
    if (!this.scene.input.activePointer.isDown) return
    const x = this.scene.input.activePointer.x
    const y = this.scene.input.activePointer.y
    if (x > (3 * this.gameWidth()) / 4) {
      this.pointerRight = true
    }
    if (x < this.gameWidth() / 4) {
      this.pointerLeft = true
    }
    if (y > (3 * this.gameHeight()) / 4) {
      this.pointerDown = true
    }
    if (y < this.gameHeight() / 4) {
      this.pointerUp = true
    }
  }

  private updateAnimation = (newAnimation: false | Phaser.Animations.Animation) => {
    if (!this.currentAnimation || (!!newAnimation && newAnimation.key != this.currentAnimation.key)) {
      this.currentAnimation = newAnimation
      if (!!this.currentAnimation) {
        this.player.anims.play(this.currentAnimation)
      }
    }
  }
}
