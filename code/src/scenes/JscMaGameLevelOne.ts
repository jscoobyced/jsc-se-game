import general from '../config/general.json'
import SpeakerController from '../SpeakerController'
import Npc from '../sprites/Npc'
import Player from '../sprites/Player'
import Speaker from '../sprites/Speaker'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameLevelOne extends JscDefaultScene implements SpeakerController {
  private player = new Player()
  private forestGuy = new Npc('Jordan', 'forest-guy')
  private nextSpeaker!: boolean | Speaker

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
    this.physics.add.collider(this.player.getPlayer(), this.forestGuy.getNpc(), this.talkForestGuy)
  }

  update = (time: number): void => {
    if (!this.forestGuy.getSpeaker().isTalking()) {
      this.player.update(time)
    } else {
      this.player.stop()
    }
  }

  public hasNextSpeaker = (): boolean | Speaker => {
    const next = this.nextSpeaker
    this.nextSpeaker = false
    return next
  }

  private talkForestGuy = () => {
    this.nextSpeaker = this.player.getSpeaker()
    this.forestGuy.getSpeaker().startTalking(this.banner, this)
  }
}
