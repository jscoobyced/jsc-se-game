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
    this.scene.load.image('tiles', 'assets/images/tiles.png')
    this.scene.load.tilemapTiledJSON('map02', 'assets/images/map-02.json')
  }

  public create(): void {
    this.map = this.scene.make.tilemap({ key: 'map02' })
    this.tileset = this.map.addTilesetImage('Ground', 'tiles')
    this.groundLayer = this.map.createLayer('Main', this.tileset)
    this.wallsLayer = this.map.createLayer('Edge', this.tileset)
    this.wallsLayer.setCollisionByProperty({ collides: true })

    this.scene.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height)
    /*
    const debugGraphics = this.scene.add.graphics().setAlpha(0.7)
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(234, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    })
    this.groundLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(128, 234, 48, 255),
      faceColor: new Phaser.Display.Color(128, 39, 37, 255),
    })
    */
  }

  public addCollider = (player: Phaser.GameObjects.GameObject): void => {
    this.scene.physics.add.collider(player, this.wallsLayer)
  }
}
