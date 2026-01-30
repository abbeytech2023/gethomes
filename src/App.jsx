import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//Components
import HomeEssentials from "./pages/HomeEssentials";
import AboutUs from "./pages/AboutUs";
import ProductSaleForm from "./components/ProductSaleForm";
import PropertyToLetForm from "./components/PropertiesToLetForm";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import MyAccount from "./pages/MyAccount";
import ResetPasswordPage from "./pages/ResetPassword";
import Header from "./components/Header";
import WhatsAppLogo from "./components/WhataAppLogo";

//Pages
import Homepage from "./pages/Homepage";
import BuyPage from "./pages/BuyPage";
import SignIn from "./pages/SignIn";
import Rent from "./pages/Rent";
import Footer from "./components/Footer";
import { Spinner } from "./components/Spinner";
import SinglePropertyToLet from "./pages/SinglePropertyToLet";
import SinglePropertyForSale from "./pages/SinglePropertyForSale";
import MerchantsPage from "./pages/MerchantsPage";
import VenuesPage from "./pages/Venues";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import ForgotPasswordPage from "./pages/ResetPasswordEmail";

//hooks
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./hooks/useAuthContext";
import AnonymousRoute from "./components/AnonymousRoute";
import { useEffect } from "react";
import Advertisement from "./pages/Advertisement";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import VenuesForm from "./components/VenuesForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { authIsReady, user } = useAuthContext();

  const location = useLocation();

  const URL = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [URL]);

  return (
    <>
      {!authIsReady && <Spinner />}
      {authIsReady && (
        //Browser router is being comment out here because it has been applied in the main.jsx file
        // <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <div className="flex flex-col min-h-screen ">
            <Header />
            <Routes>
              <Route path="/" element={<Navigate replace to="/homepage" />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/advertisement" element={<Advertisement />} />
              <Route path="/venuespage" element={<VenuesPage />} />
              <Route path="/venuespage/:id" element={<VenueDetailsPage />} />
              <Route path="/buy" element={<BuyPage />} />
              <Route path="/buy/:id" element={<SinglePropertyForSale />} />
              <Route path="/rent/" element={<Rent />} />
              <Route path="/rent/:id" element={<SinglePropertyToLet />} />
              <Route path="merchants/:id" element={<MerchantsPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="admin131" element={<AdminDashboard />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/homeessentials" element={<HomeEssentials />} />
              <Route
                path="/myaccount"
                element={
                  <ProtectedRoutes>
                    <MyAccount />
                  </ProtectedRoutes>
                }
              >
                <Route path="profile" element={<Profile />} />
                <Route path="dashboard" element={<Dashboard />} />

                <Route
                  path="addpropertytolet"
                  element={<PropertyToLetForm />}
                />

                <Route
                  path="addpropertyforsale"
                  element={<ProductSaleForm />}
                />
                <Route path="addvenues" element={<VenuesForm />} />
              </Route>
              <Route element={<AnonymousRoute />}>
                <Route path="/signin" element={<SignIn />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppLogo />
          </div>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
                color: "#144c6f",
              },
              error: {
                duration: 3000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "#eaf2f4",
                color: "black",
              },
            }}
          />
          <Footer />
        </QueryClientProvider>
        // </BrowserRouter>
      )}
    </>
  );
  // return <div>hello world</div>;
}

export default App;
