import Phaser from 'phaser'
import assets from '../config/assets.json'
import general from '../config/general.json'
import NonPlayerCharacter from '../sprites/characters/NonPlayerCharacter'
import Material from '../sprites/materials/Material'
import LightSwitch from '../sprites/materials/static/LightSwitch'

export default class JscSeGameIntro extends Phaser.Scene {
  private player: NonPlayerCharacter = new NonPlayerCharacter(this, assets.mumu)
  private theme: Phaser.Sound.BaseSound = null as unknown as Phaser.Sound.BaseSound
  private switch: Material = new LightSwitch(this, assets.switch)
  private isMusicPlaying = false

  preload = (): void => {
    this.load.audio(assets.theme.key, [assets.theme.value])
    this.load.image(assets.logo.key, assets.logo.value)
    this.load.image(assets.platform.key, assets.platform.value)
    this.player.preload()
    this.switch.preload()
  }

  create = (): void => {
    this.theme = this.game.sound.add(assets.theme.key, { volume: 0.5, loop: true })

    const platforms = this.physics.add.staticGroup()
    platforms
      .create(assets.platform.width / 2, general.height - assets.platform.height / 2, assets.platform.key)
      .refreshBody()

    this.player.create()
    this.player.addCollider(platforms)
    this.switch.create()

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
    if (!this.game.sound.locked && !this.isMusicPlaying) {
      this.isMusicPlaying = true
      this.theme.play()
    }
  }
}
