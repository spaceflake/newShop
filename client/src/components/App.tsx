import { Route, Routes } from 'react-router-dom';
import ProductListPage from '../pages/ProductListPage';
import Layout from './Layout';
import StartPage from '../pages/StartPage';
import CheckOutPage from '../pages/CheckOutPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import FaqPage from '../pages/FaqPage';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import AdminPage from '../pages/Admin/AdminPage';
import SupportPage from '../pages/SupportPage';
import ConfirmedOrderPage from '../pages/ConfirmedPage';
import SignUpPage from '../pages/SignUpPage';
import AdminUserControl from '../pages/Admin/AdminUserControl';
import { useUser, UserContext } from '../contexts/UserContext';
import NotAdmin from '../pages/Admin/NotAdmin';

function App() {
  const {user}  = useUser();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="products">
          <Route index element={<ProductListPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="cartPage" element={<CartPage />} />
        <Route path="checkoutPage" element={<CheckOutPage />} />
        <Route path="confirmed-order" element={<ConfirmedOrderPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="termsOfUse" element={<TermsOfUsePage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
      {user && user?.isAdmin === true ? (
      <><Route path="admin" element={<AdminPage />} /><Route path="adminUser" element={<AdminUserControl />} /></> 
      ) : (
        <Route path="*" element={<NotAdmin />} />
      )}
    
    </Routes>
  );
}

export default App;
