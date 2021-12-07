import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { createAlert } from 'redux/actions';
import {
  ExpSelect,
  NewsForm,
  PromoForm,
  QuickPollForm,
  ScoreForm,
  AlertContainer,
} from 'components';
import { ALERT_PROTO_LABELS, ALERT_PROTO_TYPES } from 'utils/constants';
import { getEnglishDateWithTime } from 'utils/helpers';

const Saved = () => {
  const dispatch = useDispatch();
  const [type, setAlertType] = useState(ALERT_PROTO_TYPES.news);

  const handleCreate = useCallback(
    async (data) => {
      await dispatch(createAlert(type, data));
    },
    [type, dispatch]
  );

  const form = useMemo(() => {
    switch (type) {
      case ALERT_PROTO_TYPES.news:
        return <NewsForm onCreate={handleCreate} />;
      case ALERT_PROTO_TYPES.survey:
        return <QuickPollForm onCreate={handleCreate} />;
      case ALERT_PROTO_TYPES.score:
        return <ScoreForm onCreate={handleCreate} />;
      case ALERT_PROTO_TYPES.promo:
        return <PromoForm onCreate={handleCreate} />;
      default:
        return <NewsForm onCreate={handleCreate} />;
    }
  }, [type, handleCreate]);

  return (
    <AlertContainer maxWidth="md">
      <Card>
        <CardHeader
          title="Create Scheduled Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <ExpSelect
                name="type"
                label="Alert type"
                items={Object.values(ALERT_PROTO_TYPES).map((type) => ({
                  value: type,
                  label: ALERT_PROTO_LABELS[type],
                }))}
                value={type}
                onChange={(e) => setAlertType(e.target.value)}
              />
            </Grid>
          </Grid>
          {form}
        </CardContent>
      </Card>
    </AlertContainer>
  );
};

export default memo(Saved);
