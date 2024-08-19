import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@/components/header/Header';
import HomePage from '@/pages/home/Home';
import AuthWrapper from '@/pages/authorization/AuthWrapper';
import Login from '@/pages/authorization/Login';
import SignUp from '@/pages/authorization/SignUp';
import Collections from '@/pages/collections/Collections';
import UserCollections from '@/pages/collections/UserCollections';
import AddCollection from '@/pages/addCollection/AddCollection';
import CollectionInfo from '@/pages/collectionInfo/CollectionInfo';
import ChangeCollection from '@/pages/changeCollection/ChangeCollection';
import AdminPanel from '@/pages/cabinet/AdminPanel';
import CabinetWrapper from '@/pages/cabinet/CabinetWrapper';
import PersonalData from '@/pages/cabinet/PersonalData';
import Item from '@/pages/item/Item';
import ChangeItem from '@/pages/changeItem/ChangeItem';

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
                    <Route
                        path="/admin-panel"
                        element={
                            <CabinetWrapper>
                                <AdminPanel />
                            </CabinetWrapper>
                        }
                    />
                    <Route
                        path="/cabinet"
                        element={
                            <CabinetWrapper>
                                <PersonalData />
                            </CabinetWrapper>
                        }
                    />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/my-collections" element={<UserCollections />} />
                    <Route path="/add-collection" element={<AddCollection />} />
                    <Route path="/collections/:id" element={<CollectionInfo />} />
                    <Route path="/collections/:id/edit" element={<ChangeCollection />} />
                    <Route path="/item/:itemId" element={<Item />} />
                    <Route path="item/:itemId/edit" element={<ChangeItem />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
