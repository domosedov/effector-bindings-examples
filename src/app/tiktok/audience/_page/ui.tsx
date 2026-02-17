'use client'

import type { PieLabelRenderProps, PieSectorShapeProps } from 'recharts'

import { Card, SegmentedControl, Stack, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useUnit } from 'effector-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { AudienceTab } from './model'

import { fetchAudience, tiktokKeys } from '../../_shared/api'
import { $activeTab, setActiveTab } from './model'

const PIE_COLORS = ['#339af0', '#e64980', '#20c997']

const PieSector = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={PIE_COLORS[props.index % PIE_COLORS.length]} />
)

function DemographicsChart() {
  const { data } = useQuery({
    queryKey: tiktokKeys.audience,
    queryFn: fetchAudience,
  })

  if (!data) return null

  return (
    <Stack gap='lg'>
      <Card withBorder p='lg'>
        <Title order={5} mb='md'>
          Gender Distribution
        </Title>
        <ResponsiveContainer width='100%' height={250}>
          <PieChart>
            <Pie
              data={data.genderDistribution}
              dataKey='value'
              nameKey='label'
              cx='50%'
              cy='50%'
              outerRadius={80}
              shape={PieSector}
              label={(props: PieLabelRenderProps) =>
                `${props.name ?? (props.payload as { label?: string })?.label}: ${props.value}%`
              }
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card withBorder p='lg'>
        <Title order={5} mb='md'>
          Age Distribution
        </Title>
        <ResponsiveContainer width='100%' height={250}>
          <BarChart data={data.ageDistribution}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='range' fontSize={12} />
            <YAxis fontSize={12} />

            <Tooltip formatter={(v) => [`${String(v ?? '')}%`, 'Share']} />
            <Bar dataKey='value' fill='var(--mantine-color-blue-6)' />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Stack>
  )
}

function GeoChart() {
  const { data } = useQuery({
    queryKey: tiktokKeys.audience,
    queryFn: fetchAudience,
  })

  if (!data) return null

  return (
    <Card withBorder p='lg'>
      <Title order={5} mb='md'>
        Top Countries
      </Title>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data.topCountries} layout='vertical'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' fontSize={12} />
          <YAxis type='category' dataKey='country' fontSize={12} width={40} />
          <Tooltip formatter={(v) => [`${String(v ?? '')}%`, 'Share']} />
          <Bar dataKey='value' fill='var(--mantine-color-teal-6)' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

function ActivityChart() {
  const { data } = useQuery({
    queryKey: tiktokKeys.audience,
    queryFn: fetchAudience,
  })

  if (!data) return null

  return (
    <Card withBorder p='lg'>
      <Title order={5} mb='md'>
        Activity by Hour
      </Title>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data.activityByHour}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='hour' tickFormatter={(h: number) => `${h}:00`} fontSize={12} />
          <YAxis fontSize={12} />

          <Tooltip labelFormatter={(h) => `${h}:00`} formatter={(v) => [v, 'Activity']} />
          <Area
            type='monotone'
            dataKey='value'
            stroke='var(--mantine-color-violet-6)'
            fill='var(--mantine-color-violet-1)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

const tabComponents: Record<AudienceTab, () => React.ReactNode> = {
  demographics: DemographicsChart,
  geography: GeoChart,
  activity: ActivityChart,
}

export function AudienceContent() {
  const [activeTab, onSetActiveTab] = useUnit([$activeTab, setActiveTab])

  const TabComponent = tabComponents[activeTab]

  return (
    <Stack gap='lg'>
      <SegmentedControl
        value={activeTab}
        onChange={(v) => onSetActiveTab(v as AudienceTab)}
        data={[
          { label: 'Demographics', value: 'demographics' },
          { label: 'Geography', value: 'geography' },
          { label: 'Activity', value: 'activity' },
        ]}
      />
      <TabComponent />
    </Stack>
  )
}
