import { memo, useCallback, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TITLE_VALID, STRING_VALID } from 'utils/constants/validations';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  MagicImageField,
  MagicTextField,
} from 'components';
import {
  DEFAULT_ALERT_PARAMS,
  LED_TYPES,
  VIB_INTENSITIES,
} from 'components/elements/AlertField';
import { ImageScreen } from 'components/elements/FanbandTerminal';

const schema = yup.object().shape({
  title: TITLE_VALID,
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

const PromoForm = ({ onCreate }) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);
  const [alertParams, setAlertParmas] = useState(DEFAULT_ALERT_PARAMS);

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
    await onCreate({ ...data, ...alertParams, image });
    resetForm();
  };

  const resetForm = () => {
    reset();
    setImage(null);
    resetParams();
  };
  return (
    <form noValidate className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={9}>
          <Controller
            as={<MagicTextField />}
            name="title"
            label="Promo Alert Title"
            labelWidth={200}
            error={errors.title?.message}
            className={classes.input}
            control={control}
            defaultValue=""
          />
          <Controller
            as={<MagicTextField />}
            multiline
            rows={5}
            name="body"
            label="Promo Body Text"
            labelWidth={200}
            error={errors.body?.message}
            className={classes.input}
            control={control}
            defaultValue=""
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
            <ImageScreen imageUrl={image?.url} text={bodyText} />
          </FanbandTerminal>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <MagicImageField
              label="Image"
              image={image}
              onChange={setImage}
              width="100%"
            />
          </Grid>
          <Grid item xs={5}>
            <AlertField
              label="Alert Parameters"
              value={alertParams}
              onChange={handleParamsChange}
              onReset={resetParams}
              width="100%"
              mt={3}
              terminalScreen={
                <ImageScreen imageUrl={image?.url} text={bodyText} />
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Box mt="auto">
        <FormButton type="submit">Send</FormButton>
      </Box>
    </form>
  );
};

export default memo(PromoForm);
