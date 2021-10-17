import general from '../../../config/general.json'
import Material from '../Material'

export default class Clouds extends Material {
  public create = (): void => {
    const materialChildren: Phaser.GameObjects.GameObject[] = []
    for (let i = 0; i < this.materialCount; i++) {
      materialChildren.push(
        this.scene.add
          .sprite(
            Phaser.Math.Between(this.config.frameWidth / 2, general.width),
            Phaser.Math.Between(150, 350),
            this.config.key,
          )
          .setScale(Phaser.Math.FloatBetween(0.5, 1)),
      )
    }
    this.material = this.scene.add.group(materialChildren)
    super.create()
  }

  public update = (): void => {
    this.material.children.iterate((child, index) => {
      const material = child as Phaser.GameObjects.Sprite
      material.anims.play(this.config.key, true)
      if (material.x - material.width / 2 > general.width) {
        material.setX(-material.width / 2)
        material.setY(Phaser.Math.Between(150, 350))
      } else {
        material.setX(material.x + 0.2 + index / 10)
      }
    })
    super.update()
  }
}
