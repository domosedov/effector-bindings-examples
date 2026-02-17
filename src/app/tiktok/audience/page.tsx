import { createQueryClient } from '@/shared/lib/react-query/client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { tiktokKeys } from '../_shared/api'
import { mockAudience } from '../_shared/mock-data'
import { AudienceContent } from './_page/ui'

export default async function TiktokAudiencePage() {
  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: tiktokKeys.audience,
    queryFn: () => Promise.resolve(mockAudience),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AudienceContent />
    </HydrationBoundary>
  )
}
