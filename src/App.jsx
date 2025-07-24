import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Components
import HomeEssentials from "./pages/HomeEssentials";
import ProductSaleForm from "./components/ProductSaleForm";
import PropertyToLetForm from "./components/PropertiesToLetForm";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import MyAccount from "./pages/MyAccount";
import Header from "./components/Header";

//Pages
import Homepage from "./pages/Homepage";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import SignIn from "./pages/SignIn";
import Rent from "./pages/Rent";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Spinner } from "./components/Spinner";
import SingleRent from "./components/SingleRent";
import MerchantsPage from "./pages/MerchantsPage";

//hooks
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./hooks/useAuthContext";
import AnonymousRoute from "./components/AnonymousRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <>
      {!authIsReady && <Spinner />}
      {authIsReady && (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <div className="flex flex-col min-h-screen ">
              <Header />
              <Routes>
                <Route path="/" element={<Navigate replace to="/homepage" />} />
                <Route path="/homepage" element={<Homepage />} />
                {/* <Route path="/sell" element={<Sell />} /> */}
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent/" element={<Rent />} />
                <Route path="/rent/:id" element={<SingleRent />} />
                <Route path="merchants" element={<MerchantsPage />} />
                <Route path="/homeessentials" element={<HomeEssentials />} />
                <Route
                  path="/myaccount"
                  element={
                    // <ProtectedRoutes>
                    <MyAccount />
                    // </ProtectedRoutes>
                  }
                >
                  <Route path="profile" element={<Profile />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dashboard/:id" element={<SingleRent />} />

                  <Route
                    path="addpropertytolet"
                    element={<PropertyToLetForm />}
                  />

                  <Route
                    path="addpropertyforsale"
                    element={<ProductSaleForm />}
                  />
                </Route>
                <Route element={<AnonymousRoute />}>
                  <Route path="/signin" element={<SignIn />} />
                </Route>
              </Routes>
            </div>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
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
        </BrowserRouter>
      )}
    </>
  );
  // return <div>hello world</div>;
}

export default App;
