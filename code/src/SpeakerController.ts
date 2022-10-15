import Speaker from './sprites/Speaker'

export default interface SpeakerController {
  hasNextSpeaker(): boolean | Speaker
}
