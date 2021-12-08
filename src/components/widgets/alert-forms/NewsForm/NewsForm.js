import { memo, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import _ from 'lodash';
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

const schema = object().shape({
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

const NewsForm = ({
  onSubmit,
  mode = ALERT_FORM_MODES.proto,
  defaultValues = null,
  updating = false,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState(
    defaultValues ? { url: defaultValues.imageUrl } : null
  );
  const [alertParams, setAlertParmas] = useState(
    _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS)) ||
      DEFAULT_ALERT_PARAMS
  );
  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      ..._.pick(defaultValues, ['title', 'body']),
    },
  });
  const bodyText = watch('body');

  const resetParams = () => setAlertParmas(DEFAULT_ALERT_PARAMS);
  const handleParamsChange = ({ target: { name, value } }) =>
    setAlertParmas((params) => ({ ...params, [name]: value }));

  const submitHandler = async (data) => {
    await onSubmit({
      ..._.pick(data, ['title', 'body']),
      ...alertParams,
      file: image?.file,
    });
    if (!updating) {
      resetForm();
    }
  };

  const resetForm = () => {
    setImage(null);
    reset();
    resetParams();
  };

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid container>
        <Grid container item xs={9} spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              control={control}
              name="title"
              label="News Alert Title"
              error={errors.title?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              control={control}
              multiline
              rows={5}
              name="body"
              label="News Body Text"
              error={errors.body?.message}
              fullWidth
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
        <Grid item xs={3} container justifyContent="flex-end">
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

export default memo(NewsForm);
