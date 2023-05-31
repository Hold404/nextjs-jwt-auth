import AuthGuard from '@/api/guards/AuthGuard';
import { AppDispatch, RootState } from '@/store';
import { logoutUser } from '@/store/slices/user.slice';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage: NextPage = () => {
  const { handleSubmit } = useForm();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { replace } = useRouter();

  const onSubmit = () => {
    replace('/login');
    dispatch(logoutUser());
  };

  return (
    <AuthGuard needAuth={true}>
      <div>
        <h2>Profile</h2>
        <h3>{user.login}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;
