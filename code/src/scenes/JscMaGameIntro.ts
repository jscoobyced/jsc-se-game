import general from '../config/general.json'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameIntro extends JscDefaultScene {
  private logo!: Phaser.GameObjects.Image

  public constructor() {
    super(general.levels.intro.key, general.levels.intro)
  }

  getPlayerPosition = (): { x: number; y: number } => {
    return { x: 0, y: 0 }
  }

  shouldUpdate = () => false

  preload = (): void => {
    this.defaultPreload()
    this.load.image('logo', `${general.baseUrls.images}/mumu-adventures.png`)
  }

  create = (): void => {
    this.createMap()
    this.createLayers()
    this.cursor = this.input.keyboard.createCursorKeys()
    this.logo = this.add.image((this.game.canvas.width - general.controller) / 2, 256, 'logo')
    this.tweens.add({
      targets: this.logo,
      y: this.game.canvas.height / 3,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    this.input.on('pointerdown', () => {
      const position = this.progressSaveService.getPlayerSavedPosition()
      this.goToScene(this.progressSaveService.getLevelKey(), position.x, position.y)
    })
  }

  update = () => {
    if (this.cursor.down.isDown || this.cursor.up.isDown || this.cursor.right.isDown || this.cursor.left.isDown) {
      const position = this.progressSaveService.getPlayerSavedPosition()
      this.goToScene(this.progressSaveService.getLevelKey(), position.x, position.y)
    }
  }
}
