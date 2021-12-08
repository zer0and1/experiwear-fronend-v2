import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { isEmpty } from 'utils/helpers';
import {
  STRING_VALID,
  DEFAULT_ALERT_PARAMS,
  ALERT_FORM_MODES,
} from 'utils/constants';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  ExpTextField,
} from 'components';
import { ScoreScreen } from 'components';

const schema = yup.object().shape({
  body: STRING_VALID,
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  input: {
    marginBottom: theme.spacing(4),
  },
}));

const ScoreForm = ({ onSubmit, mode = ALERT_FORM_MODES.proto }) => {
  const classes = useStyles();
  const { selectedGame: game } = useSelector((state) => state.games);
  const [alertParams, setAlertParmas] = useState(DEFAULT_ALERT_PARAMS);

  const alertTitle = useMemo(() => {
    if (isEmpty(game)) {
      return '0 - 0';
    }
    if (game.homeTeam.abbreviation === 'ATL') {
      return `${game.homeTeamScore} - ${game.visitorTeamScore}`;
    }
    return `${game.visitorTeamScore} - ${game.homeTeamScore}`;
  }, [game]);

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
  const bodyText = watch('body');

  const submitHandler = async (data) => {
    await onSubmit({ ...data, ...alertParams });
    resetForm();
  };

  const resetForm = () => {
    reset();
    resetParams();
  };

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid container>
        <Grid item xs={9} container spacing={4}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="title"
              label="Score alert Title"
              error={errors.title?.message}
              className={classes.input}
              control={control}
              defaultValue={alertTitle}
              fullWidth
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="body"
              label="Score description"
              error={errors.body?.message}
              className={classes.input}
              control={control}
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <AlertField
              label="Alert Parameters"
              value={alertParams}
              onChange={handleParamsChange}
              onReset={resetParams}
              width={350}
              terminalScreen={<ScoreScreen game={game} text={bodyText} />}
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} justifyContent="flex-end">
          <FanbandTerminal params={alertParams} disabledAnimation>
            <ScoreScreen game={game} text={bodyText} />
          </FanbandTerminal>
        </Grid>
      </Grid>
      <Box mt="auto">
        <FormButton type="submit">
          {mode === ALERT_FORM_MODES.saved ? 'Save' : 'Send'}
        </FormButton>
      </Box>
    </form>
  );
};

export default memo(ScoreForm);
