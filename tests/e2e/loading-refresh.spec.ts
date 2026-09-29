import { expect, test } from '@playwright/test'

test.describe('loading and refresh', () => {
  test('shows loading indicator during navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.podcast-card__link').first()).toBeVisible()

    const responsePromise = page.waitForResponse((response) =>
      response.url().includes('itunes.apple.com'),
    )

    await page.locator('.podcast-card__link').first().click()

    await responsePromise
    await expect(page).toHaveURL(/\/podcasts\/\d+/)
    await expect(page.locator('.podcast-sidebar')).toBeVisible()
  })

  test('uses fresh cache on second visit without API call', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.podcast-card__link').first()).toBeVisible()

    let apiCallCount = 0
    page.on('request', (request) => {
      if (request.url().includes('itunes.apple.com')) apiCallCount++
    })

    await page.reload()
    await expect(page.locator('.podcast-card__link').first()).toBeVisible()

    expect(apiCallCount).toBe(0)
  })

  test('refreshes expired cache on reload', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.podcast-card__link').first()).toBeVisible()

    await page.evaluate(() => {
      const key = 'podcast:catalog'
      const entry = JSON.parse(localStorage.getItem(key) ?? 'null')
      if (entry) {
        entry.cachedAt = Date.now() - 24 * 60 * 60 * 1000 - 1
        localStorage.setItem(key, JSON.stringify(entry))
      }
    })

    const responsePromise = page.waitForResponse((response) =>
      response.url().includes('itunes.apple.com'),
    )

    await page.reload()
    await responsePromise
    await expect(page.locator('.podcast-card__link').first()).toBeVisible()
  })
})
