import general from '../config/general.json'
import Dialog from '../models/Dialog'
import ConversationService from '../services/ConversationService'
import Npc from '../sprites/Npc'
import Speaker from '../sprites/Speaker'
import JscDefaultPlayerScene from './JscDefaultPlayerScene'

export default class JscMaGameLevelOne extends JscDefaultPlayerScene {
  private forestGuy = new Npc('Jordan', 'forest-guy', general.levels.levelOne.key, 'forest-guy')
  private conversationService!: ConversationService

  public constructor() {
    super(general.levels.levelOne.key, general.levels.levelOne)
  }

  getLevelName(): string {
    return general.levels.levelOne.key
  }

  shouldUpdate = () => !this.forestGuy.getSpeaker().isTalking()

  doPreload = (): void => {
    this.forestGuy.preload(this)
  }

  doCreate = (): void => {
    this.forestGuy.create(this)
    this.physics.add.collider(this.player.getPlayer(), this.forestGuy.getNpc(), this.startConversation)
    this.conversationService = new ConversationService(this.banner, this)
  }

  private startConversation = () => {
    const forestGuySpeaker = this.forestGuy.getSpeaker()
    const playerSpeaker = this.player.getSpeaker()
    const progress = this.progressSaveService.getProgress()
    if (progress === 0) {
      this.firstTask(playerSpeaker, forestGuySpeaker)
    } else if (progress === 1) {
      this.secondTalk(forestGuySpeaker)
    }
    this.conversationService.startConversation(this.progressSaveService, 1)
  }

  private firstTask = (playerSpeaker: Speaker, forestGuySpeaker: Speaker) => {
    forestGuySpeaker.getSpeech(this, 'level-one-intro-01').forEach((speech: string[]) => {
      this.conversationService.addToConversation(new Dialog(forestGuySpeaker, speech))
    })
    playerSpeaker.getSpeech(this, 'level-one-intro-01').forEach((speech: string[]) => {
      this.conversationService.addToConversation(new Dialog(playerSpeaker, speech))
    })
    forestGuySpeaker.getSpeech(this, 'level-one-intro-02').forEach((speech: string[]) => {
      this.conversationService.addToConversation(new Dialog(forestGuySpeaker, speech))
    })
    playerSpeaker.getSpeech(this, 'level-one-intro-02').forEach((speech: string[]) => {
      this.conversationService.addToConversation(new Dialog(playerSpeaker, speech))
    })
    forestGuySpeaker.getSpeech(this, 'level-one-intro-03').forEach((speech: string[]) => {
      this.conversationService.addToConversation(new Dialog(forestGuySpeaker, speech))
    })
  }

  private secondTalk = (forestGuySpeaker: Speaker) => {
    forestGuySpeaker.getSpeech(this, 'level-one-intro-04').forEach((speech: string[]) => {
      this.conversationService.addToConversation(new Dialog(forestGuySpeaker, speech))
    })
  }
}
