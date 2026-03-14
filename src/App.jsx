import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Academy from "./pages/Academy";
import Training from "./pages/Training";
import Resource from "./pages/Resource";
import Specialist from "./pages/Specialist";
import Media from "./pages/Media";
import Layout from "./components/Layout";
import AgeGroupPage from "./components/AgeGroupPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/training" element={<Training />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/specialists" element={<Specialist />} />
          <Route path="/media" element={<Media />} />
          <Route path="/yas/:id" element={<AgeGroupPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
