import { useOptionsState } from '@/hooks/useStoreState';
import { useActions } from '@/hooks/useActions';
import { MaterialUISwitch } from './MaterialUISwitch';

function ThemeButton() {
    const { theme } = useOptionsState();
    const { setTheme } = useActions();

    return (
        <>
            <MaterialUISwitch
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="theme-button"
            />
        </>
    );
}

export default ThemeButton;
