import Phaser from 'phaser'
import general from './general.json'

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#29adff',
  scale: {
    width: general.width,
    height: general.height,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  showTitle: true,
}
