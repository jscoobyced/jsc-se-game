import Phaser from 'phaser'
import general from '../config/general.json'
import Controller from '../Controller'

export default class Player {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  private PLAYER_VELOCITY_WALK = 200
  private PLAYER_WALK_TO_RUN_TIME_IN_MS = 500
  private PLAYER_VELOCITY_RUN_FACTOR = 2
  private PLAYER_FRAMERATE = 6
  private playerDirection = 'idle'
  private pointerRight = false
  private pointerLeft = false
  private pointerUp = false
  private pointerDown = false
  private controller!: Controller
  private walkTime = 0

  preload = (scene: Phaser.Scene): void => {
    scene.load.atlas('player', `${general.baseUrls.images}/mumu.png`, `${general.baseUrls.json}/mumu.json`)
  }

  create = (scene: Phaser.Scene, cursor: Phaser.Types.Input.Keyboard.CursorKeys, controller: Controller): void => {
    this.player = scene.physics.add
      .sprite((general.width + general.controller) / 2 - 32, general.height / 2 - 32, 'player')
      .setBounce(0)
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    this.createFrameSets(scene)
    this.player.play(this.playerDirection)
    this.cursor = cursor
    this.controller = controller
  }

  update = (time: number): void => {
    let velocityX = 0
    let velocityY = 0
    this.updatePointerPosition()
    if (
      this.cursor.down.isDown ||
      this.cursor.up.isDown ||
      this.cursor.right.isDown ||
      this.cursor.left.isDown ||
      this.pointerDown ||
      this.pointerLeft ||
      this.pointerRight ||
      this.pointerUp
    ) {
      if (this.cursor.up.isDown || this.pointerUp) {
        velocityY = -this.PLAYER_VELOCITY_WALK
      } else if (this.cursor.down.isDown || this.pointerDown) {
        velocityY = this.PLAYER_VELOCITY_WALK
      }
      if (this.cursor.left.isDown || this.pointerLeft) {
        velocityX = -this.PLAYER_VELOCITY_WALK
      } else if (this.cursor.right.isDown || this.pointerRight) {
        velocityX = this.PLAYER_VELOCITY_WALK
      }
      if (velocityX != 0 && velocityY != 0) {
        velocityX = velocityX / Math.SQRT2
        velocityY = velocityY / Math.SQRT2
      }
    }
    this.changePlayerDirection(velocityX, velocityY, time)
  }

  stop = () => {
    this.player.setVelocity(0, 0)
  }

  public getPlayer = () => this.player

  private changePlayerDirection = (velocityX: number, velocityY: number, time: number) => {
    let direction = 'idle'
    let isRunning = 1
    if (velocityX === 0) {
      if (velocityY > 0) {
        direction = 'walkdown'
      } else if (velocityY < 0) {
        direction = 'walkup'
      }
    } else {
      if (velocityX > 0) {
        direction = 'walkright'
      } else {
        direction = 'walkleft'
      }
    }
    if (this.playerDirection != direction) {
      this.playerDirection = direction
      this.player.play(this.playerDirection)
      this.walkTime = time
    } else {
      if (time - this.walkTime > this.PLAYER_WALK_TO_RUN_TIME_IN_MS) {
        isRunning = this.PLAYER_VELOCITY_RUN_FACTOR
      }
    }
    this.player.setVelocity(velocityX * isRunning, velocityY * isRunning)
  }

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
      frameRate: this.PLAYER_FRAMERATE,
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
      frameRate: this.PLAYER_FRAMERATE,
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
      frameRate: this.PLAYER_FRAMERATE,
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
      frameRate: this.PLAYER_FRAMERATE,
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
