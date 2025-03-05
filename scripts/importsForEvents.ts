// Put imports here that you wish to use for script blocks in event sheets, e.g.:

// import * as myModule from "./mymodule.js";

// Then you can use 'myModule' in script blocks in event sheets.
const RED_COLOR_RGB = [255, 0, 0]
const BLACK_COLOR_RGB = [0, 0, 0]

function setLettersToDefaultState(runtime: IRuntime) {
  const letters = runtime.objects.Letter.getAllInstances()

  letters.forEach((letter) => {
    letter.fontColor = BLACK_COLOR_RGB
    letter.instVars.active = false
  })
}

function highLightLetter(runtime: IRuntime) {
  setLettersToDefaultState(runtime)

  const currentLetter = runtime.objects.Letter.getFirstPickedInstance()!

  if (currentLetter.instVars.resolved) {
    return
  }

  currentLetter.fontColor = RED_COLOR_RGB
  currentLetter.instVars.active = true

  const hints = runtime.globalVars.Hints

  if (hints > 0) {
    const button = runtime.objects.Button.getFirstInstance()!

    button.isVisible = true
  }
}

function getHint(runtime: IRuntime) {
  const hints = runtime.globalVars.Hints

  if (hints == 0) {
    return
  }

  const button = runtime.objects.Button.getFirstPickedInstance()!

  button.isVisible = false

  const letters = runtime.objects.Letter.getAllInstances()

  letters.forEach((letter) => {
    if (letter.instVars.active) {
      letter.text = letter.instVars.character
      letter.fontColor = BLACK_COLOR_RGB
      letter.instVars.active = false
      letter.instVars.resolved = true
    }
  })

  runtime.globalVars.Hints--

  setLettersToDefaultState(runtime)
}
