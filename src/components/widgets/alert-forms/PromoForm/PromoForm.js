import { memo, useCallback, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  TITLE_VALID,
  STRING_VALID,
  DEFAULT_ALERT_PARAMS,
  ALERT_FORM_MODES,
} from 'utils/constants';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  ExpImageField,
  ExpTextField,
} from 'components';
import { ImageScreen } from 'components';

const schema = yup.object().shape({
  title: TITLE_VALID,
  body: STRING_VALID,
});

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});

const PromoForm = ({ onCreate, mode = ALERT_FORM_MODES.proto }) => {
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
        <Grid item container xs={9} spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="title"
              label="Promo Alert Title"
              error={errors.title?.message}
              control={control}
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              multiline
              rows={5}
              name="body"
              label="Promo Body Text"
              error={errors.body?.message}
              control={control}
              fullWidth
              defaultValue=""
            />
          </Grid>
          <Grid item xs={6}>
            <ExpImageField
              label="Image"
              image={image}
              onChange={setImage}
              width="100%"
            />
          </Grid>
          <Grid item xs={6}>
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
        <Grid container item xs={3} justifyContent="flex-end">
          <FanbandTerminal params={alertParams} disabledAnimation>
            <ImageScreen imageUrl={image?.url} text={bodyText} />
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

export default memo(PromoForm);
