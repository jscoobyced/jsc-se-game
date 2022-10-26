import Speaker from '../sprites/Speaker'

export default class Dialog {
  public speaker: Speaker
  public speech: string[]

  public constructor(speaker: Speaker, speech: string[]) {
    this.speaker = speaker
    this.speech = speech
  }
}
