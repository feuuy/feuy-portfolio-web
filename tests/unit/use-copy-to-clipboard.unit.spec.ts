import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCopyToClipboard } from '@/app/(frontend)/_hooks/use-copy-to-clipboard'

describe('useCopyToClipboard', () => {
  const originalClipboard = navigator.clipboard
  const originalLocation = window.location

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    })
  })

  it('sets copied to true on successful clipboard write', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { result } = renderHook(() => useCopyToClipboard('test@example.com'))

    expect(result.current.copied).toBe(false)
    expect(result.current.fallback).toBe(false)

    await act(async () => {
      await result.current.copy()
    })

    expect(writeText).toHaveBeenCalledWith('test@example.com')
    expect(result.current.copied).toBe(true)
    expect(result.current.fallback).toBe(false)
  })

  it('resets copied to false after 2 seconds', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { result } = renderHook(() => useCopyToClipboard('test@example.com'))

    await act(async () => {
      await result.current.copy()
    })

    expect(result.current.copied).toBe(true)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(result.current.copied).toBe(false)
    })
  })

  it('triggers fallback when clipboard API fails', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('Clipboard denied'))
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const hrefSetter = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { ...window.location, set href(v: string) { hrefSetter(v) } },
      writable: true,
      configurable: true,
    })

    const { result } = renderHook(() => useCopyToClipboard('fallback@example.com'))

    await act(async () => {
      await result.current.copy()
    })

    expect(result.current.fallback).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1200)
    })

    await waitFor(() => {
      expect(hrefSetter).toHaveBeenCalledWith('mailto:fallback@example.com')
    })
  })

  it('does nothing when email is empty', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { result } = renderHook(() => useCopyToClipboard(''))

    await act(async () => {
      await result.current.copy()
    })

    expect(writeText).toHaveBeenCalledWith('')
    expect(result.current.copied).toBe(true)
  })
})
