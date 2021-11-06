import { Physics } from 'phaser'
import general from '../../../config/general.json'
import { AssetDefinition } from '../../../models/common'
import Controller from '../../Controller'

export default class Hero {
  private scene: Phaser.Scene
  private config: AssetDefinition
  private walkRightAnimation!: false | Phaser.Animations.Animation
  private walkLeftAnimation!: false | Phaser.Animations.Animation
  private player!: Phaser.GameObjects.Sprite
  private currentAnimation!: false | Phaser.Animations.Animation
  private velocity = 1 / 6
  private pointerRight = false
  private pointerLeft = false
  private pointerUp = false
  private pointerDown = false
  private controller!: Controller

  public constructor(scene: Phaser.Scene, config: AssetDefinition) {
    this.scene = scene
    this.config = config
  }

  public setController = (controller: Controller): void => {
    this.controller = controller
  }

  preload(): void {
    this.scene.load.multiatlas(this.config.key, this.config.path, general.baseUrls.images)
  }

  create(): void {
    this.player = this.scene.physics.add
      .sprite(this.scene.game.canvas.width / 2, this.scene.game.canvas.height / 2, this.config.key, '01.png')
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
      frameRate: this.config.frames?.frameRate,
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
      frameRate: this.config.frames?.frameRate,
      repeat: -1,
    }

    this.walkRightAnimation = this.scene.anims.create(walkRightConfig)
    this.walkLeftAnimation = this.scene.anims.create(walkLeftConfig)
    const body = this.player.body as Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    this.scene.cameras.main.startFollow(this.player)
  }

  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    this.updatePointerPosition()
    let moveX = 0
    let moveY = 0
    if (cursors.right.isDown || this.pointerRight) {
      this.updateAnimation(this.walkRightAnimation)
      moveX = delta * this.velocity
    } else if (cursors.left.isDown || this.pointerLeft) {
      this.updateAnimation(this.walkLeftAnimation)
      moveX = -delta * this.velocity
    }
    if (cursors.down.isDown || this.pointerDown) {
      moveY = delta * this.velocity
    } else if (cursors.up.isDown || this.pointerUp) {
      moveY = -delta * this.velocity
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
    this.pointerRight = this.controller && this.controller.isMoveEast()
    this.pointerLeft = this.controller && this.controller.isMoveWest()
    this.pointerUp = this.controller && this.controller.isMoveNorth()
    this.pointerDown = this.controller && this.controller.isMoveSouth()
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
