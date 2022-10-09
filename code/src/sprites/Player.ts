import Phaser from 'phaser'
import general from '../config/general.json'
import Controller from '../Controller'

export default class Player {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  private PLAYER_VELOCITY = 200
  private playerDirection = 'idleright'
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
      this.playerDirection != 'idleleft' &&
      this.playerDirection != 'idleright'
    ) {
      if (this.playerDirection.indexOf('right') > 0) {
        this.playerDirection = 'idleright'
      } else {
        this.playerDirection = 'idleleft'
      }
      this.player.play(this.playerDirection)
    }
    if (this.cursor.up.isDown || this.pointerUp) {
      velocityY = -this.PLAYER_VELOCITY
    } else if (this.cursor.down.isDown || this.pointerDown) {
      velocityY = this.PLAYER_VELOCITY
    }
    if (this.cursor.left.isDown || this.pointerLeft) {
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

  public getPlayer = () => this.player

  private createFrameSets = (scene: Phaser.Scene) => {
    scene.anims.create({
      key: 'walkright',
      frames: [
        {
          key: 'player',
          frame: '05.png',
        },
        {
          key: 'player',
          frame: '06.png',
        },
        {
          key: 'player',
          frame: '07.png',
        },
        {
          key: 'player',
          frame: '08.png',
        },
      ],
      frameRate: 8,
      repeat: -1,
    })
    scene.anims.create({
      key: 'walkleft',
      frames: [
        {
          key: 'player',
          frame: '01.png',
        },
        {
          key: 'player',
          frame: '02.png',
        },
        {
          key: 'player',
          frame: '03.png',
        },
        {
          key: 'player',
          frame: '04.png',
        },
      ],
      frameRate: 8,
      repeat: -1,
    })
    scene.anims.create({
      key: 'idleleft',
      frames: [
        {
          key: 'player',
          frame: '04.png',
        },
      ],
      frameRate: 1,
      repeat: 1,
    })
    scene.anims.create({
      key: 'idleright',
      frames: [
        {
          key: 'player',
          frame: '05.png',
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
