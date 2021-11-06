import Material from '../Material'

export default class LightSwitch extends Material {
  private isOn = false
  private frameNames!: Phaser.Types.Animations.AnimationFrame[]

  public create(): void {
    this.material = this.scene.physics.add.staticSprite(
      this.scene.game.canvas.width - 50,
      50,
      this.config.key,
      '01.png',
    )
    this.frameNames = this.scene.anims.generateFrameNames(this.config.key, {
      start: 1,
      end: 2,
      zeroPad: 2,
      prefix: '',
      suffix: '.png',
    })
    this.material.setFrame(this.frameNames[1].frame as string)
    this.material.setInteractive().on(Phaser.Input.Events.POINTER_UP, () => {
      this.toggleMusic()
    })
    this.scene.sound.mute = !this.isOn
  }

  private toggleMusic = () => {
    this.isOn = !this.isOn
    this.scene.sound.mute = !this.isOn
    this.material.setFrame(this.frameNames[this.isOn ? 0 : 1].frame as string)
  }
}
