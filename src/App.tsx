import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthContext.tsx";
import { useAuth } from "./context/AuthContext/useAuth.ts";
import LoginPage from "./page/Login/LoginPage";
import Gallery from "./page/Gallery/Gallery";
import Header from "./layout/header/Header";
import { type JSX, useState, useEffect, useCallback } from "react";
import UploadImage from "./page/UploadImage/UploadImage";
import { getUserImages, searchImage } from "./services/images";
import { type Image } from "./types/Image";
import ImageDetail from "./page/ImageDetail/ImageDetail.tsx";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import SearchResultsPage from "./page/SearchPage/SearchResultsPage";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const location = useLocation();

  const loadImages = useCallback(async () => {
    if (!token) return;

    try {
      const data = await getUserImages();
      setImages(data);
    } catch (err) {
      console.error("Error cargando imágenes", err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    if (location.pathname === "/upload") return;

    const fetchImages = async () => {
      try {
        const all = await getUserImages();
        setImages(all);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando imágenes", err);
      }
    };

    fetchImages();
  }, [token, location.pathname]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <>
              <Header />

              <Gallery images={images} loading={loading} />
            </>
          </PrivateRoute>
        }
      />

      <Route
        path="/image/:id"
        element={
          <PrivateRoute>
            <>
              <Header />
              <ImageDetail images={images} />
            </>
          </PrivateRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <>
              <Header />
              <UploadImage onUpload={loadImages} />
            </>
          </PrivateRoute>
        }
      />

      <Route
        path="/q"
        element={
          <PrivateRoute>
            <>
              <Header />
              <SearchResultsPage searchImage={searchImage} />
            </>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
