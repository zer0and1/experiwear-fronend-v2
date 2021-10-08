import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as notificationsAPI from 'services/api-notifications'
import { getNotifications } from 'actions/getNotifications'
import MagicTextField from 'components/UI/MagicTextField'
import MagicImageField from 'components/UI/MagicImageField'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicCardHeader from 'parts/Card/MagicCardHeader'
import useLoading from 'utils/hooks/useLoading'
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast'
import { TITLE_VALID, STRING_VALID } from 'utils/constants/validations'
import { ALERT_TYPES } from 'utils/constants/alert-types'
import useFormStyles from 'styles/useFormStyles'
import { getEnglishDateWithTime } from 'utils/helpers/time'
import { isEmpty } from 'utils/helpers/utility'

const schema = yup.object().shape({
  title: TITLE_VALID,
  body: STRING_VALID
});

const News = () => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const { news: { results } } = useSelector(state => state.notifications)
  const [file, setFile] = useState(null);
  const [fileBuffer, setFileBuffer] = useState('');

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      let formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('type', ALERT_TYPES.NEWS.VALUE);
      if (!isEmpty(file)) {
        formData.append('file', file);
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
    setFile(null)
    setFileBuffer('');
    reset({
      title: '',
      body: ''
    })
  }

  return (
    <Card>
      <CardContent>
        <MagicCardHeader
          title='Create News Alert'
          subTitle={getEnglishDateWithTime(new Date())}
        />
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
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
            label='Select Image'
            labelWidth={200}
            file={file}
            setFile={setFile}
            fileBuffer={fileBuffer}
            setFileBuffer={setFileBuffer}
          />
          <div className={classes.buttonContainer}>
            <ContainedButton
              type='submit'
              className={classes.button}
            >
              Send
            </ContainedButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(News);
