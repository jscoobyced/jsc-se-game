import general from '../config/general.json'
import JscDefaultPlayerScene from './JscDefaultPlayerScene'

export default class JscMaGameLevelTwo extends JscDefaultPlayerScene {
  public constructor() {
    super(general.levels.levelTwo.key, general.levels.levelTwo)
  }

  getLevelName(): string {
    return general.levels.levelTwo.key
  }

  shouldUpdate = () => true

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
    //
  }

  doCreate = (): void => {
    //
  }
}
