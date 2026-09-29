import { expect, test } from '@playwright/test'

test.describe('main journey', () => {
  test('navigates from catalog to podcast to episode', async ({ page }) => {
    await page.goto('/')

    const firstCard = page.locator('.podcast-card__link').first()
    await expect(firstCard).toBeVisible()
    await firstCard.click()

    await expect(page).toHaveURL(/\/podcasts\/\d+/)
    await expect(page.locator('.podcast-sidebar')).toBeVisible()

    const firstEpisode = page.locator('.episode-list__link').first()
    await expect(firstEpisode).toBeVisible()
    await firstEpisode.click()

    await expect(page).toHaveURL(/\/podcasts\/\d+\/episodes\/\d+/)
    await expect(page.locator('.episode-page__content h1')).toBeVisible()
    await expect(page.locator('audio')).toBeVisible()
  })
})
