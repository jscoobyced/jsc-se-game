import Phaser from 'phaser'
import general from '../config/general.json'
import Speaker from './Speaker'

export default class Npc {
  private name: string
  private sprite: string
  private levelName: string
  private character: string
  private npc!: Phaser.Physics.Arcade.Sprite
  private NPC_FRAMERATE = 4
  private speaker!: Speaker

  public constructor(name: string, sprite: string, levelName: string, character: string) {
    this.name = name
    this.sprite = sprite
    this.levelName = levelName
    this.character = character
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.atlas(
      this.name,
      `${general.baseUrls.images}/${this.sprite}.png`,
      `${general.baseUrls.json}/${this.sprite}.json`,
    )
    this.speaker = new Speaker(this.name, this.levelName, 'npcs', this.character)
    this.speaker.preload(scene)
  }

  create = (scene: Phaser.Scene): void => {
    this.npc = scene.physics.add.staticSprite(280, 450, this.name)
    this.createFrameSets(scene)
    this.npc.play(`idle-${this.name}`)
    this.speaker.create(scene)
  }

  public getNpc = () => this.npc

  public getSpeaker = () => this.speaker

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
}
