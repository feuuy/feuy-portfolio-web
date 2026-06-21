import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/FEUY/)
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: /production-ready/i })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Case studies', exact: true })).toBeVisible()
    await expect(page.getByRole('region', { name: 'About', exact: true })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Contact', exact: true })).toBeVisible()
  })

  test('work section renders project previews', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const workSection = page.getByRole('region', { name: 'Case studies', exact: true })

    await expect(workSection.getByRole('heading', { level: 2, name: 'Case studies' })).toBeVisible()
    await expect(workSection.getByText('Featured Projects will live here next')).not.toBeAttached()
  })

  test('case study page shows not-found for missing project', async ({ page }) => {
    await page.goto('http://localhost:3000/work/99999')

    await expect(page.getByRole('heading', { name: /doesn't exist/i })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back to Home' })).toBeVisible()
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

  test('case study page exposes project-specific metadata', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const viewCaseStudy = page.getByRole('link', { name: 'View case study' }).first()

    if (await viewCaseStudy.isVisible().catch(() => false)) {
      await viewCaseStudy.click()

      await expect(page).not.toHaveTitle(/^FEUY —/)
      await expect(page).toHaveTitle(/ — FEUY$/)
    }
  })

  test('missing project page exposes generic not-found title', async ({ page }) => {
    await page.goto('http://localhost:3000/work/99999')

    await expect(page).toHaveTitle(/^Not Found/)
  })

  test.describe('homepage navigation', () => {
    test('header work link scrolls to work section', async ({ page }) => {
      await page.goto('http://localhost:3000')

      await page
        .getByRole('navigation', { name: 'Primary' })
        .getByRole('link', { name: 'Work' })
        .click()

      const workHeading = page.getByRole('heading', { level: 2, name: 'Case studies' })
      await expect(workHeading).toBeInViewport()
    })

    test('header contact link scrolls to contact section', async ({ page }) => {
      await page.goto('http://localhost:3000')

      await page
        .getByRole('navigation', { name: 'Primary' })
        .getByRole('link', { name: 'Contact' })
        .click()

      const contactHeading = page.getByRole('heading', { level: 2, name: 'Contact' })
      await expect(contactHeading).toBeInViewport()
    })

    test('footer navigation links are present', async ({ page }) => {
      await page.goto('http://localhost:3000')

      const footer = page.getByRole('contentinfo')
      await expect(footer.getByRole('link', { name: 'Work' })).toBeVisible()
      await expect(footer.getByRole('link', { name: 'About' })).toBeVisible()
      await expect(footer.getByRole('link', { name: 'Contact' })).toBeVisible()
    })
  })

  test.describe('case study navigation', () => {
    test('back to work link returns to homepage work section', async ({ page }) => {
      await page.goto('http://localhost:3000')

      const viewCaseStudy = page.getByRole('link', { name: 'View case study' }).first()

      if (await viewCaseStudy.isVisible().catch(() => false)) {
        await viewCaseStudy.click()

        const backLink = page.getByRole('link', { name: 'Back to Work' }).first()
        await backLink.click()

        await expect(page.getByRole('heading', { level: 2, name: 'Case studies' })).toBeInViewport()
      }
    })

    test('contact link routes to homepage contact section', async ({ page }) => {
      await page.goto('http://localhost:3000')

      const viewCaseStudy = page.getByRole('link', { name: 'View case study' }).first()

      if (await viewCaseStudy.isVisible().catch(() => false)) {
        await viewCaseStudy.click()

        const contactLink = page.getByRole('link', { name: 'Contact' }).last()
        await contactLink.click()

        await expect(page.getByRole('heading', { level: 2, name: 'Contact' })).toBeInViewport()
      }
    })
  })
})
