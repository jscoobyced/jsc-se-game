import general from '../config/general.json'
import Player from '../sprites/Player'
import JscDefaultScene from './JscDefaultScene'

export default class JscMaGameLevelOne extends JscDefaultScene {
  private player = new Player()

  public constructor() {
    super(general.levels.levelOne.key, general.levels.levelOne)
  }

  preload = (): void => {
    this.defaultPreload()
    this.player.preload(this)
  }

  create = (): void => {
    this.createMap()
    this.player.create(this)
    this.createLayers(this.player.getPlayer())
  }

  update = (time: number): void => {
    this.player.update(time)
  }
}
