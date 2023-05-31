import AuthGuard from '@/api/guards/AuthGuard';
import { AppDispatch } from '@/store';
import { loginUser } from '@/store/slices/user.slice';
import { NextPage } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const LoginPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: any) => {
    const login = data.login;
    const password = data.password;

    dispatch(loginUser({ login, password }));
  };

  return (
    <AuthGuard auth={false}>
      <div className="w-screen h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-20 rounded-md bg-gray-200"
        >
          <input
            {...register('login')}
            type="text"
            placeholder="Login"
            className="block mb-5 pl-3 h-10 w-96 mx-auto outline-none"
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="block mb-5 pl-3 h-10 w-96 mx-auto outline-none"
          />
          <button
            type="submit"
            className="w-96 h-10 mx-auto bg-gray-400 rounded-md"
          >
            Login
          </button>

          <Link href="/register" className="text-center mt-5 block">
            Go to registration
          </Link>
        </form>
      </div>
    </AuthGuard>
  );
};

export default LoginPage;
