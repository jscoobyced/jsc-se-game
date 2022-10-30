import Phaser from 'phaser'
import config from './config'
import JscMaGameIntro from './scenes/JscMaGameIntro'
import JscMaGameLevelOne from './scenes/JscMaGameLevelOne'
import JscMaGameLevelTwo from './scenes/JscMaGameLevelTwo'

new Phaser.Game(
  Object.assign(config, {
    scene: [JscMaGameIntro, JscMaGameLevelOne, JscMaGameLevelTwo],
  }),
)
