import { createQueryClient } from '@/shared/lib/react-query/client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { tiktokKeys } from '../_shared/api'
import { mockVideosResponse } from '../_shared/mock-data'
import { VideosContent } from './_page/ui'

export default async function TiktokVideosPage() {
  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: tiktokKeys.videos,
    queryFn: () => Promise.resolve(mockVideosResponse),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideosContent />
    </HydrationBoundary>
  )
}
