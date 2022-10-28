import Player from '../sprites/Player'
import JscDefaultScene from './JscDefaultScene'

/**
 * This class manages all the default functionalities for a Phaser.Scene
 * in which the player sprite will exist. It provides the support for:
 * - pre-loading and creating the player sprite, including pre-loading
 * the saved state from previous run of the game
 * - managing the movements of the player
 */
export default abstract class JscDefaulPlayertScene extends JscDefaultScene {
  protected player = new Player()
  private isCollided = false

  /**
   * Block the player sprite update if needed (i.e. when in conversation)
   * @returns {boolean} whether or not the player sprite should be update
   */
  abstract shouldUpdate(): boolean
  /**
   * Preloads the level specific content
   */
  abstract doPreload(): void
  /**
   * Creates the level specific content. Everything added here will be in
   * a layer above the player. If there is no collision set, the player
   * sprite will appear behind
   */
  abstract doCreate(): void

  preload = (): void => {
    this.defaultPreload()
    this.player.preload(this)
    this.doPreload()
  }

  create = () => {
    this.createMap()
    const position = this.progressSaveService.getPlayerSavedPosition()
    this.player.create(position.x, position.y, this, this.cursor, this.controller)
    this.player.getPlayer().body.world.on('worldbounds', this.colliding)
    this.createLayers(this.player.getPlayer())
    this.doCreate()
  }

  colliding = () => {
    if (!this.isCollided) {
      this.isCollided = true
    }
  }

  update = (time: number): void => {
    if (this.shouldUpdate()) {
      this.player.update(time)
      this.progressSaveService.updatePosition(this.getPlayerPosition())
    } else {
      this.player.stop()
    }
  }

  getPlayerPosition = () => {
    return {
      x: this.player.getPlayer().x,
      y: this.player.getPlayer().y,
    }
  }
}
