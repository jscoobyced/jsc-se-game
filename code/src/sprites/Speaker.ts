import Phaser from 'phaser'
import general from '../config/general.json'

export default class Speaker {
  private name!: string
  private file!: string
  private characterType!: string
  private character!: string
  private talkImage!: Phaser.Physics.Arcade.Image
  private nameText!: Phaser.GameObjects.Text
  private isCurrentlyTalking = false
  private FONT_SIZE = 54

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
    this.nameText = scene.add.text(scene.game.canvas.width - general.controller + 100, 25, `${this.name}:`, {
      fontFamily: 'MumuFont',
      fontSize: `${this.FONT_SIZE}px`,
      color: 'brown',
    })
    this.mute()
  }

  public isTalking = () => this.isCurrentlyTalking

  talk = () => {
    this.isCurrentlyTalking = true
    this.talkImage.setVisible(true)
    this.nameText.setVisible(true)
  }

  mute = () => {
    this.isCurrentlyTalking = false
    this.talkImage.setVisible(false)
    this.nameText.setVisible(false)
  }

  getSpeech = (scene: Phaser.Scene, speech: string) => {
    const speechCache = scene.cache.json.get(`${this.name}SpeechText`)[this.characterType][this.character][speech]
    return speechCache
  }

  getName = () => this.name
}
