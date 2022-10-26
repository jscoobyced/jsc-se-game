import general from '../config/general.json'
import Dialog from '../models/Dialog'
import ConversationService from '../services/ConversationService'
import Npc from '../sprites/Npc'
import Player from '../sprites/Player'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameLevelOne extends JscDefaultScene {
  private player = new Player()
  private forestGuy = new Npc('Jordan', 'forest-guy')
  private conversationService: ConversationService = new ConversationService(this.banner)

  public constructor() {
    super(general.levels.levelOne.key, general.levels.levelOne)
  }

  preload = (): void => {
    this.defaultPreload()
    this.forestGuy.preload(this)
    this.player.preload(this)
  }

  create = (): void => {
    this.createMap()
    this.player.create(this, this.cursor, this.controller)
    this.createLayers(this.player.getPlayer())
    this.forestGuy.create(this)
    this.physics.add.collider(
      this.player.getPlayer(),
      this.forestGuy.getNpc(),
      this.conversationService.startConversation,
    )
    const forestGuySpeaker = this.forestGuy.getSpeaker()
    const playerSpeaker = this.player.getSpeaker()
    this.conversationService.addToConversation(
      new Dialog(forestGuySpeaker, forestGuySpeaker.getSpeech(this, 'level-one-intro-01')),
    )
    this.conversationService.addToConversation(
      new Dialog(playerSpeaker, playerSpeaker.getSpeech(this, 'level-one-intro')),
    )
    this.conversationService.addToConversation(
      new Dialog(forestGuySpeaker, forestGuySpeaker.getSpeech(this, 'level-one-intro-02')),
    )
  }

  update = (time: number): void => {
    if (!this.forestGuy.getSpeaker().isTalking()) {
      this.player.update(time)
    } else {
      this.player.stop()
    }
  }
}
