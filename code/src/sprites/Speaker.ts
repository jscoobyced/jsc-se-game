import Phaser from 'phaser'
import general from '../config/general.json'

export default class Speaker {
  private name!: string
  private file!: string
  private characterType!: string
  private character!: string
  private talkImage!: Phaser.Physics.Arcade.Image
  private isCurrentlyTalking = false

  public constructor(name: string, file: string, characterType: string, character: string) {
    this.name = name
    this.file = file
    this.characterType = characterType
    this.character = character
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.json(`${this.name}SpeechText`, `${general.baseUrls.json}/${this.file}-text.json`)
  }

  create = (scene: Phaser.Scene): void => {
    this.talkImage = scene.physics.add.image(
      scene.game.canvas.width - general.controller + 50,
      50,
      this.name,
      'idle-01',
    )
    this.mute()
  }

  public isTalking = () => this.isCurrentlyTalking

  talk = () => {
    this.isCurrentlyTalking = true
    this.talkImage.setVisible(true)
  }

  mute = () => {
    this.isCurrentlyTalking = false
    this.talkImage.setVisible(false)
  }

  getSpeech = (scene: Phaser.Scene, speech: string) => {
    return scene.cache.json.get(`${this.name}SpeechText`)[this.characterType][this.character][speech]
  }
}
