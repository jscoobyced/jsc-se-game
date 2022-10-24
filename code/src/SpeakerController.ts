import Speaker from './sprites/Speaker'

export default interface SpeakerController {
  hasMoreSpeaker(): boolean
  nextSpeaker(): Speaker | undefined
  addSpeaker(speaker: Speaker): void
}
