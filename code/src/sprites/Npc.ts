import Phaser from 'phaser'
import general from '../config/general.json'

export default class Npc {
  private name!: string
  private sprite!: string
  private npc!: Phaser.Physics.Arcade.Sprite
  private talkImage!: Phaser.Physics.Arcade.Image
  private NPC_FRAMERATE = 4
  private x = 0
  private y = 0

  public constructor(name: string, sprite: string, x: number, y: number) {
    this.name = name
    this.sprite = sprite
    this.x = x
    this.y = y
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.atlas(
      this.name,
      `${general.baseUrls.images}/${this.sprite}.png`,
      `${general.baseUrls.json}/${this.sprite}.json`,
    )
  }

  create = (scene: Phaser.Scene): void => {
    this.npc = scene.physics.add.staticSprite(920, 450, this.name)
    this.createFrameSets(scene)
    this.talkImage = scene.physics.add.image(50, 50, this.name, 'idle-01')
    this.mute()
    this.npc.play(`idle-${this.name}`)
  }

  public getNpc = () => this.npc

  private createFrameSets = (scene: Phaser.Scene) => {
    scene.anims.create({
      key: `idle-${this.name}`,
      frames: [
        {
          key: this.name,
          frame: 'idle-01',
        },
        {
          key: this.name,
          frame: 'idle-02',
        },
      ],
      frameRate: this.NPC_FRAMERATE,
      repeat: -1,
    })
  }

  talk = () => {
    this.talkImage.setVisible(true)
  }
  mute = () => {
    this.talkImage.setVisible(false)
  }
}
