import general from '../config/general.json'
import Dialog from '../models/Dialog'
import ConversationService from '../services/ConversationService'
import Object from '../sprites/Object'
import JscDefaultPlayerScene from './JscDefaultPlayerScene'

export default class JscMaGameLevelTwo extends JscDefaultPlayerScene {
  private object = new Object('FriendsHouse', 'object', 1695, 626)
  private conversationService!: ConversationService

  public constructor() {
    super(general.levels.levelTwo.key, general.levels.levelTwo)
  }

  getLevelName(): string {
    return general.levels.levelTwo.key
  }

  shouldUpdate = () => !this.player.getSpeaker().isTalking()

  colliding = () => {
    if (this.isPlayerExitingTop()) {
      this.goToScene(
        general.levels.levelOne.key,
        this.player.getPlayer().x,
        this.game.canvas.height - this.player.getPlayer().height,
      )
    } else {
      this.resetCollision()
    }
  }

  doPreload = (): void => {
    this.object.preload(this)
  }

  doCreate = (): void => {
    this.object.create(this)
    this.physics.add.collider(this.player.getPlayer(), this.object.getNpc(), this.enterFriendsHouse)
    this.conversationService = new ConversationService(this.banner, this)
  }

  private enterFriendsHouse = () => {
    if (this.progressSaveService.getProgress(general.levels.levelOne.key) >= 1) {
      const playerSpeaker = this.player.getSpeaker()
      playerSpeaker.getSpeech(this, 'level-two-house-01').forEach((speech: string[]) => {
        this.conversationService.addToConversation(new Dialog(playerSpeaker, speech))
      })
      this.conversationService.startConversation(this.progressSaveService, 1)
    }
  }
}
