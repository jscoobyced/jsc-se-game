import Phaser from 'phaser'
import BaseCharacter from '../characters/BaseCharacter'
import Hero from '../characters/players/hero'
import assets from '../config/assets.json'
import general from '../config/general.json'

export default class JscSeGameIntro extends Phaser.Scene {
  private player: BaseCharacter = new Hero(this, assets.dude)
  private clouds: Phaser.GameObjects.Group = null as unknown as Phaser.GameObjects.Group

  preload = (): void => {
    this.load.image(assets.logo.key, assets.logo.value)
    this.load.image(assets.platform.key, assets.platform.value)
    this.load.spritesheet(assets.cloud.key, assets.cloud.value, {
      frameWidth: assets.cloud.frameWidth,
      frameHeight: assets.cloud.frameHeight,
    })

    this.player.preload()
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

    this.player.create()
    this.player.addCollider(platforms)

    const cloudChildren = []
    for (let i = 0; i < 10; i++) {
      cloudChildren.push(
        this.add
          .sprite(
            Phaser.Math.Between(assets.cloud.frameWidth / 2, general.width),
            Phaser.Math.Between(150, 350),
            assets.cloud.key,
          )
          .setScale(Phaser.Math.FloatBetween(0.5, 1)),
      )
    }
    this.clouds = this.add.group(cloudChildren)

    this.anims.create({
      key: 'cloud',
      frames: this.anims.generateFrameNumbers(assets.cloud.key, { start: 0, end: 2 }),
      frameRate: 5,
    })
  }

  update = (): void => {
    const cursors = this.input.keyboard.createCursorKeys()
    this.player.update(cursors)
    this.clouds.children.iterate((child, index) => {
      const cloud = child as Phaser.GameObjects.Sprite
      cloud.anims.play('cloud', true)
      if (cloud.x - cloud.width / 2 > general.width) {
        cloud.setX(-cloud.width / 2)
        cloud.setY(Phaser.Math.Between(150, 350))
      } else {
        cloud.setX(cloud.x + 0.2 + index / 10)
      }
    })
  }
}
