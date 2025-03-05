const mockWords = ['banana', 'apple', 'orange', 'grape', 'mellon', 'berry']

export function getRandomWord(): string {
  return mockWords.sort(() => Math.random() - 0.5)[0]
}
