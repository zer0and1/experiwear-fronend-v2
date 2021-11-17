
import QuickPoll from 'containers/QuickPoll'
import { Layout } from 'components'
import { CurrentFanbandStats, SurveyAlertsSent } from 'sidebars'

export default function NewsPage() {
  return (
    <Layout
      sidebar={
        <>
          <CurrentFanbandStats />
          <SurveyAlertsSent />
        </>
      }
    >
      <QuickPoll />
    </Layout>
  )
}