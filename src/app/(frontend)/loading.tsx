export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-32 lg:px-12">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-moss-mark border-t-transparent" />
        <p className="text-sm text-lichen-muted">Loading...</p>
      </div>
    </div>
  )
}
