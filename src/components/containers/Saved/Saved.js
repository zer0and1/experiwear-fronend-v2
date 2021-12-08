import { memo, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { insertSavedAlert, modifySavedAlert } from 'redux/actions';
import {
  ExpSelect,
  NewsForm,
  PromoForm,
  QuickPollForm,
  ScoreForm,
  AlertContainer,
} from 'components';
import {
  ALERT_FORM_MODES,
  ALERT_PROTO_LABELS,
  ALERT_PROTO_TYPES,
} from 'utils/constants';
import { getEnglishDateWithTime } from 'utils/helpers';

const Saved = ({ defaultValues = null, updating = false }) => {
  const dispatch = useDispatch();
  const [type, setAlertType] = useState(
    defaultValues ? defaultValues.type : ALERT_PROTO_TYPES.news
  );

  const handleSubmit = async (data) => {
    if (updating) {
      await dispatch(modifySavedAlert(type, data));
    } else {
      await dispatch(insertSavedAlert(type, data));
    }
  };

  const AlertForm = useMemo(() => {
    switch (type) {
      case ALERT_PROTO_TYPES.news:
        return NewsForm;
      case ALERT_PROTO_TYPES.survey:
        return QuickPollForm;
      case ALERT_PROTO_TYPES.score:
        return ScoreForm;
      case ALERT_PROTO_TYPES.promo:
        return PromoForm;
      default:
        return NewsForm;
    }
  }, [type]);

  return (
    <AlertContainer maxWidth="md">
      <Card>
        <CardHeader
          title="Save Alert"
          subheader={getEnglishDateWithTime(new Date())}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {updating || (
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
              )}
            </Grid>
          </Grid>
          <AlertForm
            onSubmit={handleSubmit}
            mode={ALERT_FORM_MODES.saved}
            defaultValues={defaultValues}
            updating={updating}
          />
        </CardContent>
      </Card>
    </AlertContainer>
  );
};

export default memo(Saved);
