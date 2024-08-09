import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { actions as userActions } from '../stores/slices/user.slice';
import { actions as settingsActions } from '../stores/slices/pageSettings.slice';

const rootActions = {
    ...userActions,
    ...settingsActions
};

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
