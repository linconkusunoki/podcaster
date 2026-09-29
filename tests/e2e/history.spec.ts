import { expect, test } from '@playwright/test'

test.describe('browser history', () => {
  test('supports back and forward navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.podcast-card__link').first()).toBeVisible()

    await page.locator('.podcast-card__link').first().click()
    await expect(page).toHaveURL(/\/podcasts\/\d+/)

    await page.goBack()
    await expect(page).toHaveURL('/')
    await expect(page.locator('.podcast-card__link').first()).toBeVisible()

    await page.goForward()
    await expect(page).toHaveURL(/\/podcasts\/\d+/)
    await expect(page.locator('.podcast-sidebar')).toBeVisible()
  })
})
