import Phaser from 'phaser'
import config from './config'
import JscMaGameIntro from './scenes/JscMaGameIntro'
import JscMaGameLevelOne from './scenes/JscMaGameLevelOne'

new Phaser.Game(
  Object.assign(config, {
    scene: [JscMaGameIntro, JscMaGameLevelOne],
  }),
)
