import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useUser = () => useSelector((store: RootState) => store.user.user);
