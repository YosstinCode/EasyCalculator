import { chromium } from 'playwright'
import { config } from 'dotenv'

config()

// user and password for authenticate in celta
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD

// browser turn on
const browser = await chromium.launch({ headless: false })
const context = await browser.newContext()
const page = await context.newPage()
await page.goto('https://celta.unipiloto.edu.co/')
await page.waitForLoadState('domcontentloaded')

await page.screenshot({ path: 'capture/celta_1.png' })

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
console.log(await portalPage.title())
await portalPage.screenshot({ path: 'capture/celta_2.png' })

// accessing to notes
await portalPage.click('a:has-text("Alumnos")')
await portalPage.waitForLoadState('domcontentloaded')

await portalPage.click('#bmenu--P_AdminMnu___UID2')
await portalPage.waitForLoadState('domcontentloaded')

await portalPage.click('#contentItem11')
await portalPage.waitForLoadState('domcontentloaded')

await portalPage.screenshot({ path: 'capture/celta_3.png' })

await browser.close()
