import Phaser from 'phaser'
import general from '../config/general.json'

export default class Player {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  private PLAYER_VELOCITY = 200
  private playerDirection = 'idleright'
  private scene: Phaser.Scene

  public constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  preload = (): void => {
    this.scene.load.atlas('player', `${general.baseUrls.images}/mumu.png`, `${general.baseUrls.images}/mumu.json`)
  }

  create = (): void => {
    this.player = this.scene.physics.add.sprite(100, 100, 'player').setBounce(0).setScale(3, 3)
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    this.scene.anims.create({
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
    this.scene.anims.create({
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
    this.scene.anims.create({
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
    this.scene.anims.create({
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
    this.player.play(this.playerDirection)
    this.cursor = this.scene.input.keyboard.createCursorKeys()
  }

  update = (): void => {
    this.player.setVelocityY(0)
    this.player.setVelocityX(0)
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
    if (this.cursor.up.isDown) {
      this.player.setVelocityY(-this.PLAYER_VELOCITY)
    } else if (this.cursor.down.isDown) {
      this.player.setVelocityY(this.PLAYER_VELOCITY)
    }
    if (this.cursor.left.isDown) {
      if (this.playerDirection != 'walkleft') {
        this.playerDirection = 'walkleft'
        this.player.play(this.playerDirection)
      }
      this.player.setVelocityX(-this.PLAYER_VELOCITY)
    } else if (this.cursor.right.isDown) {
      if (this.playerDirection != 'walkright') {
        this.playerDirection = 'walkright'
        this.player.play(this.playerDirection)
      }
      this.player.setVelocityX(this.PLAYER_VELOCITY)
    }
  }

  public getPlayer = () => this.player
}
