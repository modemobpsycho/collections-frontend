import { useSelector } from 'react-redux';
import { RootState } from '../stores/store';

export const useUserState = () => {
    return useSelector((state: RootState) => state.user);
};

export const useOptionsState = () => {
    return useSelector((state: RootState) => state.options);
};
