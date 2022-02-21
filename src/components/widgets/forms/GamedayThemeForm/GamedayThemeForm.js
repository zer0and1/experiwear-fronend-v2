import { memo, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ALERT_FORM_MODES, DEFAULT_ALERT_PARAMS } from 'utils/constants';
import { FormButton, ExpImageField } from 'components';
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
  mode = ALERT_FORM_MODES.create,
  defaultValues = null,
  updating = false,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState(
    defaultValues ? { url: defaultValues.imageUrl } : null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image?.file) {
      showErrorToast('Please choose gameday theme image!');
    }

    await onSubmit({
      title: 'Gameday',
      body: 'Gameday',
      file: image?.file,
      ...DEFAULT_ALERT_PARAMS(),
    });

    if (!updating) {
      resetForm();
    }
  };

  const resetForm = () => {
    setImage(null);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <ExpImageField
            label="Image"
            image={image}
            onChange={setImage}
            width="100%"
          />
        </Grid>
      </Grid>
      <Box mt="auto">
        <FormButton onClick={handleSubmit}>
          {mode === ALERT_FORM_MODES.update ? 'Save' : 'Send'}
        </FormButton>
      </Box>
    </div>
  );
};

export default memo(GamedayThemeForm);
