import Phaser from 'phaser'
import general from '../config/general.json'

export default class Object {
  private name: string
  private sprite: string
  private object!: Phaser.Physics.Arcade.Sprite
  private x = 0
  private y = 0

  public constructor(name: string, sprite: string, x: number, y: number) {
    this.name = name
    this.sprite = sprite
    this.x = x
    this.y = y
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.image(this.name, `${general.baseUrls.images}/${this.sprite}.png`)
  }

  create = (scene: Phaser.Scene): void => {
    this.object = scene.physics.add.staticSprite(this.x, this.y, this.name)
  }

  public getNpc = () => this.object
}
