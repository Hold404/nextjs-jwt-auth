import AuthGuard from '@/api/guards/AuthGuard';
import { useUser } from '@/hooks/useUser';
import { AppDispatch } from '@/store';
import { logoutUser } from '@/store/slices/user.slice';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const ProfilePage: NextPage = () => {
  const { handleSubmit } = useForm();
  const { login } = useUser();
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
        <h3>{login}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;
