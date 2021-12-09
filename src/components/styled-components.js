import {
  withStyles,
  Slider,
  Typography,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

export const HeaderText = withStyles((theme) => ({
  root: {
    fontFamily: theme.custom.fonts.SFProDisplayBlackItalic,
    fontSize: 14,
    color: '#000',
    letterSpacing: 0.42,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
  },
}))(Typography);

export const SubHeaderText = withStyles((theme) => ({
  root: {
    fontFamily: theme.custom.fonts.SFUITextRegular,
    fontSize: 12,
    color: '#d5d5dc',
    letterSpacing: 0,
    textTransform: 'capitalize',
    marginBottom: theme.spacing(1.5),
  },
}))(Typography);

export const PrettoSlider = withStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
  },
  track: {
    height: 6,
    borderRadius: 12,
  },
  rail: {
    height: 6,
    borderRadius: 12,
  },
  mark: {
    display: 'none',
  },
  thumb: {
    width: 20,
    height: 20,
    marginTop: -8,
    marginLeft: -9,
    border: '1px solid #d5d5dc',
    color: 'white',
    boxShadow: '0px 0px 0px 1px rgb(0 116 140 / 16%)',
  },
}))(Slider);

export const CardHeaderButton = withStyles((theme) => ({
  root: {
    fontSize: 12,
    height: 35,
  },
  contained: {
    backgroundColor: theme.palette.info.main,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  outlined: {
    borderColor: theme.palette.info.main,
    '&::.Mui-startIcon': {
      color: theme.palette.info.main,
    },
  },
}))(Button);

export const LeftContainer = withStyles({
  root: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
})(Container);

export const FHCard = withStyles({
  root: {
    borderRadius: 8,
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})(Card);

export const FHCardHeader = withStyles({
  root: {
    padding: '48px 25px 32px 25px',
  },
})(CardHeader);

export const FHCardContent = withStyles({
  root: {
    height: 0,
    overflow: 'auto',
    paddingTop: 0,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 0,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
})(CardContent);
