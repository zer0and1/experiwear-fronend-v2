import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAction = (action) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => dispatch(action), []);
};

export default useAction;
