import Layout from 'Layout'
import { Card, CardContent } from '@material-ui/core'
import { Calendar } from 'components'

export default function HomePage() {
  return (
    <Layout>
      <Card>
        <CardContent>
          <Calendar />
        </CardContent>
      </Card>
    </Layout>
  )
};
