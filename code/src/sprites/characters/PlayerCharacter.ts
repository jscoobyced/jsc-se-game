import BaseSprite from '../BaseSprite'

export default class PlayerCharacter extends BaseSprite {
  protected player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    null as unknown as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
}
