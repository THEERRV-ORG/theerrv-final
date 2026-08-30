import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import SolutionsPage from "./pages/SolutionsPage";
// import CaseStudiesPage from "./pages/CaseStudiesPage"; // temporarily hidden
import InsightsPage from "./pages/InsightsPage";
import ArticlePage from "./pages/ArticlePage";
// import CareersPage from "./pages/CareersPage"; // temporarily hidden
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        {/* <Route path="case-studies" element={<CaseStudiesPage />} /> */}
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/:slug" element={<ArticlePage />} />
        {/* <Route path="careers" element={<CareersPage />} /> */}
        <Route path="contact" element={<ContactPage />} />
        {/* /locations retired — its content now lives at /contact#location */}
        <Route path="locations" element={<Navigate to="/contact#location" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
