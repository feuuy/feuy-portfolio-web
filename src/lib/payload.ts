import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

let cachedPayload: Payload | null = null

/**
 * Returns a singleton Payload instance.
 * The first call initializes the instance; subsequent calls return the cached one.
 */
export async function getPayloadInstance(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload
  }

  const payloadConfig = await config
  cachedPayload = await getPayload({ config: payloadConfig })
  return cachedPayload
}
