import { chromium } from 'playwright'
import { config } from 'dotenv'

config()

// user and password for authenticate in celta
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const SEMESTER = '202210'

// browser turn on
const browser = await chromium.launch()
const context = await browser.newContext()
const page = await context.newPage()
await page.goto('https://celta.unipiloto.edu.co/')
await page.waitForLoadState('domcontentloaded')

// accessing to Celta
await page.type('input[id=username]', USER)
await page.type('input[id=password]', PASSWORD)
await page.click('input[type=submit]')
await page.waitForLoadState('domcontentloaded')

// accesing to academy portal

const [portalPage] = await Promise.all([
  context.waitForEvent('page'), // wait for new tab open
  page.click('a[target="_blank"]', { hasText: 'Portal Académico' }) // Opens a new tab
])

await portalPage.waitForLoadState()

// accessing to notes
await portalPage.click('a:has-text("Alumnos")')
await portalPage.waitForLoadState('domcontentloaded')

// await portalPage.waitForTimeout(10000)
await portalPage.click('text=Mi Matricula')
await portalPage.waitForLoadState('domcontentloaded')

await portalPage.click('text=Detalle de Calificaciones')
await portalPage.waitForLoadState('domcontentloaded')

await portalPage.selectOption('select[name=term_in]', SEMESTER)

await portalPage.click('text=Enviar')

// get courses of semester
// await portalPage.screenshot({ path: 'capture/celta_5.png' })
const tablesText = await portalPage.locator('table').allTextContents() // get all tables from page

// await portalPage.screenshot({ path: 'capture/celta_6.png' })
const coursesArray = tablesText[5].split('\n') // select data about of courses

const categories = coursesArray.filter(course => course).map(course => course.trim()).slice(1, 9)
const coursesData = coursesArray.filter(course => course).map(course => course.trim()).slice(9)

const courses = categories.map((item, index) => {
  const course = coursesData.slice(0, 8)
  coursesData.splice(0, 8)

  return course
}).filter(course => course.length !== 0) // clean array
  .map((materias) => {
    const propierties = [0, 4, 6, 7]

    return materias.map((materia, indexProperty) => (propierties.indexOf(indexProperty) > -1) && materia) // select data important
      .filter(materia => materia)
  })

// console.log(courses)

// create array with nrcs from courses of courts

const nrcs = courses.map(course => course[0])

// console.log(nrcs)

// get notes of courses

const notesCourses = []

// await portalPage.screenshot({ path: 'capture/celta_1.png' })

for (const nrc of nrcs) {
  await portalPage.click(`text=${nrc}`)
  await portalPage.waitForLoadState('domcontentloaded')

  // await portalPage.screenshot({ path: 'capture/celta_2.png' })

  const tableNotes = await portalPage.locator('table').allInnerTexts()

  const notes = tableNotes[5].split('\n').splice(3).map(rowNotes => rowNotes.split('\t')[2])

  // console.log(notes)

  notesCourses.push(notes)

  await portalPage.goBack()
  await portalPage.waitForLoadState('domcontentloaded')
}

// :3 obtenido

const data = courses.map((course, index) => course.concat([notesCourses[index]]))
console.log(data)
// data.forEach(item => console.log(item[4]))

await portalPage.waitForTimeout(2000)
// await portalPage.screenshot({ path: 'capture/celta_4.png' })
await browser.close()
