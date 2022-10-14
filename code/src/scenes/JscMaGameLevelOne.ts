import general from '../config/general.json'
import Npc from '../sprites/Npc'
import Player from '../sprites/Player'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameLevelOne extends JscDefaultScene {
  private player = new Player()
  private forestGuy = new Npc('Jordan', 'forest-guy', 350, 350)
  private forestGuySpeechText!: string[][]
  private forestGuySpeechIndex = 0
  private isTalking = false

  public constructor() {
    super(general.levels.levelOne.key, general.levels.levelOne)
  }

  preload = (): void => {
    this.defaultPreload()
    this.forestGuy.preload(this)
    this.player.preload(this)
    this.load.json('forestGuySpeechText', `${general.baseUrls.json}/levelOne-text.json`)
  }

  create = (): void => {
    this.createMap()
    this.player.create(this, this.cursor, this.controller)
    this.createLayers(this.player.getPlayer())
    this.forestGuySpeechText = this.cache.json.get('forestGuySpeechText')['npcs']['forest-guy']['level-one']
    this.forestGuy.create(this)
    this.physics.add.collider(this.player.getPlayer(), this.forestGuy.getNpc(), this.talkForestGuy)
  }

  update = (time: number): void => {
    if (!this.isTalking) {
      this.player.update(time)
    } else {
      this.player.stop()
    }
  }

  private talkForestGuy = () => {
    if (!this.isTalking) {
      this.isTalking = true
      this.forestGuy.talk()
      this.showNextText()
    }
  }

  private showNextText = () => {
    const text = this.nextText()
    if (text && text.length > 0) {
      this.showText(text, () => {
        this.showNextText()
      })
    } else {
      this.hideText()
      this.forestGuy.mute()
      this.isTalking = false
      this.forestGuySpeechIndex = 0
    }
  }

  private nextText = (): string[] => {
    let textStr: string[] = []
    if (this.forestGuySpeechIndex <= this.forestGuySpeechText.length) {
      textStr = this.forestGuySpeechText[this.forestGuySpeechIndex]
      this.forestGuySpeechIndex = this.forestGuySpeechIndex + 1
    }
    return textStr
  }
}
