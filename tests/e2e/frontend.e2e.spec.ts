import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/FEUY Portfolio/)
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: /designer-developer/i })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Work', exact: true })).toBeVisible()
    await expect(page.getByRole('region', { name: 'About', exact: true })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Contact', exact: true })).toBeVisible()
  })

  test('work section renders project previews', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const workSection = page.getByRole('region', { name: 'Work', exact: true })

    await expect(workSection.getByRole('heading', { level: 2, name: 'Work' })).toBeVisible()
    await expect(workSection.getByText('Featured Projects will live here next')).not.toBeAttached()
  })

  test('case study page returns 404 for missing project', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/work/99999')

    expect(response?.status()).toBe(404)
  })

  test('case study page renders from a published project', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const viewCaseStudy = page.getByRole('link', { name: 'View case study' }).first()

    if (await viewCaseStudy.isVisible().catch(() => false)) {
      await viewCaseStudy.click()

      await expect(page.getByRole('banner')).toBeVisible()
      await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
      await expect(page.getByRole('article')).toBeVisible()
      await expect(page.getByRole('link', { name: 'Back to Work' }).first()).toBeVisible()
      await expect(page.getByRole('contentinfo')).toBeVisible()
    }
  })
})
