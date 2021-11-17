import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as cannedAPI from 'services/api-canned';
import { getCannedNotifications } from 'actions/getCannedNotifications';
import MagicTextField from 'components/UI/MagicTextField';
import MagicImageField from 'components/UI/MagicImageField';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import MagicCardHeader from 'parts/Card/MagicCardHeader';
import useLoading from 'utils/hooks/useLoading';
import { showSuccessToast, showErrorToast } from 'utils/helpers/toast';
import { TITLE_VALID, STRING_VALID } from 'utils/constants/validations';
import useFormStyles from 'styles/useFormStyles';
import { isEmpty } from 'utils/helpers/utility';
import { getEnglishDateWithTime } from 'utils/helpers/time';

const schema = yup.object().shape({
  title: TITLE_VALID,
  body: STRING_VALID,
});

const CreateCannedAlert = ({ selectedItem, setSelectedItem, inputRef }) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  const {
    canned: { results },
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
      if (!isEmpty(file)) {
        formData.append('file', file);
      }
      let response;
      if (isEmpty(selectedItem)) {
        response = await cannedAPI.createCanned(formData);
        initData();
        dispatch(getCannedNotifications(results.length + 1));
      } else {
        response = await cannedAPI.editCanned(selectedItem.id, formData);
        setSelectedItem({});
        initData();
        dispatch(getCannedNotifications(results.length));
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
    });
  };

  return (
    <Card>
      <CardContent>
        <MagicCardHeader
          title="Create Saved Alert"
          subTitle={getEnglishDateWithTime(new Date())}
        />
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={<MagicTextField inputRef={inputRef} />}
            name="title"
            label="Alert Title"
            labelWidth={175}
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
            labelWidth={175}
            error={errors.body?.message}
            className={classes.input}
            control={control}
            defaultValue=""
          />
          <MagicImageField
            label="Select Image"
            labelWidth={175}
            file={file}
            setFile={setFile}
            fileBuffer={fileBuffer}
            setFileBuffer={setFileBuffer}
          />
          <div className={classes.buttonContainer}>
            <ContainedButton type="submit" className={classes.button}>
              Saved Alerts
            </ContainedButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(CreateCannedAlert);
