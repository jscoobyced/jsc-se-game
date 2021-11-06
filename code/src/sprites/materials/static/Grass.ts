import Material from '../Material'

export default class Grass extends Material {
  private numberOfFrames = 3
  private grassCount = 200
  private fromEdge = 20
  private mapWidth = 0
  private mapHeight = 0
  private container: Phaser.Types.Physics.Arcade.SpriteWithStaticBody[] = []

  public setMapSize = (mapWidth: number, mapHeight: number): void => {
    this.mapWidth = mapWidth
    this.mapHeight = mapHeight
  }

  public create(): void {
    const frameNames = this.scene.anims.generateFrameNames(this.config.key, {
      start: 1,
      end: this.numberOfFrames,
      zeroPad: 2,
      prefix: '',
      suffix: '.png',
    })
    for (let i = 0; i < this.grassCount; i++) {
      const randomX = Phaser.Math.Between(this.fromEdge, this.mapWidth - this.fromEdge)
      const randomY = Phaser.Math.Between(this.fromEdge, this.mapHeight - this.fromEdge)
      const randomFrame = Phaser.Math.Between(0, this.numberOfFrames - 1)
      const grass = this.scene.physics.add.staticSprite(randomX, randomY, this.config.key)
      this.container.push(grass)
      grass.setFrame(frameNames[randomFrame].frame as string)
    }
  }

  public hide(): void {
    for (const grass of this.container) {
      grass.visible = false
    }
  }

  public show(): void {
    for (const grass of this.container) {
      grass.visible = true
    }
  }
}
