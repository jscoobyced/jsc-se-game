import Material from '../Material'

export default class LightSwitch extends Material {
  private isOn = false
  private frameNames!: Phaser.Types.Animations.AnimationFrame[]

  public create(): void {
    this.material = this.scene.physics.add
      .staticSprite(this.scene.game.canvas.width - 50, 50, this.config.key, '01.png')
      .setScale(0.5, 0.5)
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

  public update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void {
    this.material.x = this.scene.game.canvas.width - 50 + this.scene.cameras.main.scrollX
    this.material.y = 50 + this.scene.cameras.main.scrollY
    super.update(cursors, time, delta)
  }

  private toggleMusic = () => {
    this.isOn = !this.isOn
    this.scene.sound.mute = !this.isOn
    this.material.setFrame(this.frameNames[this.isOn ? 0 : 1].frame as string)
  }
}
