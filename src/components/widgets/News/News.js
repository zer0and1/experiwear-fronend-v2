import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';

import { createAlert } from 'redux/actions';
import { TITLE_VALID, STRING_VALID } from 'utils/constants/validations';
import { getEnglishDateWithTime } from 'utils/helpers';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  MagicImageField,
  MagicTextField,
} from 'components';
import { ALERT_TYPES } from 'utils/constants';
import {
  DEFAULT_ALERT_PARAMS,
  LED_TYPES,
  VIB_INTENSITIES,
} from 'components/elements/AlertField';
import { ImageScreen } from 'components/elements/FanbandTerminal';

const schema = object().shape({
  title: TITLE_VALID,
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

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [alertParams, setAlertParmas] = useState(DEFAULT_ALERT_PARAMS);
  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const bodyText = watch('body');

  const resetParams = () => setAlertParmas(DEFAULT_ALERT_PARAMS);
  const handleParamsChange = ({ target: { name, value } }) =>
    setAlertParmas((params) => ({ ...params, [name]: value }));

  const onSubmit = async (data) => {
    await dispatch(
      createAlert(ALERT_TYPES.NEWS.VALUE, data, alertParams, images[0])
    );
    setImages([]);
    reset();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Create News Alert"
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
                label="News Alert Title"
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
                label="News Body Text"
                labelWidth={200}
                error={errors.body?.message}
                className={classes.input}
                control={control}
                defaultValue=""
              />
              <MagicImageField
                label="Image"
                images={images}
                onChange={(imgList) => setImages(imgList)}
                width={350}
              />
              <AlertField
                label="Alert Parameters"
                value={alertParams}
                onChange={handleParamsChange}
                onReset={resetParams}
                width={350}
                terminalScreen={
                  <ImageScreen imageUrl={images[0]?.data_url} text={bodyText} />
                }
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
                <ImageScreen imageUrl={images[0]?.data_url} text={bodyText} />
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

export default memo(News);
