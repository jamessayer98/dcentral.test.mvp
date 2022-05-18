import { ChakraProvider, Flex, Spinner, theme } from "@chakra-ui/react";
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
import { Navbar } from "./components/Navbar/Navbar";
import { AuthConsumer, AuthProvider } from "./context/JWTAuthContext";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Router>
        <AuthConsumer>
          {(auth) =>
            !auth.isInitialized ? (
              <Flex height="100vh" alignItems="center" justifyContent="center">
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
                        <h1>Hello Protected</h1>
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
  </ChakraProvider>
);
