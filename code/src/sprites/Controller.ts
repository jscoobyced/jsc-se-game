export default class Controller {
  private scene: Phaser.Scene
  private controller!: Phaser.GameObjects.Arc
  private radiusBoundary = 80
  private radiusController = 30
  private fromEdge = 5
  private color = 0xffffff
  private isMoving = false

  public constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  public create = (): void => {
    this.scene.add.circle(this.getCenterX(), this.getCenterY(), this.radiusBoundary).setStrokeStyle(2, this.color, 0.5)
    this.controller = this.scene.add.circle(
      this.getCenterX(),
      this.getCenterY(),
      this.radiusController,
      this.color,
      0.5,
    )
    this.controller.setInteractive()
    this.controller.on('pointerdown', () => {
      this.isMoving = true
    })
    this.controller.on('pointerup', () => {
      this.stop()
    })
    this.controller.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!this.isWithinCircle(this.controller.x, this.controller.y)) {
        this.stop()
      } else if (this.isMoving) {
        this.controller.x = pointer.x
        this.controller.y = pointer.y
      }
    })
  }

  public isMoveNorth = (): boolean => {
    return this.controller.y < this.getCenterY() - 5
  }

  public isMoveSouth = (): boolean => {
    return this.controller.y > this.getCenterY() + 5
  }

  public isMoveEast = (): boolean => {
    return this.controller.x > this.getCenterX() + 5
  }

  public isMoveWest = (): boolean => {
    return this.controller.x < this.getCenterX() - 5
  }

  private getCenterX = (): number => {
    return this.radiusBoundary + this.fromEdge
  }

  private stop = (): void => {
    this.controller.x = this.getCenterX()
    this.controller.y = this.getCenterY()
    this.isMoving = false
  }

  private getCenterY = () => {
    return this.scene.game.canvas.height - (this.radiusBoundary + this.fromEdge)
  }

  private isWithinCircle = (x: number, y: number): boolean => {
    return (
      Math.pow(x - this.getCenterX(), 2) + Math.pow(y - this.getCenterY(), 2) <
      Math.pow(this.radiusBoundary - this.radiusController / 2, 2)
    )
  }
}
