import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from 'redux/actions';

const useAsyncAction = (action, showLoading = false) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (showLoading) {
      (async () => {
        dispatch(setLoadingStatus(true));
        await dispatch(action);
        dispatch(setLoadingStatus(false));
      })();
    } else {
      // dispatch(action);
    }
    // eslint-disable-next-line
  }, []);
};

export default useAsyncAction;
