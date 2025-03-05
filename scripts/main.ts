// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
import { getRandomWord } from './core/getRandomWord.js'
import { createWordSpaces } from './core/createWordSpaces.js'

runOnStartup(async (runtime) => {
  // Code to run on the loading screen.
  // Note layouts, objects etc. are not yet available.

  runtime.addEventListener('beforeprojectstart', () =>
    OnBeforeProjectStart(runtime)
  )
})

async function OnBeforeProjectStart(runtime: IRuntime) {
  // Code to run just before 'On start of layout' on
  // the first layout. Loading has finished and initial
  // instances are created and available to use here.

  runtime.addEventListener('tick', () => Tick(runtime))
  runtime.addEventListener('keydown', (e) => Key(e, runtime))
  hideReferenceObjects(runtime)
  const word = getRandomWord()
  createWordSpaces(runtime, word)
}

function Key(event: KeyboardEvent, runtime: IRuntime) {
  if (event.key == ' ') {
    const letters = runtime.objects.Letter.getAllInstances()
    destroyAll(letters)
    const word = getRandomWord()
    createWordSpaces(runtime, word)
  }
}

function Tick(runtime: IRuntime) {
  const hintCounter = runtime.objects.LighBulbCounter.getFirstInstance()!
  const hints = runtime.globalVars.Hints
  hintCounter.width = hints * 64
}

function hideReferenceObjects(runtime: IRuntime) {
  const letterAnchors = runtime.objects.LetterAnchor.getAllInstances()
  hideAllObjects(letterAnchors)
  const hintButtons = runtime.objects.Button.getAllInstances()
  hideAllObjects(hintButtons)
}

function hideAllObjects(objects: IWorldInstance[]) {
  objects.forEach((object) => {
    object.isVisible = false
  })
}

function destroyAll(objects: IWorldInstance[]) {
  objects.forEach((object) => {
    object.destroy()
  })
}
