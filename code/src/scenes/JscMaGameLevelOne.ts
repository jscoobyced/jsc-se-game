import general from '../config/general.json'
import Npc from '../sprites/Npc'
import Player from '../sprites/Player'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameLevelOne extends JscDefaultScene {
  private player = new Player()
  private forestGuy = new Npc('Jordan', 'forest-guy', 350, 350)

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
    this.player.create(this)
    this.createLayers(this.player.getPlayer())
    this.forestGuy.create(this)
    this.physics.add.collider(this.player.getPlayer(), this.forestGuy.getNpc())
  }

  update = (time: number): void => {
    this.player.update(time)
  }

  meetForestGuy = () => {
    //
  }
}
