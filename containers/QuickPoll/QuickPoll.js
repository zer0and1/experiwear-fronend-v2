import { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, IconButton, Box, Card, CardContent, CardHeader, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as notificationsAPI from 'services/api-notifications'
import { getNotifications } from 'actions/getNotifications'
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast'
import { TITLE_VALID } from 'utils/constants/validations'
import { getEnglishDateWithTime } from 'utils/helpers/time'
import { AlertField, FanbandTerminal, FormButton, MagicImageField, MagicTextField } from 'components'
import { useLoading, usePathIndicator } from 'utils/hooks'
import { ALERT_TYPES, LINKS } from 'utils/constants'
import { DEFAULT_ALERT_PARAMS, LED_TYPES, VIB_INTENSITIES } from 'components/AlertField';

const schema = yup.object().shape({
  title: TITLE_VALID,
});

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    overflow: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: theme.spacing(4)
  },
  anotherResponseButton: {
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    height: 35,
    marginBottom: 30,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  triangle: {
    width: 0,
    height: 0,
    display: 'inline-block',
    borderTop: '3px solid transparent',
    borderLeft: '6px solid #ffdb3c',
    borderBottom: '3px solid transparent',
    marginRight: 3,
  },
}));

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();
  const { news: { results } } = useSelector(state => state.notifications)
  const [images, setImages] = useState([]);
  const [responses, setResponses] = useState(['']);
  const [alertParams, setAlertParmas] = useState(DEFAULT_ALERT_PARAMS);

  const addResponse = () => {
    setResponses(prevState => [...prevState, '']);
  };

  const resetParams = () => {
    setAlertParmas(DEFAULT_ALERT_PARAMS);
  };

  const handleParamsChange = useCallback(({ target: { name, value } }) => {
    setAlertParmas(params => ({ ...params, [name]: value }))
  }, []);

  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema)
  });
  const watchTitle = watch('title');

  const terminalScreen = useMemo(() => {
    if (!watchTitle || responses.every(d => !d)) {
      return null;
    }

    return (
      <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
        <Box color="#f80015" fontSize="16px" mb={2}>
          POLL
        </Box>
        <Box color="white" textAlign="left" fontSize="10px" mb={2.5}>
          {watchTitle}
        </Box>
        {responses.filter(r => r).map((res, idx) => (
          <Box key={idx} color={idx ? "white" : "#ffdb3c"} textAlign="center" fontSize="10px" mb="5px" pl={idx ? '6px' : 0}>
            {idx ? null : <div className={classes.triangle} />}
            <span style={{ textTransform: 'uppercase' }}>{res}</span>
          </Box>
        ))}
      </Box>
    );
  }, [watchTitle, responses, classes]);

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('responses', responses);
      formData.append('type', ALERT_TYPES.SURVEY.VALUE);
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
    
      if (images.length) {
        formData.append('file', images[0].file);
      }

      const { message } = await notificationsAPI.createNotification(formData);
      showSuccessToast(message)
      initData();
      dispatch(getNotifications(ALERT_TYPES.SURVEY.VALUE, results.length + 1))
    } catch (error) {
      if (error.response) {
        const { data: { message = [] } = {} } = error.response
        showErrorToast(message[0])
      }
    }
    changeLoadingStatus(false)
  };

  const initData = () => {
    setImages([]);
    setResponses(['']);
    resetParams();
    reset({ title: '', body: '' });
  };

  usePathIndicator({ path: LINKS.QUICKPOLL.HREF, label: LINKS.QUICKPOLL.TITLE });

  return (
    <Card className={classes.root}>
      <CardHeader title="Create Quick Poll Alert" subheader={getEnglishDateWithTime(new Date())} />
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
                name='title'
                label='Quick Poll question'
                labelWidth={200}
                error={errors.response?.title}
                className={classes.input}
                control={control}
                defaultValue='Should that shot have counted?'
              />
              {responses.map((res, idx) => (
                <Box key={idx} display="flex">
                  <MagicTextField
                    name={`response${idx}`}
                    label={`Response #${idx + 1}`}
                    labelWidth={200}
                    className={classes.input}
                    value={res}
                    onChange={e => setResponses(res => res.map((r, i) => i === idx ? e.target.value : r))}
                  />
                  {responses.length > 1 && (
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => setResponses(res => res.filter((r, i) => i !== idx))}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  className={classes.anotherResponseButton}
                  fullWidth={false}
                  onClick={addResponse}
                >
                  Add another response
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={3} justify="flex-end">
              <FanbandTerminal params={{ ...alertParams, ledType: LED_TYPES.stable, vibrationIntensity: VIB_INTENSITIES.no }}>
                {terminalScreen}
              </FanbandTerminal>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MagicImageField
                  label='Image'
                  images={images}
                  onChange={(imgList) => setImages(imgList)}
                  width={350}
                />
              </Grid>
              <Grid item xs={6}>
                <AlertField
                  label="Alert Parameters"
                  value={alertParams}
                  onChange={handleParamsChange}
                  onReset={resetParams}
                  width={350}
                  mt={3}
                  terminalScreen={terminalScreen}
                />
              </Grid>
            </Grid>
          </Grid>

          <FormButton type="submit">
            Send
          </FormButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(News);
