export class AbortError extends Error {
  constructor(message: string, public nodeId: string) {
    super(message)
  }
}
