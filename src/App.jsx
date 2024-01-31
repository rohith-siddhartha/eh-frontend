import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { ProductsPage } from "./pages/Products";
import { PackagePage } from "./pages/PackagePage";
import { RootLayout } from "./pages/RootLayout";

function App() {

  return (
    <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/product/:packageId" element={<PackagePage />} />
        </Route>
      </Routes>
  )
}

export default App
