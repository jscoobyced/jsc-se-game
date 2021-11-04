import Phaser from 'phaser'
import assets from '../config/assets.json'
import MapManager from '../maps/MapManager'
import { GameConfig } from '../models/common'
import Hero from '../sprites/characters/players/Hero'
import Controller from '../sprites/Controller'
import Material from '../sprites/materials/Material'
import LightSwitch from '../sprites/materials/static/LightSwitch'

export default class JscSeGameIntro extends Phaser.Scene {
  private theme: Phaser.Sound.BaseSound = null as unknown as Phaser.Sound.BaseSound
  private switch: Material = new LightSwitch(this, assets.switch)
  private player!: Hero
  private isMusicPlaying = false
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private logo!: Phaser.GameObjects.Image
  private gameConfig!: GameConfig
  private currentMap!: number
  private mapManager: MapManager = new MapManager()

  preload = (): void => {
    this.load.audio(assets.theme.key, [assets.theme.value])
    this.load.image(assets.logo.key, assets.logo.value)
    this.switch.preload()
    this.gameConfig = this.game.config as GameConfig
    this.mapManager.createWorld(this)
    this.currentMap = this.mapManager.mapId()
    this.player = new Hero(this, assets.mumu, this.mapManager)
    this.player.preload()
  }

  create = (): void => {
    this.theme = this.game.sound.add(assets.theme.key, { volume: 0.5, loop: true })

    this.mapManager.displayCurrentMap()
    this.switch.create()
    this.logo = this.add.image(this.game.canvas.width / 2, assets.logo.height / 2, assets.logo.key)
    this.gameConfig.showCommands = true

    this.tweens.add({
      targets: this.logo,
      y: 100,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    this.player.create()

    this.cursors = this.input.keyboard.createCursorKeys()
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M).on('up', () => {
      this.gameConfig.showCommands = !this.gameConfig.showCommands
    })

    const controller = new Controller(this)
    controller.create()
    this.player.setController(controller)
  }

  update = (time: number, delta: number): void => {
    this.player.update(this.cursors, time, delta)
    if (!this.gameConfig.showCommands) {
      this.logo.destroy()
    }
    this.toggleCommands(this.gameConfig.showCommands)
    if (!this.game.sound.locked && !this.isMusicPlaying) {
      this.isMusicPlaying = true
      this.theme.play()
    }
    if (this.currentMap != this.mapManager.mapId()) {
      this.mapManager.displayCurrentMap(this.currentMap)
      this.currentMap = this.mapManager.mapId()
    }
  }

  private toggleCommands = (show: boolean): void => {
    show ? this.switch.show() : this.switch.hide()
  }
}
