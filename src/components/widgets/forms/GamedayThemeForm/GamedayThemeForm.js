import { memo, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ALERT_FORM_MODES, DEFAULT_ALERT_PARAMS } from 'utils/constants';
import {
  FormButton,
  ExpImageField,
  AlertField,
  FanbandTerminal,
  FullScreen,
} from 'components';
import { isEmpty, showErrorToast } from 'utils/helpers';
import ImageList from 'components/elements/ImageList';
import { Title } from 'components/elements';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncAction } from 'hooks';
import { getGamedayPresets, uploadGamedayPresets } from 'redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imageListLabel: {
    fontSize: 14,
    marginBottom: 52,
  },
  uploadButton: {
    width: 252,
    marginBottom: 67,
  },
  imageSelectLabel: {
    fontSize: 14,
    marginBottom: 33,
  },
  emptyPresetLabel: {
    fontSize: 20,
    fontFamily: theme.custom.fonts.SFUITextBoldItalic,
    color: '#b0b0b0',
  },
}));

const GamedayThemeForm = ({
  onSubmit,
  mode = ALERT_FORM_MODES.creating,
  defaultValues = null,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [image, setImage] = useState(
    defaultValues ? { url: defaultValues.imageUrl } : null
  );
  const [imageList, setImageList] = useState([]);
  const { gamedayPresets } = useSelector((state) => state.notifications);

  console.log(gamedayPresets);
  useAsyncAction(getGamedayPresets(), !gamedayPresets.length);

  const [alertParams, setAlertParmas] = useState(
    defaultValues
      ? _.pick(defaultValues, Object.keys(DEFAULT_ALERT_PARAMS()))
      : DEFAULT_ALERT_PARAMS()
  );

  const resetParams = (params) => {
    setAlertParmas(isEmpty(params) ? DEFAULT_ALERT_PARAMS() : params);
  };

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

    if (mode === ALERT_FORM_MODES.creating) {
      resetForm();
    }
  };

  const resetForm = () => {
    setImage(null);
    resetParams();
  };

  const handleUploadPresets = () => {
    dispatch(uploadGamedayPresets(imageList.map((img) => img.file)));
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.imageListLabel}>
              Select Gameday Images for Preloading
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ImageList images={imageList} onChange={setImageList} mb="33px" />
          </Grid>
          <Grid item xs={12}>
            <FormButton
              className={classes.uploadButton}
              disabled={!imageList.length}
              onClick={handleUploadPresets}
            >
              Upload
            </FormButton>
          </Grid>
        </Grid>
        <Grid item container lg={9} xs={12} spacing={2}>
          <Grid item xs={12}>
            <Title mb={1}>CREATE GAMEDAY THEME ALERT</Title>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.imageListLabel}>
              Select Gameday Images for Preloading
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {gamedayPresets.length ? (
              gamedayPresets.map((img) => <img src={img} key={img} />)
            ) : (
              <Typography className={classes.emptyPresetLabel}>
                Please upload Gameday Images above first
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <ExpImageField
              label="Image"
              image={image}
              onChange={setImage}
              width="100%"
            />
          </Grid>
          <Grid item xs={12}>
            <AlertField
              label="Alert Parameters"
              value={alertParams}
              onChange={handleParamsChange}
              onReset={resetParams}
              width="252px"
              mt={3}
              mb="96px"
              terminalScreen={<FullScreen imageUrl={image?.url} />}
            />
          </Grid>
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <FanbandTerminal params={alertParams} disabledAnimation>
            <FullScreen imageUrl={image?.url} />
          </FanbandTerminal>
        </Grid>
        <Grid item xs={12}>
          <FormButton onClick={handleSubmit}>
            {mode === ALERT_FORM_MODES.updating ? 'Save' : 'Send'}
          </FormButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(GamedayThemeForm);
