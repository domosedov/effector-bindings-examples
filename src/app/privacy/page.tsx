import { Anchor, Container, List, ListItem, Stack, Text, Title } from '@mantine/core'

export default function PrivacyPolicyPage() {
  return (
    <Container size='md' py='xl'>
      <Stack gap='lg'>
        <Title order={1}>Privacy Policy</Title>
        <Text c='dimmed'>Last updated: February 17, 2026</Text>

        <Stack gap='md'>
          <Title order={3}>1. Introduction</Title>
          <Text>
            This Privacy Policy describes how we collect, use, and protect your information when you
            use our TikTok Business analytics dashboard (&quot;Service&quot;). By using the Service,
            you agree to the practices described in this policy.
          </Text>

          <Title order={3}>2. Information We Collect</Title>
          <Text>We collect the following types of information:</Text>
          <List>
            <ListItem>
              <Text fw={600} component='span'>
                TikTok Account Data:
              </Text>{' '}
              When you authenticate via TikTok OAuth, we access your public profile information,
              video statistics, and audience analytics as permitted by your granted scopes.
            </ListItem>
            <ListItem>
              <Text fw={600} component='span'>
                Authentication Tokens:
              </Text>{' '}
              We store encrypted OAuth access and refresh tokens in secure HttpOnly cookies to
              maintain your session.
            </ListItem>
            <ListItem>
              <Text fw={600} component='span'>
                Usage Data:
              </Text>{' '}
              We may collect anonymous usage data such as pages visited and features used to improve
              the Service.
            </ListItem>
          </List>

          <Title order={3}>3. How We Use Your Information</Title>
          <Text>We use collected information to:</Text>
          <List>
            <ListItem>Display your TikTok Business account statistics and analytics</ListItem>
            <ListItem>Maintain your authenticated session</ListItem>
            <ListItem>Improve and optimize the Service</ListItem>
          </List>

          <Title order={3}>4. Data Storage and Security</Title>
          <Text>
            Authentication tokens are encrypted using AES-256-GCM before being stored in HttpOnly
            cookies. We do not store your TikTok credentials. All communication with TikTok&apos;s
            API is conducted server-side to protect your tokens from client-side exposure.
          </Text>

          <Title order={3}>5. Data Sharing</Title>
          <Text>
            We do not sell, trade, or share your personal information with third parties. Your data
            is only used to provide the Service and is transmitted to TikTok&apos;s API solely for
            the purpose of retrieving your account analytics.
          </Text>

          <Title order={3}>6. Cookies</Title>
          <Text>
            The Service uses HttpOnly, secure cookies to store encrypted authentication tokens.
            These cookies are essential for the functioning of the Service and cannot be opted out
            of while using authenticated features.
          </Text>

          <Title order={3}>7. Your Rights</Title>
          <Text>You have the right to:</Text>
          <List>
            <ListItem>
              Revoke the application&apos;s access to your TikTok account at any time through
              TikTok&apos;s settings
            </ListItem>
            <ListItem>Request deletion of your session data by logging out</ListItem>
            <ListItem>Contact us with questions about your data</ListItem>
          </List>

          <Title order={3}>8. Changes to This Policy</Title>
          <Text>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated revision date. Continued use of the Service after changes constitutes
            acceptance of the updated policy.
          </Text>

          <Title order={3}>9. Contact</Title>
          <Text>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <Anchor href='mailto:support@example.com'>support@example.com</Anchor>.
          </Text>
        </Stack>
      </Stack>
    </Container>
  )
}
