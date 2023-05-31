import { RootState } from '@/store';
import { NextPage } from 'next';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const HomePage: NextPage = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.user);

  if (isLoading) return <h2>Loading</h2>;

  if (!user)
    return (
      <div>
        <Link href="/login">Login</Link>
        <br />
        <Link href="/register">Register</Link>
      </div>
    );

  return <Link href="/profile">Profile</Link>;
};

export default HomePage;
