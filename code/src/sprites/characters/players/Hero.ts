import PlayerCharacter from '../PlayerCharacter'
import general from '../../../config/general.json'

export default class Hero extends PlayerCharacter {
  private lastMove = 'turn'
  private isJumping = false

  update = (cursors: Phaser.Types.Input.Keyboard.CursorKeys, time: number, delta: number): void => {
    super.update(cursors, time, delta)
    this.player.x += delta / 8
    if (this.player.x > general.width) {
      this.player.x = 0
    }
    /*
    let moving = 'turn'
    if (cursors.left.isDown) {
      this.player.setVelocityX(-100)
      moving = 'left'
      this.lastMove = 'stayLeft'
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(100)
      moving = 'right'
      this.lastMove = 'stayRight'
    } else if (cursors.down.isDown) {
      moving = 'turn'
      this.lastMove = 'turn'
    } else {
      moving = this.lastMove
      if (!this.isJumping || this.player.body.touching.down) {
        this.player.setVelocityX(0)
      }
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.isJumping = true
      this.player.setVelocityY(-200)
    }
    this.player.anims.play(moving, moving != 'turn')
    */
  }
}
