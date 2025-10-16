import { Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Artwork from "./pages/Artwork";
import MyGallery from "./pages/MyGallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/artwork/:id" element={<Artwork />} />
        <Route path="/my-gallery" element={<MyGallery />} />
      </Route>
    </Routes>
  );
}

export default App;
