export const WORK_TYPE_VALUES = ['shipped', 'speculative'] as const

export type WorkType = (typeof WORK_TYPE_VALUES)[number]

export interface WorkTypeLabel {
  value: WorkType
  label: string
  tooltip: string
}

export const workTypeLabels: Record<WorkType, WorkTypeLabel> = {
  shipped: {
    value: 'shipped',
    label: 'Shipped',
    tooltip: 'Built, launched, and in production use',
  },
  speculative: {
    value: 'speculative',
    label: 'Speculative',
    tooltip: 'Design exploration or concept work, not client-shipped',
  },
}

/**
 * Returns the display label for a work type.
 * Falls back to the raw value if the work type is unknown.
 */
export function formatWorkType(workType: string | undefined): string {
  if (!workType) return ''
  return workTypeLabels[workType as WorkType]?.label ?? workType
}

/**
 * Returns the tooltip for a work type.
 */
export function getWorkTypeTooltip(workType: string | undefined): string {
  if (!workType) return ''
  return workTypeLabels[workType as WorkType]?.tooltip ?? ''
}

/**
 * Type guard that narrows a string to a known WorkType.
 */
export function isWorkType(value: string): value is WorkType {
  return WORK_TYPE_VALUES.includes(value as WorkType)
}
