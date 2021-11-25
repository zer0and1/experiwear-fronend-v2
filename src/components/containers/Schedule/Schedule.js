import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, Container } from '@material-ui/core';
import { createAlert } from 'redux/actions';
import {
  CalendarIcon,
  CardHeaderButton,
  DatetimePicker,
  MagicSelect,
  NewsForm,
  PromoForm,
  QuickPollForm,
  ScoreForm,
} from 'components';
import { ALERT_TYPES } from 'utils/constants';

const Schedule = () => {
  const dispatch = useDispatch();
  const [type, setAlertType] = useState(ALERT_TYPES.NEWS.VALUE);
  const [anchorEl, setAnchorEl] = useState(null);
  const [datetime, setDatetime] = useState(new Date());
  console.log(datetime);
  const handleCreate = useCallback(
    async (data) => {
      await dispatch(createAlert(type, data));
    },
    [type, dispatch]
  );

  const form = useMemo(() => {
    switch (type) {
      case ALERT_TYPES.NEWS.VALUE:
        return <NewsForm onCreate={handleCreate} />;
      case ALERT_TYPES.SURVEY.VALUE:
        return <QuickPollForm onCreate={handleCreate} />;
      case ALERT_TYPES.SCORE.VALUE:
        return <ScoreForm onCreate={handleCreate} />;
      case ALERT_TYPES.PROMO.VALUE:
        return <PromoForm onCreate={handleCreate} />;
      default:
        return <NewsForm onCreate={handleCreate} />;
    }
  }, [type, handleCreate]);

  const handleDatetimeClick = useCallback((e) => {
    setAnchorEl(e.target);
  }, []);

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader
          title="Create Scheduled Alert"
          subheader={
            <CardHeaderButton
              startIcon={<CalendarIcon />}
              onClick={handleDatetimeClick}
            >
              Set date and time
            </CardHeaderButton>
          }
        />
        <CardContent>
          <MagicSelect
            name="type"
            label="Alert type"
            items={Object.values(ALERT_TYPES)
              .filter((t) => t.VALUE !== ALERT_TYPES.SCHEDULE.VALUE)
              .map((type) => ({
                value: type.VALUE,
                label: type.LABEL,
              }))}
            value={type}
            onChange={(e) => setAlertType(e.target.value)}
          />
          {form}
          <DatetimePicker
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            value={datetime}
            onChange={setDatetime}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default memo(Schedule);
