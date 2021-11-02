import MapManager from '../maps/MapManager'
import { AssetDefinition, GameConfig } from '../models/common'

export default class BaseSprite {
  protected scene: Phaser.Scene
  protected config: AssetDefinition
  protected mapManager: MapManager

  public constructor(scene: Phaser.Scene, config: AssetDefinition, mapManager: MapManager) {
    this.scene = scene
    this.config = config
    this.mapManager = mapManager
  }

  public preload(): void {
    return
  }

  public create(): void {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    return
  }

  public show(): void {
    return
  }

  public hide(): void {
    return
  }

  protected gameWidth = (): number => {
    return this.scene.game.canvas.width
  }

  protected gameHeight = (): number => {
    return this.scene.game.canvas.height
  }

  protected gameConfig = (): GameConfig => {
    return this.scene.game.config as GameConfig
  }
}
