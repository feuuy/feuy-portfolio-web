export interface ProjectPublicationData {
  _status?: string
  order?: number
  previewImage?: unknown
  workType?: string
  previewSummary?: string
  framingSummary?: string
  roleContext?: string
  decisions?: unknown[]
  outcome?: string
  learning?: string
}

const PUBLISHED_STATUS = 'published'

/**
 * Validates that a project has all required fields for publication.
 * Returns an array of error messages. Empty array means valid.
 * This is a pure function — no database access.
 */
export function validateProjectPublicationFields(data: ProjectPublicationData): string[] {
  const errors: string[] = []

  if (data._status !== PUBLISHED_STATUS) {
    return errors
  }

  if (!data.previewImage) {
    errors.push('Published projects must include a Preview Image.')
  }

  if (!data.previewSummary) {
    errors.push('Published projects must include a Preview Summary.')
  }

  if (!data.framingSummary) {
    errors.push('Published projects must include a Framing Summary.')
  }

  if (!data.roleContext) {
    errors.push('Published projects must include a Role Context statement.')
  }

  if (!data.decisions || !Array.isArray(data.decisions) || data.decisions.length === 0) {
    errors.push('Published projects must include at least one decision.')
  }

  if (data.workType === 'shipped' && !data.outcome) {
    errors.push('Published shipped projects must include an Outcome.')
  }

  if (data.workType === 'speculative' && !data.learning) {
    errors.push('Published speculative projects must include a Learning section.')
  }

  if (typeof data.order !== 'number') {
    errors.push('Published projects must include an Editorial Order.')
  }

  return errors
}
