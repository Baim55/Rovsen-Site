import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Academy from "./pages/Academy";
import Training from "./pages/Training";
import Media from "./pages/Media";
import Layout from "./components/Layout";
import AgeGroupPage from "./components/AgeGroupPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
import ArticlePage from "./components/ArticlePage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import DocumentsPage from "./pages/Documentspage";
import ArticlesPage from "./pages/Articlespage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TestsPage from "./pages/TestsPage";
import TestPage from "./pages/TestPage";
import GamesPage from "./pages/GamesPage";
import GamePage from "./pages/GamePage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/training" element={<Training />} />
          <Route path="/komanda" element={<TeamPage />} />
          <Route path="/resources" element={<DocumentsPage />} />
          <Route path="/meqaleler" element={<ArticlesPage />} />
          <Route path="/media" element={<Media />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/yas/:id" element={<AgeGroupPage />} />
          <Route path="/meqale/:id" element={<ArticlePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/test/:id" element={<TestPage />} />
          <Route path="/oyunlar" element={<GamesPage />} />
          <Route path="/oyun/:id" element={<GamePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
