export default function ReactQueryExampleLoading() {
  return (
    <div className='container-base py-8'>
      <div className='mb-6 h-9 w-64 animate-pulse rounded bg-muted' />
      <div className='space-y-2'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='h-5 animate-pulse rounded bg-muted'
            style={{ width: `${60 + (i % 3) * 15}%` }}
          />
        ))}
      </div>
    </div>
  )
}
