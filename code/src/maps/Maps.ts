import Grass from '../sprites/materials/static/Grass'
import assets from '../config/assets.json'

export default class Maps {
  private scene: Phaser.Scene
  private map!: Phaser.Tilemaps.Tilemap
  private tileset!: Phaser.Tilemaps.Tileset
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer
  private groundLayer!: Phaser.Tilemaps.TilemapLayer

  public constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  public preload(): void {
    this.scene.load.image('tiles', 'assets/images/tilesets.png')
    this.scene.load.tilemapTiledJSON('map01', 'assets/images/map-01.json')
  }

  public create(): void {
    this.map = this.scene.make.tilemap({ key: 'map01' })
    this.tileset = this.map.addTilesetImage('map', 'tiles')
    this.groundLayer = this.map.createLayer('Ground', this.tileset)
    this.scene.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)
  }

  public addCollider = (player: Phaser.GameObjects.GameObject): void => {
    //this.scene.physics.add.collider(player, this.wallsLayer)
  }
}
