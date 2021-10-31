import Material from '../Material'

export default class Grass extends Material {
  private numberOfFrames = 3
  private grassCount = 20

  public create(): void {
    super.create()

    for (let i = 0; i < this.grassCount; i++) {
      const randomX = Phaser.Math.Between(0, this.gameWidth())
      const randomY = Phaser.Math.Between(0, this.gameHeight())
      const randomFrame = Phaser.Math.Between(0, this.numberOfFrames - 1)
      const grass = this.scene.physics.add.staticSprite(randomX, randomY, this.config.key, '01.png')
      const frameNames = this.scene.anims.generateFrameNames(this.config.key, {
        start: 1,
        end: this.numberOfFrames,
        zeroPad: 2,
        prefix: '',
        suffix: '.png',
      })
      grass.setFrame(frameNames[randomFrame].frame as string)
    }
  }
}
