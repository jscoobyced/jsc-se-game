import Phaser from 'phaser'
import assets from '../config/assets.json'
import Maps from '../maps/Maps'
import Material from '../sprites/materials/Material'
import LightSwitch from '../sprites/materials/static/LightSwitch'
import Hero from '../sprites/characters/players/Hero'
import Controller from '../sprites/Controller'

export default class JscSeGameIntro extends Phaser.Scene {
  private theme: Phaser.Sound.BaseSound = null as unknown as Phaser.Sound.BaseSound
  private switch: Material = new LightSwitch(this, assets.switch)
  private isMusicPlaying = false
  private logo!: Phaser.GameObjects.Image
  private map: Maps = new Maps(this)
  private player: Hero = new Hero(this, assets.mumu)
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private controller!: Controller

  preload = (): void => {
    this.load.audio(assets.theme.key, [assets.theme.value])
    this.load.image(assets.logo.key, assets.logo.value)
    this.map.preload()
    this.switch.preload()
    this.player.preload()
  }

  create = (): void => {
    this.map.create()
    this.theme = this.game.sound.add(assets.theme.key, { volume: 0.5, loop: true })
    this.switch.create()
    this.player.create()
    this.cursors = this.input.keyboard.createCursorKeys()
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height)
    this.controller = new Controller(this)
    this.controller.create()
    this.player.setController(this.controller)
    this.map.addCollider(this.player.getBody())
    this.logo = this.add.image(this.game.canvas.width / 2, assets.logo.height / 4, assets.logo.key).setScale(0.33, 0.33)

    this.tweens.add({
      targets: this.logo,
      y: 50,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update = (time: number, delta: number): void => {
    this.player.update(this.cursors, time, delta)
    this.controller.update()
    if (
      this.input.activePointer.isDown ||
      this.cursors.down.isDown ||
      this.cursors.up.isDown ||
      this.cursors.right.isDown ||
      this.cursors.left.isDown
    ) {
      this.logo.visible = false
      this.switch.hide()
    }
    if (!this.game.sound.locked && !this.isMusicPlaying) {
      this.isMusicPlaying = true
      this.theme.play()
    }
  }

  private toggleCommands = (show: boolean): void => {
    show ? this.switch.show() : this.switch.hide()
  }
}
