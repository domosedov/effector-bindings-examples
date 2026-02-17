import type { Account, Audience, FollowerTrendPoint, VideosResponse } from './types'

export const mockAccount: Account = {
  displayName: 'TikTok Business Demo',
  avatarUrl: 'https://placehold.co/120x120/333/fff?text=TT',
  followerCount: 125400,
  followingCount: 342,
  likesCount: 2_340_000,
  videoCount: 287,
  bio: 'Official business demo account for TikTok analytics dashboard.',
}

export const mockFollowerTrend: FollowerTrendPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  return {
    date: date.toISOString().slice(0, 10),
    followers: 120_000 + Math.floor(Math.random() * 6000) + i * 180,
  }
})

export const mockVideosResponse: VideosResponse = {
  videos: Array.from({ length: 12 }, (_, i) => {
    const createTime = Math.floor(Date.now() / 1000) - i * 86400 * 3
    return {
      id: `video_${i + 1}`,
      title: `Business tip #${i + 1}: ${['Marketing strategy', 'Content planning', 'Audience growth', 'Brand voice', 'Analytics deep dive', 'Trend analysis', 'Engagement hacks', 'SEO basics', 'Ad targeting', 'Conversion tips', 'Hashtag strategy', 'Cross-posting'][i]}`,
      coverUrl: `https://placehold.co/320x180/222/fff?text=Video+${i + 1}`,
      createTime,
      duration: 15 + Math.floor(Math.random() * 45),
      viewCount: Math.floor(Math.random() * 500_000) + 10_000,
      likeCount: Math.floor(Math.random() * 50_000) + 1000,
      commentCount: Math.floor(Math.random() * 5000) + 100,
      shareCount: Math.floor(Math.random() * 3000) + 50,
    }
  }),
  cursor: 12,
  hasMore: false,
}

export const mockAudience: Audience = {
  genderDistribution: [
    { label: 'Male', value: 42 },
    { label: 'Female', value: 51 },
    { label: 'Other', value: 7 },
  ],
  ageDistribution: [
    { range: '13-17', value: 8 },
    { range: '18-24', value: 35 },
    { range: '25-34', value: 30 },
    { range: '35-44', value: 16 },
    { range: '45-54', value: 7 },
    { range: '55+', value: 4 },
  ],
  topCountries: [
    { country: 'US', value: 34 },
    { country: 'UK', value: 12 },
    { country: 'DE', value: 9 },
    { country: 'BR', value: 8 },
    { country: 'IN', value: 7 },
    { country: 'FR', value: 6 },
    { country: 'JP', value: 5 },
    { country: 'MX', value: 4 },
  ],
  activityByHour: Array.from({ length: 24 }, (_, hour) => ({
    hour,
    value: Math.floor(50 + 50 * Math.sin(((hour - 6) / 24) * Math.PI * 2) + Math.random() * 20),
  })),
}
