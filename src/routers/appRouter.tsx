import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '../components/header/Header';
import HomePage from '../pages/homePage/homePage';
import AuthWrapper from '../pages/authorization/AuthWrapper';
import Login from '../pages/authorization/Login';
import SignUp from '../pages/authorization/SignUp';
import Collections from '../pages/collections/Collections';
import Cabinet from '../pages/cabinet/CabinetWrapper';
import UserCollections from '../pages/collections/UserCollections';
import AddCollection from '../pages/addCollection/AddCollection';

export const AppRouter = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/login"
                        element={
                            <AuthWrapper>
                                <Login />
                            </AuthWrapper>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthWrapper>
                                <SignUp />
                            </AuthWrapper>
                        }
                    />
                    <Route path="/cabinet" element={<Cabinet />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/my-collections" element={<UserCollections />} />
                    <Route path="/add-collection" element={<AddCollection />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
