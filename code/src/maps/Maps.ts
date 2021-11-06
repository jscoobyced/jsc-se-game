import Grass from '../sprites/materials/static/Grass'
import assets from '../config/assets.json'

export default class Maps {
  private scene: Phaser.Scene
  private map!: Phaser.Tilemaps.Tilemap
  private tileset!: Phaser.Tilemaps.Tileset
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer
  private groundLayer!: Phaser.Tilemaps.TilemapLayer
  private grass: Grass

  public constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.grass = new Grass(scene, assets.grass)
  }

  public preload(): void {
    this.scene.load.image({
      key: 'tiles',
      url: 'assets/images/map01.png',
    })
    this.scene.load.tilemapTiledJSON('map01', 'assets/images/map01.json')
    this.grass.preload()
  }

  public create(): void {
    this.map = this.scene.make.tilemap({ key: 'map01', tileWidth: 128, tileHeight: 128 })
    this.tileset = this.map.addTilesetImage('map01', 'tiles')
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0)
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0)
    this.scene.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height)
    this.wallsLayer.setCollisionByProperty({ collides: true })
    this.grass.setMapSize(this.wallsLayer.width, this.wallsLayer.height)
    this.grass.create()
  }

  public addCollider = (player: Phaser.GameObjects.GameObject): void => {
    this.scene.physics.add.collider(player, this.wallsLayer)
  }
}
