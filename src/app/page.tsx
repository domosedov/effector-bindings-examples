import { ExamplesList } from '@/shared/ui/ExamplesList'
import { Container, Title } from '@mantine/core'

export default function Home() {
  return (
    <Container size='md' py='xl'>
      <Title order={1} mb='lg'>
        Examples List
      </Title>
      <ExamplesList />
    </Container>
  )
}
