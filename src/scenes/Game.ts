import Phaser from 'phaser'

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload = (): void => {
    this.load.image('logo', 'assets/jsc-se-game-logo.png')
  }

  create = (): void => {
    const logo = this.add.image(400, 70, 'logo')

    this.tweens.add({
      targets: logo,
      y: 100,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }
}
