import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as notificationsAPI from 'services/api-notifications';
import { getNotifications } from 'redux/actions';
import {
  showErrorToast,
  showSuccessToast,
  getEnglishDateWithTime,
} from 'utils/helpers';
import { STRING_VALID } from 'utils/constants/validations';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  MagicTextField,
  TeamLogo,
} from 'components';
import { useLoading } from 'hooks';
import { ALERT_TYPES } from 'utils/constants';
import {
  DEFAULT_ALERT_PARAMS,
  LED_TYPES,
  VIB_INTENSITIES,
} from 'components/elements/AlertField';

const schema = yup.object().shape({
  body: STRING_VALID,
});

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  input: {
    marginBottom: theme.spacing(4),
  },
}));

const Score = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const { results } = useSelector((state) => state.notifications.news);
  const { selectedGame: game } = useSelector((state) => state.games);
  const [alertParams, setAlertParmas] = useState(DEFAULT_ALERT_PARAMS);
  const [hawksTeam, opposingTeam] = useMemo(() => {
    if (!game) {
      return [null, null];
    }
    const homeTeam = { ...game.homeTeam, score: game.homeTeamScore };
    const visitorTeam = { ...game.visitorTeam, score: game.visitorTeamScore };
    return game.homeTeam.abbreviation === 'ATL'
      ? [homeTeam, visitorTeam]
      : [visitorTeam, homeTeam];
  }, [game]);

  const alertTitle = useMemo(() => {
    if (hawksTeam && opposingTeam) {
      return `${hawksTeam.score} - ${opposingTeam.score}`;
    }
    return '0 - 0';
  }, [hawksTeam, opposingTeam]);

  const resetParams = () => {
    setAlertParmas(DEFAULT_ALERT_PARAMS);
  };

  const handleParamsChange = useCallback(
    ({ target: { name, value } }) =>
      setAlertParmas((params) => ({ ...params, [name]: value })),
    []
  );

  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const watchAllFields = watch();
  const terminalScreen = useMemo(() => {
    const { title, body } = watchAllFields;

    if (!title || !body || !hawksTeam || !opposingTeam) {
      return null;
    }

    return (
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        py={2}
      >
        <Box
          display="flex"
          overflow="hidden"
          alignItems="center"
          width="150%"
          height="36px"
        >
          <TeamLogo size={80} team={hawksTeam.abbreviation} />
          <TeamLogo size={80} team={opposingTeam.abbreviation} />
        </Box>
        <Box
          textAlign="center"
          fontSize="18px"
          color="#ffdb3c"
          display="flex"
          justifyContent="space-around"
          width="100%"
        >
          <span>{hawksTeam.score}</span>
          <span>-</span>
          <span>{opposingTeam.score}</span>
        </Box>
        <Box color="white" textAlign="center" fontSize="12px">
          <span style={{ textTransform: 'uppercase' }}>{body}</span>
        </Box>
      </Box>
    );
  }, [watchAllFields, hawksTeam, opposingTeam]);

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('type', ALERT_TYPES.SCORE.VALUE);
      formData.append('ledType', alertParams.ledType);
      formData.append('topColor1', alertParams.topColor1);
      formData.append('topColor2', alertParams.topColor2);
      formData.append('topColor3', alertParams.topColor3);
      formData.append('bottomColor1', alertParams.bottomColor1);
      formData.append('bottomColor2', alertParams.bottomColor2);
      formData.append('bottomColor3', alertParams.bottomColor3);
      formData.append('vibrationType', alertParams.vibrationType);
      formData.append('vibrationIntensity', alertParams.vibrationIntensity);
      formData.append('duration', alertParams.duration);

      const { message } = await notificationsAPI.createNotification(formData);
      showSuccessToast(message);
      initData();
      dispatch(getNotifications(ALERT_TYPES.SCORE.VALUE, results.length + 1));
    } catch (error) {
      if (error.response) {
        const { data: { message = [] } = {} } = error.response;
        showErrorToast(message[0]);
      }
    }
    changeLoadingStatus(false);
  };

  const initData = () => {
    reset({ body: '' });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Create Score Alert"
        subheader={getEnglishDateWithTime(new Date())}
      />
      <CardContent>
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid item xs={9}>
              <Controller
                as={<MagicTextField />}
                name="title"
                label="Score alert Title"
                labelWidth={200}
                error={errors.title?.message}
                className={classes.input}
                control={control}
                defaultValue={alertTitle}
                inputProps={{ readOnly: true }}
              />
              <Controller
                as={<MagicTextField />}
                name="body"
                label="Score description"
                labelWidth={200}
                error={errors.body?.message}
                className={classes.input}
                control={control}
                defaultValue=""
              />
              <AlertField
                label="Alert Parameters"
                value={alertParams}
                onChange={handleParamsChange}
                onReset={resetParams}
                width={350}
                terminalScreen={terminalScreen}
              />
            </Grid>
            <Grid container item xs={3} justifyContent="flex-end">
              <FanbandTerminal
                params={{
                  ...alertParams,
                  ledType: LED_TYPES.stable,
                  vibrationIntensity: VIB_INTENSITIES.no,
                }}
              >
                {terminalScreen}
              </FanbandTerminal>
            </Grid>
          </Grid>
          <Box mt="auto">
            <FormButton type="submit">Send</FormButton>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(Score);
