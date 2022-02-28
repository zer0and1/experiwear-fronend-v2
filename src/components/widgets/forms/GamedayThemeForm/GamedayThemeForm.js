import { memo, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ALERT_FORM_MODES, DEFAULT_ALERT_PARAMS } from 'utils/constants';
import {
  FormButton,
  ExpImageField,
  AlertField,
  FanbandTerminal,
  ImageScreen,
} from 'components';
import { showErrorToast } from 'utils/helpers';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

const GamedayThemeForm = ({
  onSubmit,
  mode = ALERT_FORM_MODES.creating,
  defaultValues = null,
  updating = false,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState(
    defaultValues ? { url: defaultValues.imageUrl } : null
  );

  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS()))
      : DEFAULT_ALERT_PARAMS()
  );

  const resetParams = () => setAlertParmas(DEFAULT_ALERT_PARAMS());

  const handleParamsChange = ({ target: { name, value } }) =>
    setAlertParmas((params) => ({ ...params, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image?.file) {
      showErrorToast('Please choose gameday theme image!');
    }

    await onSubmit({
      title: 'Gameday',
      body: 'Gameday',
      file: image?.file,
      ...alertParams,
    });

    if (!updating) {
      resetForm();
    }
  };

  const resetForm = () => {
    setImage(null);
    resetParams();
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item container xs={9} spacing={2}>
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
                <ImageScreen imageUrl={image?.url} text="Gameday" />
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={3} container justifyContent="flex-end">
          <FanbandTerminal params={alertParams} disabledAnimation>
            <ImageScreen imageUrl={image?.url} text="Gameday" />
          </FanbandTerminal>
        </Grid>
      </Grid>
      <Box mt="auto">
        <FormButton onClick={handleSubmit}>
          {mode === ALERT_FORM_MODES.updating ? 'Save' : 'Send'}
        </FormButton>
      </Box>
    </div>
  );
};

export default memo(GamedayThemeForm);
