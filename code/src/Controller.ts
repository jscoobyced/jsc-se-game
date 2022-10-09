import general from './config/general.json'

export default class Controller {
  private scene: Phaser.Scene
  private leftController!: Phaser.GameObjects.Arc
  private rightController!: Phaser.GameObjects.Arc
  private downController!: Phaser.GameObjects.Arc
  private upController!: Phaser.GameObjects.Arc
  private radiusController = 100
  private fromEdge = 20
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
      0.75,
    )
    this.rightController = this.scene.add.circle(
      this.getRightX(),
      this.getRightY(),
      this.radiusController,
      this.color,
      0.75,
    )
    this.downController = this.scene.add.circle(
      this.getDownX(),
      this.getDownY(),
      this.radiusController,
      this.color,
      0.75,
    )
    this.upController = this.scene.add.circle(this.getUpX(), this.getUpY(), this.radiusController, this.color, 0.75)
    this.leftController.setInteractive()
    this.leftController.setScrollFactor(0, 0)
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
    this.rightController.setScrollFactor(0, 0)
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
    this.downController.setScrollFactor(0, 0)
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
    this.upController.setScrollFactor(0, 0)
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
    return general.height - this.fromEdge - this.radiusController
  }

  private getUpX = (): number => {
    return this.fromEdge + this.radiusController * 3
  }

  private getUpY = (): number => {
    return general.height - this.fromEdge - this.radiusController * 5
  }
}
