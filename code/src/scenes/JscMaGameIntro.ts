import Phaser from 'phaser'
import general from '../config/general.json'
import Player from '../sprites/Player'

export default class JscSeGameIntro extends Phaser.Scene {
  private player = new Player(this)

  preload = (): void => {
    this.load.image('tiles', `${general.baseUrls.images}/main-tile.png`)
    this.load.tilemapTiledJSON('intro-map', `${general.baseUrls.json}/intro-map.json`)
    this.player.preload()
  }

  create = (): void => {
    const map = this.make.tilemap({ key: 'intro-map', tileWidth: 64, tileHeight: 64 })
    const tileset = map.addTilesetImage('main', 'tiles')
    map.createLayer('ground', tileset, 0, 0)
    const treelayer = map.createLayer('trees', tileset, 0, 0)
    treelayer.setCollisionBetween(171, 177)
    treelayer.setCollisionBetween(190, 196)
    treelayer.setCollisionBetween(209, 215)
    const waterlayer = map.createLayer('water', tileset, 0, 0)
    waterlayer.setCollisionBetween(10, 15)
    waterlayer.setCollisionBetween(29, 34)
    waterlayer.setCollisionBetween(48, 51)

    this.player.create()
    this.physics.add.collider(this.player.getPlayer(), treelayer)
    this.physics.add.collider(this.player.getPlayer(), waterlayer)
  }

  update = (): void => {
    this.player.update()
  }
}
