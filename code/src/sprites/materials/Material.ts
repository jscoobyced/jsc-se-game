import { AssetDefinition } from '../../models/common'
import general from '../../config/general.json'

export default class Material {
  protected scene: Phaser.Scene
  protected config: AssetDefinition
  protected material!: Phaser.GameObjects.Sprite

  public constructor(scene: Phaser.Scene, config: AssetDefinition) {
    this.scene = scene
    this.config = config
  }

  public preload(): void {
    this.scene.load.multiatlas(this.config.key, this.config.path, general.baseUrls.images)
  }

  public create(): void {
    return
  }

  public show(): void {
    this.material.visible = true
  }

  public hide(): void {
    this.material.visible = false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    return
  }
}
