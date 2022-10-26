import Dialog from '../models/Dialog'
import Banner from '../sprites/Banner'
import Speaker from '../sprites/Speaker'

export default class ConversationService {
  private banner: Banner
  private scene: Phaser.Scene
  private dialogs: Dialog[] = []
  private previousSpeaker!: Speaker

  public constructor(banner: Banner, scene: Phaser.Scene) {
    this.banner = banner
    this.scene = scene
  }

  public resetConversation = () => {
    this.dialogs = []
  }

  public addToConversation = (dialog: Dialog) => {
    this.dialogs.push(dialog)
  }

  public startConversation = () => {
    this.banner.show(this.scene)
    this.continueConversation()
  }

  public continueConversation = () => {
    if (this.previousSpeaker !== undefined) {
      this.previousSpeaker.mute()
    }
    const next = this.dialogs.shift()
    if (next !== undefined) {
      this.previousSpeaker = next?.speaker
      const speech = next?.speech
      this.previousSpeaker?.talk()
      if (speech) this.banner.showText(speech, this.continueConversation)
    } else {
      this.banner.hide(this.scene)
    }
  }
}
