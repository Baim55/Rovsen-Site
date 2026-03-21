import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Academy from "./pages/Academy";
import Training from "./pages/Training";
import Resource from "./pages/Resource";
import Specialist from "./pages/Specialist";
import Media from "./pages/Media";
import Layout from "./components/Layout";
import AgeGroupPage from "./components/AgeGroupPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
import ArticlePage from "./components/ArticlePage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/training" element={<Training />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/specialists" element={<Specialist />} />
          <Route path="/media" element={<Media />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/yas/:id" element={<AgeGroupPage />} />
          <Route path="/meqale/:id" element={<ArticlePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
