import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import ScrollToTop from "./components/ScrollToTop"; // Helper we'll create

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/properties/:id" element={<PropertyDetails />} />
                </Routes>
            </Layout>
        </Router>
    );
}
