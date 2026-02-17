import * as z from 'zod'

export const accountSchema = z.object({
  displayName: z.string(),
  avatarUrl: z.string(),
  followerCount: z.number(),
  followingCount: z.number(),
  likesCount: z.number(),
  videoCount: z.number(),
  bio: z.string(),
})

export type Account = z.infer<typeof accountSchema>

export const videoSchema = z.object({
  id: z.string(),
  title: z.string(),
  coverUrl: z.string(),
  createTime: z.number(),
  duration: z.number(),
  viewCount: z.number(),
  likeCount: z.number(),
  commentCount: z.number(),
  shareCount: z.number(),
})

export type Video = z.infer<typeof videoSchema>

export const videosResponseSchema = z.object({
  videos: z.array(videoSchema),
  cursor: z.number(),
  hasMore: z.boolean(),
})

export type VideosResponse = z.infer<typeof videosResponseSchema>

export const followerTrendPointSchema = z.object({
  date: z.string(),
  followers: z.number(),
})

export type FollowerTrendPoint = z.infer<typeof followerTrendPointSchema>

export const genderDistributionSchema = z.object({
  label: z.string(),
  value: z.number(),
})

export type GenderDistribution = z.infer<typeof genderDistributionSchema>

export const ageDistributionSchema = z.object({
  range: z.string(),
  value: z.number(),
})

export type AgeDistribution = z.infer<typeof ageDistributionSchema>

export const countryDistributionSchema = z.object({
  country: z.string(),
  value: z.number(),
})

export type CountryDistribution = z.infer<typeof countryDistributionSchema>

export const activityPointSchema = z.object({
  hour: z.number(),
  value: z.number(),
})

export type ActivityPoint = z.infer<typeof activityPointSchema>

export const audienceSchema = z.object({
  genderDistribution: z.array(genderDistributionSchema),
  ageDistribution: z.array(ageDistributionSchema),
  topCountries: z.array(countryDistributionSchema),
  activityByHour: z.array(activityPointSchema),
})

export type Audience = z.infer<typeof audienceSchema>
