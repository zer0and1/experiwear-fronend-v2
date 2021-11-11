import { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as notificationsAPI from 'services/api-notifications'
import { getNotifications } from 'actions/getNotifications'
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast'
import { TITLE_VALID, STRING_VALID } from 'utils/constants/validations'
import { getEnglishDateWithTime } from 'utils/helpers/time'
import { AlertField, FanbandTerminal, FormButton, MagicImageField, MagicTextField } from 'components'
import { useLoading, usePathIndicator } from 'utils/hooks'
import { ALERT_TYPES, LINKS } from 'utils/constants'

const schema = yup.object().shape({
  title: TITLE_VALID,
  body: STRING_VALID
});

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: theme.spacing(4)
  },
}));

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const { news: { results } } = useSelector(state => state.notifications)
  const [images, setImages] = useState([]);

  const defaultParams = {
    topLight1: '#825dde',
    topLight2: '#9ea3ba',
    topLight3: '#01a1c3',
    bottomLight1: '#ffdb3c',
    bottomLight2: '#01a1c3',
    bottomLight3: '#825dde',
    decoration: 'flashing',
    intensity: 'medium',
    style: '0.3',
    duration: 9,
  };

  const [alertParams, setAlertParmas] = useState({
    topLight1: '#825dde',
    topLight2: '#9ea3ba',
    topLight3: '#01a1c3',
    bottomLight1: '#ffdb3c',
    bottomLight2: '#01a1c3',
    bottomLight3: '#825dde',
    decoration: 'flashing',
    intensity: 'medium',
    style: '0.3',
    duration: 9,
  });

  const resetParams = () => {
    setAlertParmas(defaultParams);
  }

  const handleParamsChange = useCallback(({ target: { name, value } }) => setAlertParmas(params => ({ ...params, [name]: value })), []);

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const terminalMounted = useMemo(() => {
    const { title, body } = control.getValues();
    return title && body && images.length;
  }, [control, images]);

  const terminalScreen = useMemo(() => {
    const { title, body } = control.getValues();
    
    if (!title || !body || !images.length) {
      return null;
    }

    return (
      <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
        <Box>
          <img src={images[0].data_url} />
        </Box>
        <Typography>
          {body}
        </Typography>
      </Box>
    )
  }, [control, images]);

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      let formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('type', ALERT_TYPES.NEWS.VALUE);
      if (images.length) {
        formData.append('file', images[0].file);
      }
      const { message } = await notificationsAPI.createNotification(formData);
      showSuccessToast(message)
      initData();
      dispatch(getNotifications(ALERT_TYPES.NEWS.VALUE, results.length + 1))
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
    reset({
      title: '',
      body: ''
    });
  };

  usePathIndicator({ path: LINKS.NEWS.HREF, label: LINKS.NEWS.TITLE });

  return (
    <Card className={classes.root}>
      <CardHeader title="Create News Alert" subheader={getEnglishDateWithTime(new Date())} />
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
                label='News Alert Title'
                labelWidth={200}
                error={errors.title?.message}
                className={classes.input}
                control={control}
                defaultValue=''
              />
              <Controller
                as={<MagicTextField />}
                multiline
                rows={5}
                name='body'
                label='News Body Text'
                labelWidth={200}
                error={errors.body?.message}
                className={classes.input}
                control={control}
                defaultValue=''
              />
              <MagicImageField
                label='Image'
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
                mounted={terminalMounted}
                terminalScreen={terminalScreen}
              />
            </Grid>
            <Grid container item xs={3} justify="flex-end">
              <FanbandTerminal palette={alertParams} mounted={terminalMounted}>
                {terminalScreen}
              </FanbandTerminal>
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
