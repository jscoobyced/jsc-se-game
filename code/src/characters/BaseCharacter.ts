import assets from '../config/assets.json'
import general from '../config/general.json'
import { CharacterAsset } from '../models/common'

export default class BaseCharacter {
    protected player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
        null as unknown as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

    private scene: Phaser.Scene
    private config: CharacterAsset

    public constructor(scene: Phaser.Scene, config: CharacterAsset) {
        this.scene = scene
        this.config = config
    }

    preload = () => {
        this.scene.load.spritesheet(this.config.key, this.config.value, {
            frameWidth: this.config.frameWidth,
            frameHeight: this.config.frameHeight,
        })
    }

    create = () => {
        this.player = this.scene.physics.add.sprite(
            assets.platform.width / 2,
            general.height - assets.platform.height - this.config.frameHeight / 2,
            this.config.key,
        )
        this.player.setBounce(0)
        this.player.setCollideWorldBounds(true)
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.config.key, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: this.config.key, frame: 4 }],
            frameRate: 20,
        })

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.config.key, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        })

        this.scene.anims.create({
            key: 'stayLeft',
            frames: [{ key: this.config.key, frame: 3 }],
            frameRate: 20,
        })

        this.scene.anims.create({
            key: 'stayRight',
            frames: [{ key: this.config.key, frame: 6 }],
            frameRate: 20,
        })
    }

    addCollider = (collideWith: Phaser.GameObjects.GameObject | Phaser.GameObjects.Group | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group[]) => {
        this.scene.physics.add.collider(this.player, collideWith)
    }

    update = (cursors: Phaser.Types.Input.Keyboard.CursorKeys) => {
    }

}