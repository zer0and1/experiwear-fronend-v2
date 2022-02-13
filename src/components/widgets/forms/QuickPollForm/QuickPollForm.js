import { memo, useCallback, useState } from 'react';
import { Button, IconButton, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import {
  TITLE_VALID,
  DEFAULT_ALERT_PARAMS,
  ALERT_FORM_MODES,
} from 'utils/constants';
import {
  AlertField,
  FanbandTerminal,
  FormButton,
  ExpImageField,
  ExpTextField,
  QuickPollScreen,
} from 'components';

const schema = yup.object().shape({
  title: TITLE_VALID,
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

const QuickPollForm = ({
  onSubmit,
  mode = ALERT_FORM_MODES.proto,
  defaultValues = null,
  updating = false,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState(
    defaultValues ? { url: defaultValues.imageUrl } : null
  );
  const [responses, setResponses] = useState(
    defaultValues
      ? defaultValues.surveyResponses.map((res) => res.response || '')
      : ['', '']
  );
  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS))
      : DEFAULT_ALERT_PARAMS
  );

  const addResponse = () => {
    setResponses((prevState) =>
      prevState.length < 5 ? [...prevState, ''] : prevState
    );
  };

  const resetParams = () => {
    setAlertParmas(DEFAULT_ALERT_PARAMS);
  };

  const handleParamsChange = useCallback(({ target: { name, value } }) => {
    setAlertParmas((params) => ({ ...params, [name]: value }));
  }, []);

  const { control, handleSubmit, errors, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      ..._.pick(defaultValues, ['title']),
    },
  });
  const watchTitle = watch('title');

  const submitHandler = async (data) => {
    await onSubmit({
      ..._.pick(data, ['title']),
      ...alertParams,
      file: image?.file,
      responses,
    });
    if (!updating) {
      resetForm();
    }
  };

  const resetForm = () => {
    setImage(null);
    setResponses(['']);
    resetParams();
    reset();
  };

  return (
    <form
      noValidate
      className={classes.root}
      onSubmit={handleSubmit(submitHandler)}
    >
      <Grid container>
        <Grid item xs={9} container spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={<ExpTextField />}
              name="title"
              label="Quick Poll question"
              error={errors.response?.title}
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {responses.map((res, idx) => (
              <Box key={idx} display="flex" mb={2}>
                <ExpTextField
                  name={`response${idx}`}
                  label={`Response #${idx + 1}`}
                  value={res}
                  fullWidth
                  onChange={(e) =>
                    setResponses((res) =>
                      res.map((r, i) => (i === idx ? e.target.value : r))
                    )
                  }
                />
                {responses.length > 2 && (
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() =>
                        setResponses((res) => res.filter((r, i) => i !== idx))
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.anotherResponseButton}
              fullWidth={false}
              onClick={addResponse}
              disabled={responses.length >= 5}
            >
              Add another response
            </Button>
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
              width="90%"
              mt={3}
              terminalScreen={
                <QuickPollScreen text={watchTitle} responses={responses} />
              }
            />
          </Grid>
        </Grid>
        <Grid container item xs={3} justifyContent="flex-end">
          <FanbandTerminal params={alertParams} disabledAnimation>
            <QuickPollScreen text={watchTitle} responses={responses} />
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

export default memo(QuickPollForm);
