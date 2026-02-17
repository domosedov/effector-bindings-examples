import { Anchor, Container, List, ListItem, Stack, Text, Title } from '@mantine/core'

export default function TermsOfServicePage() {
  return (
    <Container size='md' py='xl'>
      <Stack gap='lg'>
        <Title order={1}>Terms of Service</Title>
        <Text c='dimmed'>Last updated: February 17, 2026</Text>

        <Stack gap='md'>
          <Title order={3}>1. Acceptance of Terms</Title>
          <Text>
            By accessing and using this application (&quot;Service&quot;), you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not use the
            Service.
          </Text>

          <Title order={3}>2. Description of Service</Title>
          <Text>
            The Service provides a dashboard for viewing and analyzing TikTok Business account
            statistics, including account overview, video analytics, and audience insights.
          </Text>

          <Title order={3}>3. User Accounts</Title>
          <Text>
            To use certain features of the Service, you must authenticate with your TikTok Business
            account via OAuth. You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your account.
          </Text>

          <Title order={3}>4. Acceptable Use</Title>
          <Text>You agree not to:</Text>
          <List>
            <ListItem>
              Use the Service for any unlawful purpose or in violation of any applicable laws
            </ListItem>
            <ListItem>
              Attempt to gain unauthorized access to the Service or its related systems
            </ListItem>
            <ListItem>
              Interfere with or disrupt the integrity or performance of the Service
            </ListItem>
            <ListItem>
              Reproduce, duplicate, or resell any part of the Service without express written
              permission
            </ListItem>
          </List>

          <Title order={3}>5. Data and Privacy</Title>
          <Text>
            Your use of the Service is also governed by our{' '}
            <Anchor href='/privacy'>Privacy Policy</Anchor>. By using the Service, you consent to
            the collection and use of information as described therein.
          </Text>

          <Title order={3}>6. Third-Party Services</Title>
          <Text>
            The Service integrates with TikTok&apos;s API and is subject to TikTok&apos;s own terms
            of service and policies. We are not responsible for the availability, accuracy, or
            content provided by TikTok&apos;s API.
          </Text>

          <Title order={3}>7. Disclaimer of Warranties</Title>
          <Text>
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, either express or implied. We do not guarantee that the Service
            will be uninterrupted, error-free, or secure.
          </Text>

          <Title order={3}>8. Limitation of Liability</Title>
          <Text>
            In no event shall we be liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or related to your use of the Service.
          </Text>

          <Title order={3}>9. Changes to Terms</Title>
          <Text>
            We reserve the right to modify these Terms at any time. Changes will be effective
            immediately upon posting. Your continued use of the Service after changes constitutes
            acceptance of the modified Terms.
          </Text>

          <Title order={3}>10. Contact</Title>
          <Text>
            If you have any questions about these Terms, please contact us at{' '}
            <Anchor href='mailto:support@example.com'>support@example.com</Anchor>.
          </Text>
        </Stack>
      </Stack>
    </Container>
  )
}
