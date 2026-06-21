import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiter for demo purposes.
// In production, use Redis or a cloud rate limiter.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60_000 // 1 minute
const RATE_LIMIT_MAX = 100 // 100 requests per minute per IP

function getRateLimitStatus(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Add security headers to all responses
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'unknown'
    const { allowed, remaining } = getRateLimitStatus(ip)

    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX))
    response.headers.set('X-RateLimit-Remaining', String(remaining))

    if (!allowed) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW / 1000)),
        },
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
