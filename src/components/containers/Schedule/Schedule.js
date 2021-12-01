import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { createAlert } from 'redux/actions';
import {
  CalendarIcon,
  CardHeaderButton,
  DatetimePicker,
  ExpSelect,
  NewsForm,
  PromoForm,
  QuickPollForm,
  ScoreForm,
  AlertContainer,
} from 'components';
import { ALERT_TYPES } from 'utils/constants';
import moment from 'moment';

const Schedule = () => {
  const dispatch = useDispatch();
  const [type, setAlertType] = useState(ALERT_TYPES.NEWS.VALUE);
  const [anchorEl, setAnchorEl] = useState(null);
  const [datetime, setDatetime] = useState();

  const handleCreate = useCallback(
    async (data) => {
      if (datetime) {
        await dispatch(createAlert(type, data, datetime));
      }
    },
    [type, datetime, dispatch]
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

  const handleDatetimeClick = useCallback(
    (e) => {
      if (!datetime) {
        setDatetime(new Date());
      }
      setAnchorEl(e.target);
    },
    [datetime]
  );

  return (
    <AlertContainer maxWidth="md">
      <Card>
        <CardHeader
          title="Create Scheduled Alert"
          subheader={
            <CardHeaderButton
              startIcon={<CalendarIcon />}
              onClick={handleDatetimeClick}
              variant={datetime ? 'outlined' : 'contained'}
            >
              {datetime
                ? moment(datetime).format('MMM D @ hh:mm A')
                : 'Set date and time'}
            </CardHeaderButton>
          }
        />
        <CardContent>
          <ExpSelect
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
    </AlertContainer>
  );
};

export default memo(Schedule);
