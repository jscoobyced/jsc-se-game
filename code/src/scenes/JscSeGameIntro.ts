import Phaser from 'phaser'
import Hero from '../sprites/characters/players/Hero'
import assets from '../config/assets.json'
import general from '../config/general.json'
import PlayerCharacter from '../sprites/characters/PlayerCharacter'
import Clouds from '../sprites/materials/moving/Clouds'
import Material from '../sprites/materials/Material'

export default class JscSeGameIntro extends Phaser.Scene {
  private player: PlayerCharacter = new Hero(this, assets.mumu)
  private clouds: Material = new Clouds(this, assets.cloud, 10)
  private theme: Phaser.Sound.BaseSound = null as unknown as Phaser.Sound.BaseSound
  private isMusicPlaying = false

  preload = (): void => {
    this.load.audio(assets.theme.key, [assets.theme.value])
    this.load.image(assets.logo.key, assets.logo.value)
    this.load.image(assets.platform.key, assets.platform.value)
    this.player.preload()
    this.clouds.preload()
  }

  create = (): void => {
    this.theme = this.game.sound.add(assets.theme.key)

    const platforms = this.physics.add.staticGroup()
    platforms
      .create(assets.platform.width / 2, general.height - assets.platform.height / 2, assets.platform.key)
      .refreshBody()

    this.player.create()
    this.player.addCollider(platforms)
    this.clouds.create()

    const logo = this.add.image(general.width / 2, assets.logo.height / 2, assets.logo.key)
    this.tweens.add({
      targets: logo,
      y: 100,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }

  update = (time: number, delta: number): void => {
    const cursors = this.input.keyboard.createCursorKeys()
    this.player.update(cursors, time, delta)
    this.clouds.update(cursors, time, delta)
    if (!this.game.sound.locked && !this.isMusicPlaying) {
      this.isMusicPlaying = true
      // this.theme.play()
    }
  }
}
