import Phaser from 'phaser'
import assets from '../config/assets.json'
import general from '../config/general.json'

export default class JscSeGameIntro extends Phaser.Scene {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    null as unknown as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

  preload = (): void => {
    this.load.image(assets.logo.key, assets.logo.value)
    this.load.image(assets.platform.key, assets.platform.value)
    this.load.spritesheet(assets.dude.key, assets.dude.value, {
      frameWidth: assets.dude.frameWidth,
      frameHeight: assets.dude.frameHeight,
    })
  }

  create = (): void => {
    const logo = this.add.image(general.width / 2, 70, assets.logo.key)

    this.tweens.add({
      targets: logo,
      y: 100,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    const platforms = this.physics.add.staticGroup()
    platforms
      .create(assets.platform.width / 2, general.height - assets.platform.height / 2, assets.platform.key)
      .refreshBody()

    this.player = this.physics.add.sprite(
      assets.platform.width / 2,
      general.height - assets.platform.height - assets.dude.frameHeight / 2,
      assets.dude.key,
    )
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(assets.dude.key, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: assets.dude.key, frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(assets.dude.key, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.physics.add.collider(this.player, platforms)
  }

  update = (): void => {
    const cursors = this.input.keyboard.createCursorKeys()
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160)

      this.player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160)

      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)

      this.player.anims.play('turn')
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
