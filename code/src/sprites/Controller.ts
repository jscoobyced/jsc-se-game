export default class Controller {
  private scene: Phaser.Scene
  private leftController!: Phaser.GameObjects.Arc
  private rightController!: Phaser.GameObjects.Arc
  private downController!: Phaser.GameObjects.Arc
  private upController!: Phaser.GameObjects.Arc
  private radiusController = 15
  private fromEdge = 2
  private color = 0xffffff
  private left = false
  private right = false
  private down = false
  private up = false

  public constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  public create = (): void => {
    this.leftController = this.scene.add.circle(
      this.getLeftX(),
      this.getLeftY(),
      this.radiusController,
      this.color,
      0.5,
    )
    this.rightController = this.scene.add.circle(
      this.getRightX(),
      this.getRightY(),
      this.radiusController,
      this.color,
      0.5,
    )
    this.downController = this.scene.add.circle(
      this.getDownX(),
      this.getDownY(),
      this.radiusController,
      this.color,
      0.5,
    )
    this.upController = this.scene.add.circle(this.getUpX(), this.getUpY(), this.radiusController, this.color, 0.5)
    this.leftController.setInteractive()
    this.leftController.on('pointerdown', () => {
      this.left = true
    })
    this.leftController.on('pointerup', () => {
      this.left = false
    })
    this.leftController.on('pointerout', () => {
      this.left = false
    })
    this.rightController.setInteractive()
    this.rightController.on('pointerdown', () => {
      this.right = true
    })
    this.rightController.on('pointerup', () => {
      this.right = false
    })
    this.rightController.on('pointerout', () => {
      this.right = false
    })
    this.downController.setInteractive()
    this.downController.on('pointerdown', () => {
      this.down = true
    })
    this.downController.on('pointerup', () => {
      this.down = false
    })
    this.downController.on('pointerout', () => {
      this.down = false
    })
    this.upController.setInteractive()
    this.upController.on('pointerdown', () => {
      this.up = true
    })
    this.upController.on('pointerup', () => {
      this.up = false
    })
    this.upController.on('pointerout', () => {
      this.up = false
    })
  }

  public isMoveNorth = (): boolean => {
    return this.up
  }

  public isMoveSouth = (): boolean => {
    return this.down
  }

  public isMoveEast = (): boolean => {
    return this.right
  }

  public isMoveWest = (): boolean => {
    return this.left
  }

  public update = (): void => {
    this.leftController.x = this.getLeftX() + this.scene.cameras.main.scrollX
    this.leftController.y = this.getLeftY() + this.scene.cameras.main.scrollY
    this.rightController.x = this.getRightX() + this.scene.cameras.main.scrollX
    this.rightController.y = this.getRightY() + this.scene.cameras.main.scrollY
    this.downController.x = this.getDownX() + this.scene.cameras.main.scrollX
    this.downController.y = this.getDownY() + this.scene.cameras.main.scrollY
    this.upController.x = this.getUpX() + this.scene.cameras.main.scrollX
    this.upController.y = this.getUpY() + this.scene.cameras.main.scrollY
  }

  private getLeftX = (): number => {
    return this.fromEdge + this.radiusController
  }

  private getLeftY = (): number => {
    return this.scene.game.canvas.height - (this.fromEdge + this.radiusController * 3)
  }

  private getRightX = (): number => {
    return this.fromEdge + this.radiusController * 5
  }

  private getRightY = (): number => {
    return this.scene.game.canvas.height - (this.fromEdge + this.radiusController * 3)
  }

  private getDownX = (): number => {
    return this.fromEdge + this.radiusController * 3
  }

  private getDownY = (): number => {
    return this.scene.game.canvas.height - this.fromEdge - this.radiusController
  }

  private getUpX = (): number => {
    return this.fromEdge + this.radiusController * 3
  }

  private getUpY = (): number => {
    return this.scene.game.canvas.height - this.fromEdge - this.radiusController * 5
  }
}
