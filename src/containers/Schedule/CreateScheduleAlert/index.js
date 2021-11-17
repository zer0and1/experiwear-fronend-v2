import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as scheduleAPI from 'services/api-schedule';
import { getScheduledNotifications } from 'actions/getScheduledNotifications';
import MagicSelect from 'components/UI/MagicSelect';
import MagicTextField from 'components/UI/MagicTextField';
import MagicImageField from 'components/UI/MagicImageField';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import MagicCardHeader from 'parts/Card/MagicCardHeader';
import useLoading from 'utils/hooks/useLoading';
import { showSuccessToast, showErrorToast } from 'utils/helpers/toast';
import { isEmpty } from 'utils/helpers/utility';
import { getLocalDate } from 'utils/helpers/time';
import { TITLE_VALID, STRING_VALID } from 'utils/constants/validations';
import { ALERT_TYPES_ARRAY } from 'utils/constants/alert-types';
import useFormStyles from 'styles/useFormStyles';
import { getEnglishDateWithTime } from 'utils/helpers/time';

const schema = yup.object().shape({
  type: STRING_VALID,
  title: TITLE_VALID,
  body: STRING_VALID,
  time: STRING_VALID,
});

const CreateScheduleAlert = ({ selectedItem, setSelectedItem }) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const {
    scheduled: { results },
  } = useSelector((state) => state.notifications);
  const [file, setFile] = useState(null);
  const [fileBuffer, setFileBuffer] = useState('');

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true);
    try {
      let formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('type', data.type);
      formData.append('scheduledTime', new Date(data.time));
      if (!isEmpty(file)) {
        formData.append('file', file);
      }
      let response;
      if (isEmpty(selectedItem)) {
        response = await scheduleAPI.createScheduledNotification(formData);
        initData();
        dispatch(getScheduledNotifications(results.length + 1));
      } else {
        response = await scheduleAPI.editScheduledNotification(
          selectedItem.id,
          formData
        );
        setSelectedItem({});
        initData();
        dispatch(getScheduledNotifications(results.length));
      }

      const { message } = response;
      showSuccessToast(message);
    } catch (error) {
      if (error.response) {
        const { data: { message = [] } = {} } = error.response;
        showErrorToast(message[0]);
      }
    }
    changeLoadingStatus(false);
  };

  useEffect(() => {
    if (!isEmpty(selectedItem)) {
      setFileBuffer(selectedItem.imageUrl);
      reset({
        title: selectedItem.title,
        body: selectedItem.body,
        type: selectedItem.type,
        time: getLocalDate(selectedItem.scheduledTime),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const initData = () => {
    setFile(null);
    setFileBuffer('');
    reset({
      title: '',
      body: '',
      type: '',
      time: '',
    });
  };

  return (
    <Card>
      <CardContent>
        <MagicCardHeader
          title="Create Scheduled Alert"
          subTitle={getEnglishDateWithTime(new Date())}
        />
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={<MagicSelect />}
            name="type"
            label="Alert Type"
            labelWidth={200}
            items={ALERT_TYPES_ARRAY}
            error={errors.type?.message}
            className={classes.input}
            control={control}
            defaultValue={ALERT_TYPES_ARRAY[0].VALUE}
          />
          <Controller
            as={<MagicTextField />}
            name="title"
            label="Alert Title"
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
            label="Alert Body Text"
            labelWidth={200}
            error={errors.body?.message}
            className={classes.input}
            control={control}
            defaultValue=""
          />
          <MagicImageField
            label="Select Image"
            labelWidth={200}
            file={file}
            setFile={setFile}
            fileBuffer={fileBuffer}
            setFileBuffer={setFileBuffer}
          />
          <Controller
            as={<MagicTextField />}
            name="time"
            label="Send Schedule"
            type="datetime-local"
            labelWidth={200}
            error={errors.time?.message}
            className={classes.input}
            control={control}
            defaultValue=""
          />
          <div className={classes.buttonContainer}>
            <ContainedButton type="submit" className={classes.button}>
              Set
            </ContainedButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(CreateScheduleAlert);
