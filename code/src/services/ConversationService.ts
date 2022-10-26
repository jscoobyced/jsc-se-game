import Dialog from '../models/Dialog'
import Banner from '../sprites/Banner'
import Speaker from '../sprites/Speaker'

export default class ConversationService {
  private banner: Banner
  private dialogs: Dialog[] = []
  private previousSpeaker!: Speaker

  public constructor(banner: Banner) {
    this.banner = banner
  }

  public resetConversation = () => {
    this.dialogs = []
  }

  public addToConversation = (dialog: Dialog) => {
    console.log(dialog.speech)
    this.dialogs.push(dialog)
  }

  public startConversation = () => {
    this.banner.show()
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
      this.banner.hide()
    }
  }
}
