import NonPlayerCharacter from '../NonPlayerCharacter'
import general from '../../../config/general.json'

export default class IntroHero extends NonPlayerCharacter {
  update = (cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void => {
    super.update(cursors, time, delta)
    this.player.x += delta / 8
    if (this.player.x > general.width) {
      this.player.x = 0
    }
  }
}
