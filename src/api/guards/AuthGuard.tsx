import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  auth: boolean;
  children: ReactNode;
};

const AuthGuard: FC<Props> = ({ auth, children }) => {
  const [allow, setAllow] = useState(false);
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const { replace } = useRouter();

  useEffect(() => {
    if (!user && auth && !isLoading) replace('/');
    else if (user && !auth && !isLoading) replace('/');
    else {
      if (!isLoading) setAllow(true);
    }
  }, [isLoading]);

  if (isLoading) return <h2>Loading</h2>;
  if (allow) return <>{children}</>;
  else return <></>;
};

export default AuthGuard;
