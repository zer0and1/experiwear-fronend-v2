import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as authAPI from 'services/api-auth';
import { MagicTextField } from 'components';
import AuthWrapper, { authPageStyles } from '../AuthWrapper';
import useLoading from 'hooks/useLoading';
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast';
import { EMAIL_VALID } from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import MESSAGES from 'utils/constants/messages';
import { Button } from '@material-ui/core';

const schema = yup.object().shape({
  email: EMAIL_VALID,
});

const ForgotPassword = () => {
  const router = useRouter();
  const authClasses = authPageStyles();
  const { changeLoadingStatus } = useLoading();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data) => {
      changeLoadingStatus(true);
      try {
        const params = {
          email: data.email,
        };

        const { message } = await authAPI.forgotPassword(params);
        showSuccessToast(message);
        router.push({
          pathname: LINKS.RESET_PASSWORD.HREF,
          query: { email: data.email },
        });
      } catch (error) {
        showErrorToast(MESSAGES.EMAIL_NOT_FOUND);
      }
      changeLoadingStatus(false);
    },
    [router, changeLoadingStatus]
  );

  return (
    <AuthWrapper title="Reset Password">
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<MagicTextField />}
          name="email"
          type="email"
          label="E-mail"
          error={errors.email?.message}
          className={authClasses.input}
          control={control}
          defaultValue=""
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          className={authClasses.button}
        >
          Submit
        </Button>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          className={authClasses.button}
          href={LINKS.SIGN_IN.HREF}
        >
          Cancel
        </Button>
      </form>
    </AuthWrapper>
  );
};

export default memo(ForgotPassword);
