import React, { Suspense } from "react";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";

function App() {
  const loading = <div>Loading..</div>;
  const Layout = React.lazy(() => import("./layout/index"));
  const Search = React.lazy(() => import("./layout/layoutSearch"));

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<Layout />} name="home" />
          <Route path="/Search" element={<Search />} name="search" />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
