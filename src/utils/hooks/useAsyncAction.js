import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoading } from '.';

const useAsyncAction = (action, showLoading = false) => {
  const dispatch = useDispatch();
  const { changeLoadingStatus } = useLoading();

  useEffect(() => {
    if (showLoading) {
      (async () => {
        changeLoadingStatus(true);
        await dispatch(action);
        changeLoadingStatus(false);
      })();
    } else {
      dispatch(action);
    }
    // eslint-disable-next-line
  }, []);
};

export default useAsyncAction;
