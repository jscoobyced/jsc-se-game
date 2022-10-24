import Phaser from 'phaser'
import general from '../config/general.json'
import SpeakerController from '../SpeakerController'
import Banner from './Banner'

export default class Speaker {
  private name!: string
  private file!: string
  private characterType!: string
  private character!: string
  private speech!: string
  private talkImage!: Phaser.Physics.Arcade.Image
  private characterSpeechText!: string[][]
  private characterSpeechIndex = 0
  private isCurrentlyTalking = false
  private speakerController!: SpeakerController

  public constructor(name: string, file: string, characterType: string, character: string, speech: string) {
    this.name = name
    this.file = file
    this.characterType = characterType
    this.character = character
    this.speech = speech
  }

  preload = (scene: Phaser.Scene): void => {
    scene.load.json(`${this.name}SpeechText`, `${general.baseUrls.json}/${this.file}-text.json`)
  }

  create = (scene: Phaser.Scene): void => {
    this.talkImage = scene.physics.add.image(50, 50, this.name, 'idle-01')
    this.mute()
    this.characterSpeechText = scene.cache.json.get(`${this.name}SpeechText`)[this.characterType][this.character][
      this.speech
    ]
  }

  public isTalking = () => this.isCurrentlyTalking

  talk = () => {
    this.talkImage.setVisible(true)
  }
  mute = () => {
    this.talkImage.setVisible(false)
  }
  public startTalking = (banner: Banner, speakerController: SpeakerController) => {
    if (!this.isCurrentlyTalking) {
      this.speakerController = speakerController
      this.isCurrentlyTalking = true
      this.talk()
      this.showNextText(banner)
    }
  }

  private showNextText = (banner: Banner) => {
    const text = this.nextText()
    if (text && text.length > 0) {
      banner.showText(text, () => {
        this.showNextText(banner)
      })
    } else {
      banner.hide()
      this.mute()
      this.isCurrentlyTalking = false
      this.characterSpeechIndex = 0
      if (this.speakerController.hasMoreSpeaker()) {
        const speaker = this.speakerController.nextSpeaker()
        speaker?.startTalking(banner, this.speakerController)
      }
    }
  }

  private nextText = (): string[] => {
    let textStr: string[] = []
    if (this.characterSpeechIndex <= this.characterSpeechText.length) {
      textStr = this.characterSpeechText[this.characterSpeechIndex]
      this.characterSpeechIndex = this.characterSpeechIndex + 1
    }
    return textStr
  }
}
