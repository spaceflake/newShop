import { Route, Routes } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import AdminPage from '../pages/Admin/AdminPage';
import AdminProductControl from '../pages/Admin/AdminProductControl';
import AdminUserControl from '../pages/Admin/AdminUserControl';
import NotAdmin from '../pages/Admin/NotAdmin';
import CartPage from '../pages/CartPage';
import CheckOutPage from '../pages/CheckOutPage';
import ConfirmedOrderPage from '../pages/ConfirmedPage';
import FaqPage from '../pages/FaqPage';
import LoginPage from '../pages/LoginPage';
import ProductListPage from '../pages/ProductListPage';
import ProductPage from '../pages/ProductPage';
import SignUpPage from '../pages/SignUpPage';
import StartPage from '../pages/StartPage';
import SupportPage from '../pages/SupportPage';
import TermsOfUsePage from '../pages/TermsOfUsePage';
import Layout from './Layout';

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
      <Route path="admin" element={<AdminPage />}>
        <Route path="adminUser" element={<AdminUserControl />} />
        <Route path="adminProducts" element={<AdminProductControl />}>
        </Route>
        <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
      </Route>
      ) : (
        <Route path="*" element={<NotAdmin />} />
      )}
    
    </Routes>
  );
}

export default App;
