import { AppDispatch, RootState } from '@/store';
import { getUser, setLoading } from '@/store/slices/user.slice';
import { parseCookies } from 'nookies';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state.user);
  const accessToken = parseCookies().accessToken;

  useEffect(() => {
    if (!auth) {
      if (!accessToken) dispatch(setLoading(false));
      else dispatch(getUser());
    }
  }, []);

  return <>{children}</>;
};

export default UserProvider;
