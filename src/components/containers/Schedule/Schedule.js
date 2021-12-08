import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  LeftContainer,
  FHCard,
  FHCardContent,
  FHCardHeader,
} from 'components';
import {
  ALERT_PROTO_TYPES,
  ALERT_PROTO_LABELS,
  ALERT_FORM_MODES,
} from 'utils/constants';
import moment from 'moment';

const Schedule = () => {
  const dispatch = useDispatch();
  const [type, setAlertType] = useState(ALERT_PROTO_TYPES.news);
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
    <LeftContainer maxWidth="md">
      <FHCard>
        <FHCardHeader
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
        <FHCardContent>
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
          <AlertForm
            onCreate={handleCreate}
            mode={ALERT_FORM_MODES.scheduled}
          />
          <DatetimePicker
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            value={datetime}
            onChange={setDatetime}
          />
        </FHCardContent>
      </FHCard>
    </LeftContainer>
  );
};

export default memo(Schedule);
