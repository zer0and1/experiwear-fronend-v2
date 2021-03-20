
import { memo } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as authAPI from 'services/api-auth'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import MagicTextField from 'components/UI/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import useLoading from 'utils/hooks/useLoading'
import { showErrorToast } from 'utils/helpers/toast'
import { EMAIL_VALID } from 'utils/constants/validations'
import LINKS from 'utils/constants/links'

const schema = yup.object().shape({
  email: EMAIL_VALID
});

const ForgotPassword = () => {
  const router = useRouter();
  const authClasses = authPageStyles();
  const { changeLoadingStatus } = useLoading();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      const params = {
        email: data.email,
      }

      if (false) {
        await authAPI.login(params);
      }
      router.push({
        pathname: LINKS.RESET_PASSWORD.HREF,
        query: { email: data.email }
      });
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        showErrorToast(message)
      }
    }
    changeLoadingStatus(false)
  };

  return (
    <AuthWrapper title='Reset Password'>
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<MagicTextField />}
          name='email'
          type='email'
          label='E-mail'
          error={errors.email?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <div>
          <ContainedButton
            color='red'
            className={authClasses.button}
            href={LINKS.SIGN_IN.HREF}
          >
            Cancel
          </ContainedButton>
          <ContainedButton
            type='submit'
            className={authClasses.button}
          >
            Submit
          </ContainedButton>
        </div>
      </form>
    </AuthWrapper>
  )
}

export default memo(ForgotPassword)