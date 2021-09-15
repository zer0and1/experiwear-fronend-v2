import Layout from 'Layout'
import { Card, CardContent } from '@material-ui/core'
import { Calendar } from 'components'
import Home from 'containers/Home'

export default function HomePage() {
  return (
    <Layout>
      <Card>
        <CardContent>
          <Calendar />
        </CardContent>
      </Card>
      <Home />
    </Layout>
  )
};
