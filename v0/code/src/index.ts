import Phaser from 'phaser'
import config from './config'
import JscMaGameIntro from './scenes/JscMaGameIntro'

new Phaser.Game(
  Object.assign(config, {
    scene: [JscMaGameIntro],
  }),
)
