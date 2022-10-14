import Phaser from 'phaser'
import general from '../config/general.json'

export default class Banner {
  private BANNER_PAD = 5
  private TEXT_PAD = 50
  private image!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  private text!: Phaser.GameObjects.BitmapText

  preload = (scene: Phaser.Scene): void => {
    scene.load.image('banner', `${general.baseUrls.images}/banner.png`)
    scene.load.bitmapFont('me-font', `${general.baseUrls.fonts}/me-font.png`, `${general.baseUrls.fonts}/me-font.xml`)
  }

  create = (scene: Phaser.Scene): void => {
    this.image = scene.physics.add.image(0, 0, 'banner')
    this.image.setX(this.BANNER_PAD + this.image.displayWidth / 2)
    this.image.setY(this.BANNER_PAD + this.image.displayHeight / 2)
    this.text = scene.add.bitmapText(
      this.image.originX + this.TEXT_PAD,
      general['banner-x'] + this.image.originY + this.TEXT_PAD,
      'me-font',
      '',
      50,
    )
  }

  show = () => {
    this.image.setVisible(true)
    this.image.setInteractive()
    this.text.setVisible(true)
  }

  hide = () => {
    this.image.removeInteractive()
    this.image.setVisible(false)
    this.text.setVisible(false)
  }

  showText = (text: string | string[], callback?: () => void) => {
    this.show()
    this.text.setText(text)
    if (callback) {
      this.image.on('pointerdown', () => {
        callback()
      })
    }
  }
}
