export function createWordSpaces(runtime: IRuntime, word: string) {
  const letters = word.split('')

  const anchor = runtime.objects.LetterAnchor.getFirstInstance()!
  const { x, y } = anchor

  letters.forEach((letter, index) => {
    const newLetter = runtime.objects.Letter.createInstance(
      0,
      x + 64 * index,
      y
    )
    newLetter.text = letter
    console.log({ letters, letter })
  })
}
