export default interface ProgressTracker {
  updateProgress: (progress: number) => void
  getProgress: () => number
  updatePosition: (position: { x: number; y: number }) => void
}
