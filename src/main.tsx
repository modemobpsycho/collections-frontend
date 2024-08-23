import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/app.scss';

import './index.scss';
import { Provider } from 'react-redux';
import { store } from './stores/store';

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
