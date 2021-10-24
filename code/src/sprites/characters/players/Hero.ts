import PlayerCharacter from '../PlayerCharacter'
import general from '../../../config/general.json'

export default class Hero extends PlayerCharacter {
  update = (cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void => {
    super.update(cursors, time, delta)
    this.player.x += delta / 8
    if (this.player.x > general.width) {
      this.player.x = 0
    }
  }
}
