import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Layout } from 'components';
import { CurrentFanbandStats } from 'sidebars';

export default function NewsPage() {
  return (
    <Layout sidebar={<CurrentFanbandStats />}>
      <Card className={classes.root}>
        <CardHeader title="Create News Alert" />
        <CardContent>
        </CardContent>
      </Card>
    </Layout>
  )
}