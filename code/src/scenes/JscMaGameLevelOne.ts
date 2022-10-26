import general from '../config/general.json'
import Dialog from '../models/Dialog'
import ConversationService from '../services/ConversationService'
import ProgressTracker from '../services/ProgressTracker'
import Npc from '../sprites/Npc'
import Player from '../sprites/Player'
import Speaker from '../sprites/Speaker'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameLevelOne extends JscDefaultScene implements ProgressTracker {
  private player = new Player()
  private forestGuy = new Npc('Jordan', 'forest-guy')
  private conversationService!: ConversationService

  public constructor() {
    super(general.levels.levelOne.key, general.levels.levelOne)
  }

  updateProgress = (progress: number) => {
    this.saveFile.level.progress = progress
    this.saveGame()
  }

  preload = (): void => {
    this.defaultPreload()
    this.forestGuy.preload(this)
    this.player.preload(this)
  }

  create = (): void => {
    this.createMap()
    this.saveFile.level.name = general.levels.levelOne.key
    this.player.create(this.saveFile.position.x, this.saveFile.position.y, this, this.cursor, this.controller)
    this.createLayers(this.player.getPlayer())
    this.forestGuy.create(this)
    this.physics.add.collider(this.player.getPlayer(), this.forestGuy.getNpc(), this.startConversation)
    this.conversationService = new ConversationService(this.banner, this)
  }

  update = (time: number): void => {
    if (!this.forestGuy.getSpeaker().isTalking()) {
      this.player.update(time)
      this.saveFile.position.x = this.player.getPlayer().x
      this.saveFile.position.y = this.player.getPlayer().y
      this.saveGame()
    } else {
      this.player.stop()
    }
  }

  private startConversation = () => {
    const forestGuySpeaker = this.forestGuy.getSpeaker()
    const playerSpeaker = this.player.getSpeaker()
    if (this.saveFile.level.progress === 0) {
      this.firstTask(playerSpeaker, forestGuySpeaker)
    } else if (this.saveFile.level.progress === 1) {
      this.secondTalk(forestGuySpeaker)
    }
    this.conversationService.startConversation(this, 1)
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
