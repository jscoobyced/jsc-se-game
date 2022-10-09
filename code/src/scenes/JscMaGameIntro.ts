import general from '../config/general.json'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameIntro extends JscDefaultScene {
  private logo!: Phaser.GameObjects.Image
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  public constructor() {
    super(general.levels.intro.key, general.levels.intro)
  }

  preload = (): void => {
    this.defaultPreload()
    this.load.image('logo', `${general.baseUrls.images}/mumu-adventures.png`)
  }

  create = (): void => {
    this.createMap()
    this.createLayers()
    this.cursors = this.input.keyboard.createCursorKeys()
    this.logo = this.add.image(this.game.canvas.width / 2, 256, 'logo')
    this.tweens.add({
      targets: this.logo,
      y: this.game.canvas.height / 3,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    this.input.on('pointerdown', () => {
      this.scene.start(general.levels.levelOne.key)
    })
  }

  update = () => {
    if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.right.isDown || this.cursors.left.isDown) {
      this.scene.start(general.levels.levelOne.key)
    }
  }
}
