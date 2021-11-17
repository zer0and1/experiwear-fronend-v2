import { makeStyles } from '@material-ui/core/styles';

const useFormStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: theme.spacing(4),
  },
}));

export default useFormStyles;
