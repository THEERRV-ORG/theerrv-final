import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Each page is its own lazily-loaded chunk, so the initial download is just the
// shell plus the homepage — the rest arrives on demand as you navigate. The
// Suspense boundary lives inside Layout (around the Outlet), so the navbar and
// footer stay put while a page chunk loads.
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

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
