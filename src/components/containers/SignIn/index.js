import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { signIn } from 'redux/actions';
import { LinkButton, AuthWrapper } from 'components';
import { LINKS, EMAIL_VALID, PASSWORD_VALID } from 'utils/constants';
import {
  InputAdornment,
  Box,
  Button,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  EmailOutlined,
  LockOpenOutlined,
  LockOutlined,
} from '@material-ui/icons';
import { ExpTextField, ExpCheckbox } from 'components';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  email: EMAIL_VALID,
  password: PASSWORD_VALID,
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2.5),
    borderRadius: theme.spacing(3),
    height: 50,
  },
  forgotLink: {
    color: '#d8d8d8',
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'none',
  },
}));

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data) => {
      await dispatch(signIn(data));
      router.push(router.query.redirect || LINKS.home.path);
      window.location.reload();
    },
    [router, dispatch]
  );

  const resetHandler = useCallback(() => {
    reset({
      email: '',
      password: '',
    });
  }, [reset]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthWrapper title="Log In to Your Account">
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<ExpTextField />}
          name="email"
          type="email"
          label="E-mail"
          error={errors.email?.message}
          className={classes.input}
          control={control}
          fullWidth
          defaultValue=""
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlined color="disabled" />
              </InputAdornment>
            ),
          }}
        />
        <Controller
          as={<ExpTextField />}
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          error={errors.password?.message}
          className={classes.input}
          control={control}
          fullWidth
          defaultValue=""
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{ margin: -12 }}
                >
                  {showPassword ? (
                    <LockOpenOutlined color="disabled" />
                  ) : (
                    <LockOutlined color="disabled" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mb={3}
        >
          <ExpCheckbox name="checkedB" color="primary" label="Remember Me" />
          <LinkButton
            href={LINKS.forgotPassword.path}
            className={classes.forgotLink}
          >
            Forgot Password
          </LinkButton>
        </Box>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          className={classes.button}
        >
          Log In
        </Button>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          className={classes.button}
          onClick={resetHandler}
        >
          Reset
        </Button>
      </form>
    </AuthWrapper>
  );
};

export default memo(SignIn);
