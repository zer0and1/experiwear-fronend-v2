import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { isEmpty } from 'utils/helpers';
import { STRING_VALID } from 'utils/constants/validations';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  MagicTextField,
} from 'components';
import {
  DEFAULT_ALERT_PARAMS,
  LED_TYPES,
  VIB_INTENSITIES,
} from 'components/elements/AlertField';
import { ScoreScreen } from 'components/elements/FanbandTerminal';

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

const ScoreForm = ({ onCreate }) => {
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

  const onSubmit = async (data) => {
    await onCreate({ ...data, ...alertParams });
    resetForm();
  };

  const resetForm = () => {
    reset();
    resetParams();
  };

  return (
    <form noValidate className={classes.root} onSubmit={handleSubmit(onSubmit)}>
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
            terminalScreen={<ScoreScreen game={game} text={bodyText} />}
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
            <ScoreScreen game={game} text={bodyText} />
          </FanbandTerminal>
        </Grid>
      </Grid>
      <Box mt="auto">
        <FormButton type="submit">Send</FormButton>
      </Box>
    </form>
  );
};

export default memo(ScoreForm);