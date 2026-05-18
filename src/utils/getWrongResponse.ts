export function getWrongResponse(
  wrongResponses: [string, string],
  wrongAttempts: number
): string {
  if (wrongAttempts <= 1) return wrongResponses[0]
  return wrongResponses[1]
}
