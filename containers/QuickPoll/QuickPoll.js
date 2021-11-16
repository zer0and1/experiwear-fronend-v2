import { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Box, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons';
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
import { DEFAULT_ALERT_PARAMS } from 'components/AlertField';

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
  anotherResponseButton: {
    backgroundColor: theme.palette.info.main,
    fontSize: 12,
    height: 35,
    marginBottom: 30,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
}));

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();
  const { news: { results } } = useSelector(state => state.notifications)
  const [images, setImages] = useState([]);
  const [responses, setResponses] = useState([{ text: '' }]);
  const [alertParams, setAlertParmas] = useState(DEFAULT_ALERT_PARAMS);

  const addResponse = () => {
    setResponses(prevState => [...prevState, { text: '' }]);
  };

  const resetParams = () => {
    setAlertParmas(DEFAULT_ALERT_PARAMS);
  };

  const handleParamsChange = useCallback(({ target: { name, value } }) => {
    setAlertParmas(params => ({ ...params, [name]: value }))
  }, []);

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });

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
                name='question'
                label='Quick Poll question'
                labelWidth={200}
                error={errors.response?.question}
                className={classes.input}
                control={control}
                defaultValue='Should that shot have counted?'
              />
              {responses.map((response, index) => (
                <Controller
                  as={<MagicTextField />}
                  name='response'
                  label={'Response #' + (index + 1)}
                  labelWidth={200}
                  error={errors.response?.message}
                  className={classes.input}
                  control={control}
                  defaultValue={response.text}
                  key={index}
                />
              ))}
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  className={classes.anotherResponseButton}
                  onClick={addResponse}
                >
                  Add another response
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={3} justify="flex-end">
              <FanbandTerminal params={alertParams}>
                {terminalScreen}
              </FanbandTerminal>
            </Grid>
            <Grid container>
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
