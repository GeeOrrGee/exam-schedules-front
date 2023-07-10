import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchSchedules from "./pages/search_schedules";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchSchedules />} />
        {/* <Route /> */}
        {/* <Route /> */}
      </Routes>
    </BrowserRouter>
  );
};
