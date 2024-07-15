
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";

export default function index() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Layout />} />
            </Routes>
        </BrowserRouter>
    )
}
