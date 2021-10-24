import Material from './Material'

export default class LightSwitch extends Material {
  private isOn = true
  private frameNames!: Phaser.Types.Animations.AnimationFrame[]

  public create(): void {
    super.create()

    this.material = this.scene.physics.add.staticSprite(
      this.scene.scale.width - 50,
      50,
      this.config.key,
      this.config.start,
    )
    this.material.setScale(0.6, 0.6)
    this.frameNames = this.scene.anims.generateFrameNames(this.config.key, {
      start: this.config.frames.start,
      end: this.config.frames.end,
      zeroPad: 2,
      prefix: '',
      suffix: '.png',
    })
    this.material.setFrame(this.frameNames[0].frame as string)
    this.material.setInteractive().on(Phaser.Input.Events.POINTER_UP, () => {
      this.toggleMusic()
    })
  }

  private toggleMusic = () => {
    this.isOn = !this.isOn
    this.scene.sound.mute = !this.isOn
    this.material.setFrame(this.frameNames[this.isOn ? 0 : 1].frame as string)
  }
}
