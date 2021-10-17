import PlayerCharacter from '../PlayerCharacter'

export default class Hero extends PlayerCharacter {
  private lastMove = 'turn'
  private isJumping = false

  update = (cursors: Phaser.Types.Input.Keyboard.CursorKeys): void => {
    super.update(cursors)
    let moving = 'turn'
    if (cursors.left.isDown) {
      this.player.setVelocityX(-100)
      moving = 'left'
      this.hasTakenAction = true
      this.lastMove = 'stayLeft'
    } else if (cursors.right.isDown) {
      this.hasTakenAction = true
      this.player.setVelocityX(100)
      moving = 'right'
      this.lastMove = 'stayRight'
    } else if (cursors.down.isDown) {
      this.hasTakenAction = true
      moving = 'turn'
      this.lastMove = 'turn'
    } else {
      moving = this.lastMove
      if (!this.isJumping || this.player.body.touching.down) {
        this.player.setVelocityX(0)
      }
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.hasTakenAction = true
      this.isJumping = true
      this.player.setVelocityY(-200)
    }
    this.player.anims.play(moving, moving != 'turn')
  }
}
