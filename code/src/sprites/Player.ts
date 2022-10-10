import Phaser from 'phaser'
import general from '../config/general.json'
import Controller from '../Controller'

export default class Player {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  private PLAYER_VELOCITY = 250
  private playerDirection = 'idle'
  private pointerRight = false
  private pointerLeft = false
  private pointerUp = false
  private pointerDown = false
  private controller!: Controller

  preload = (scene: Phaser.Scene): void => {
    scene.load.atlas('player', `${general.baseUrls.images}/mumu.png`, `${general.baseUrls.json}/mumu.json`)
  }

  create = (scene: Phaser.Scene): void => {
    this.player = scene.physics.add
      .sprite((general.width + general.controller) / 2 - 32, general.height / 2 - 32, 'player')
      .setBounce(0)
      .setScale(3, 3)
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    this.createFrameSets(scene)
    this.player.play(this.playerDirection)
    this.cursor = scene.input.keyboard.createCursorKeys()
    if (scene.game.device.os.android || scene.game.device.os.iPad || scene.game.device.os.iPhone) {
      this.controller = new Controller(scene)
      this.controller.create()
    }
  }

  update = (): void => {
    let velocityX = 0
    let velocityY = 0
    this.updatePointerPosition()
    if (
      this.cursor.down.isUp &&
      this.cursor.up.isUp &&
      this.cursor.right.isUp &&
      this.cursor.left.isUp &&
      this.playerDirection != 'idle'
    ) {
      this.playerDirection = 'idle'
      this.player.play(this.playerDirection)
    } else {
      if (this.cursor.up.isDown || this.pointerUp) {
        velocityY = -this.PLAYER_VELOCITY
        if (this.playerDirection != 'walkup') {
          this.playerDirection = 'walkup'
          this.player.play(this.playerDirection)
        }
      } else if (this.cursor.down.isDown || this.pointerDown) {
        velocityY = this.PLAYER_VELOCITY
        if (this.playerDirection != 'walkdown') {
          this.playerDirection = 'walkdown'
          this.player.play(this.playerDirection)
        }
      } else if (this.cursor.left.isDown || this.pointerLeft) {
        if (this.playerDirection != 'walkleft') {
          this.playerDirection = 'walkleft'
          this.player.play(this.playerDirection)
        }
        velocityX = -this.PLAYER_VELOCITY
      } else if (this.cursor.right.isDown || this.pointerRight) {
        if (this.playerDirection != 'walkright') {
          this.playerDirection = 'walkright'
          this.player.play(this.playerDirection)
        }
        velocityX = this.PLAYER_VELOCITY
      }
      if (velocityX != 0 && velocityY != 0) {
        velocityX = velocityX / Math.SQRT2
        velocityY = velocityY / Math.SQRT2
      }

      this.player.setVelocity(velocityX, velocityY)
    }
  }

  public getPlayer = () => this.player

  private createFrameSets = (scene: Phaser.Scene) => {
    scene.anims.create({
      key: 'walkright',
      frames: [
        {
          key: 'player',
          frame: 'right-01',
        },
        {
          key: 'player',
          frame: 'right-02',
        },
        {
          key: 'player',
          frame: 'right-03',
        },
      ],
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: 'walkleft',
      frames: [
        {
          key: 'player',
          frame: 'left-01',
        },
        {
          key: 'player',
          frame: 'left-02',
        },
        {
          key: 'player',
          frame: 'left-03',
        },
      ],
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: 'walkup',
      frames: [
        {
          key: 'player',
          frame: 'up-01',
        },
        {
          key: 'player',
          frame: 'up-02',
        },
        {
          key: 'player',
          frame: 'up-03',
        },
      ],
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: 'walkdown',
      frames: [
        {
          key: 'player',
          frame: 'down-01',
        },
        {
          key: 'player',
          frame: 'down-02',
        },
        {
          key: 'player',
          frame: 'down-03',
        },
      ],
      frameRate: 6,
      repeat: -1,
    })
    scene.anims.create({
      key: 'idle',
      frames: [
        {
          key: 'player',
          frame: 'idle',
        },
      ],
      frameRate: 1,
      repeat: 1,
    })
  }

  private updatePointerPosition = (): void => {
    this.pointerRight = this.controller && this.controller.isMoveEast()
    this.pointerLeft = this.controller && this.controller.isMoveWest()
    this.pointerUp = this.controller && this.controller.isMoveNorth()
    this.pointerDown = this.controller && this.controller.isMoveSouth()
  }
}
