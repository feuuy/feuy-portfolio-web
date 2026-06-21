import { useState, useCallback, useEffect, useRef } from 'react'

export interface UseCopyToClipboardResult {
  copied: boolean
  fallback: boolean
  copy: () => Promise<void>
}

/**
 * Hook that manages clipboard copy with fallback.
 * - copied: true for 2 seconds after successful copy
 * - fallback: true if clipboard API fails, triggers mailto: after 1.2s
 */
export function useCopyToClipboard(text: string): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false)
  const [fallback, setFallback] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      clearTimeouts()
    }
  }, [clearTimeouts])

  const copy = useCallback(async () => {
    clearTimeouts()

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setFallback(true)
      timeoutRef.current = setTimeout(() => {
        window.location.href = `mailto:${text}`
      }, 1200)
    }
  }, [text, clearTimeouts])

  return { copied, fallback, copy }
}
