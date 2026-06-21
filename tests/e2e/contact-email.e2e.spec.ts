import { test, expect } from '@playwright/test'

test.describe('Contact Email', () => {
  test('copy button shows Copied state after click', async ({ page, context }) => {
    // Grant clipboard permissions for the test
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('http://localhost:3000')

    const copyButton = page.getByRole('button', { name: 'Copy email address' })

    // Scroll to contact section to ensure button is in viewport
    await page.getByRole('link', { name: 'Contact' }).first().click()
    await expect(copyButton).toBeVisible()

    await copyButton.click()

    // After click, the button text should change to "Copied"
    const copiedButton = page.getByRole('button', { name: 'Email address copied' })
    await expect(copiedButton).toBeVisible()

    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toMatch(/^\S+@\S+\.\S+$/)

    // After 2 seconds, the button should revert
    await expect(copyButton).toBeVisible({ timeout: 3000 })
  })

  test('email link is present and has mailto href', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('link', { name: 'Contact' }).first().click()

    const emailLink = page.locator('a[href^="mailto:"]')
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveAttribute('href', /^mailto:/)
  })
})
