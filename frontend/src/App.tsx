import { ChakraProvider, Flex, Spinner, theme } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Authenticated } from "./components/auth/Authenticated";
import { Login } from "./components/auth/Login";
import { PublicRoute } from "./components/auth/PublicRoute";
import { Register } from "./components/auth/Register";
import { Home } from "./components/Home/Home";
import { NFTDetails } from "./components/Home/NFTDetails";
import { Navbar } from "./components/Navbar/Navbar";
import { SellNFTDetails } from "./components/Sell/SellNFTDetails";
import { Profile } from "./components/User/Profile";
import { UserNFTCollection } from "./components/User/UserNFTCollection";
import { AuthConsumer, AuthProvider } from "./context/JWTAuthContext";
import { Web3Provider } from "./context/Web3Provider";

export const App = () => (
  <ChakraProvider theme={theme}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
      <Web3Provider>
        <AuthProvider>
          <Router>
            <AuthConsumer>
              {(auth) =>
                !auth.isInitialized ? (
                  <Flex
                    height="100vh"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="green.200"
                      color="green.500"
                      size="xl"
                    />
                  </Flex>
                ) : (
                  <Routes>
                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <PublicRoute>
                          <Register />
                        </PublicRoute>
                      }
                    />
                    {/* Authenticated Routes */}
                    <Route path="/" element={<Navbar />}>
                      <Route
                        index
                        element={
                          <Authenticated>
                            <Home />
                          </Authenticated>
                        }
                      />
                      <Route
                        path="/sell/:id"
                        element={
                          <Authenticated>
                            <SellNFTDetails />
                          </Authenticated>
                        }
                      />
                      <Route
                        path="/buy/:id"
                        element={
                          <Authenticated>
                            <NFTDetails />
                          </Authenticated>
                        }
                      />
                      <Route
                        path="/my-collection"
                        element={
                          <Authenticated>
                            <UserNFTCollection />
                          </Authenticated>
                        }
                      />
                      <Route
                        path="/u/profile"
                        element={
                          <Authenticated>
                            <Profile />
                          </Authenticated>
                        }
                      />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                )
              }
            </AuthConsumer>
          </Router>
        </AuthProvider>
      </Web3Provider>
    </GoogleOAuthProvider>
  </ChakraProvider>
);
