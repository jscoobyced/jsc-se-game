import Phaser from 'phaser'
import general from '../config/general.json'
import { Level } from '../models/common'

export default class JscDefaultScene extends Phaser.Scene {
  protected level!: Level
  private map!: Phaser.Tilemaps.Tilemap
  private tileset!: Phaser.Tilemaps.Tileset

  public constructor(config: string | Phaser.Types.Scenes.SettingsConfig, level: Level) {
    super(config)
    this.level = level
  }

  defaultPreload = (): void => {
    this.load.image(`${this.level.key}-tiles`, `${general.baseUrls.images}/${this.level.tile}-map.png`)
    this.load.tilemapTiledJSON(`${this.level.key}-map`, `${general.baseUrls.json}/${this.level.tile}-map.json`)
    this.load.spritesheet('fullscreen', 'assets/images/fullscreen.png', { frameWidth: 64, frameHeight: 64 })
  }

  createMap = () => {
    this.map = this.make.tilemap({ key: `${this.level.key}-map`, tileWidth: 64, tileHeight: 64 })
    this.tileset = this.map.addTilesetImage(this.level.main, `${this.level.key}-tiles`)
    this.map.createLayer(this.level.ground, this.tileset, 0, 0)
    const fsButton = this.add
      .image(general.width - 16, 16, 'fullscreen', 0)
      .setOrigin(1, 0)
      .setInteractive()
    fsButton.on('pointerup', () => {
      this.toggleFullScreen(fsButton)
    })
  }

  createLayers = (player?: Phaser.Physics.Arcade.Sprite): void => {
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
