import Phaser from 'phaser'
import config from './config'
import JscSeGameIntro from './scenes/JscSeGameIntro'

new Phaser.Game(
  Object.assign(config, {
    scene: [JscSeGameIntro],
  }),
)
