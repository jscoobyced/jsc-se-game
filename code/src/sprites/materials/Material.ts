import { AssetDefinition } from '../../models/common'
import BaseSprite from '../BaseSprite'
import general from '../../config/general.json'
import MapManager from '../../maps/MapManager'

export default class Material extends BaseSprite {
  protected material!: Phaser.GameObjects.Sprite

  public constructor(scene: Phaser.Scene, config: AssetDefinition) {
    super(scene, config, new MapManager())
  }

  public preload(): void {
    this.scene.load.multiatlas(this.config.key, this.config.path, general.baseUrls.images)
    super.preload()
  }

  public show(): void {
    this.material.visible = true
  }

  public hide(): void {
    this.material.visible = false
  }

  public renew(): void {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    return
  }
}
