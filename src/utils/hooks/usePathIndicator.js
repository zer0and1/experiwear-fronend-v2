import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPathTokens } from 'actions/auxiliary';

const usePathIndicator = (paths) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(
    () => dispatch(setPathTokens(Array.isArray(paths) ? paths : [paths])),
    []
  );
};

export default usePathIndicator;
