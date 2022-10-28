import Phaser from 'phaser'
import general from '../config/general.json'
import Controller from '../Controller'
import { Level } from '../models/common'
import ProgressSaveService from '../services/ProgressSaveService'
import Banner from '../sprites/Banner'

export default abstract class JscDefaultScene extends Phaser.Scene {
  protected level!: Level
  private map!: Phaser.Tilemaps.Tilemap
  private tileset!: Phaser.Tilemaps.Tileset
  protected progressSaveService: ProgressSaveService
  protected banner = new Banner()
  protected cursor!: Phaser.Types.Input.Keyboard.CursorKeys
  protected controller!: Controller

  /**
   * Configure the base information of a scene. The second parameter {level} is
   * used to create the scene. You shoulf have:
   * - a {level}-map.png file in the `public/assets/images` directory
   * - a {level}-map.json file in the `public/assets/json` directory
   * - optionally a {level}-map.mp3 file in the `public/assets/audio` directory
   *
   * @param {string} config the name of the scene or a {SettingsConfig} object
   * @param {Level} level the level object
   */
  public constructor(config: string | Phaser.Types.Scenes.SettingsConfig, level: Level) {
    super(config)
    this.level = level
    this.progressSaveService = new ProgressSaveService(level)
  }

  abstract getPlayerPosition(): { x: number; y: number }

  protected defaultPreload = (): void => {
    this.load.image(`${this.level.key}-tiles`, `${general.baseUrls.images}/${this.level.tile}-map.png`)
    this.banner.preload(this)
    this.load.tilemapTiledJSON(`${this.level.key}-map`, `${general.baseUrls.json}/${this.level.tile}-map.json`)
    this.load.spritesheet('fullscreen', 'assets/images/fullscreen.png', { frameWidth: 64, frameHeight: 64 })
  }

  protected createMap = () => {
    this.progressSaveService.loadSavedGame()
    this.map = this.make.tilemap({ key: `${this.level.key}-map`, tileWidth: 64, tileHeight: 64 })
    this.physics.world.setBounds(0, 0, general.width - general.controller, general.height)
    this.tileset = this.map.addTilesetImage(this.level.main, `${this.level.key}-tiles`)
    this.map.createLayer(this.level.ground, this.tileset, 0, 0)
    const fsButton = this.add
      .image(general.width - general.controller - 16, 16, 'fullscreen', 0)
      .setOrigin(1, 0)
      .setInteractive()
    fsButton.on('pointerup', () => {
      this.toggleFullScreen(fsButton)
    })
    this.banner.create(this)
    this.banner.hide(this)
    this.cursor = this.input.keyboard.createCursorKeys()
    if (this.game.device.os.android || this.game.device.os.iPad || this.game.device.os.iPhone) {
      this.controller = new Controller(this)
      this.controller.create()
    }
  }

  protected createLayers = (player?: Phaser.Physics.Arcade.Sprite): void => {
    this.level.layers.forEach((layer) => {
      const current = this.map.createLayer(layer.key, this.tileset, 0, 0)
      layer.collisions?.forEach((collision) => {
        current.setCollisionBetween(collision[0], collision[1])
      })
      if (layer.collisions && layer.collisions?.length > 0 && player) {
        this.physics.add.collider(player, current)
      }
    })
  }

  protected goToScene = (newLevel: string) => {
    this.scene.start(newLevel)
  }

  private toggleFullScreen = (fsButton: Phaser.GameObjects.Image) => {
    if (this.scale.isFullscreen) {
      fsButton.setFrame(0)
      this.scale.stopFullscreen()
    } else {
      fsButton.setFrame(1)
      this.scale.startFullscreen()
    }
  }
}
