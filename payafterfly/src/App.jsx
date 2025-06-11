import React, { useState } from "react";
import Navbarr from "./Components/Navbar/Navbarr";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import VisaProvider from "./Dashboards/VisaProvider/VisaProvider";
import Visagrabber from "./Dashboards/visagrabber/Visagrabber";
import Postvisa from "./Dashboards/Postvisa/Postvisa";
import Mypostings from "./Dashboards/mypostedvisa/Mypostings";
import Savedvisasa from "./Dashboards/SavedVisas/Savedvisasa";
import DisplayVisas from "./Dashboards/Filtereredvisas/DisplayVisas";
import LandingPage from "./Dashboards/LandingPage/Landingpage";
const App = () => {
  const [params, setparams] = useState("");
  //console.log(params)
  return (
    <div>
      <Navbarr />
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visaproviderDashboard" element={<VisaProvider />}>
          <Route path="visaposting" element={<Postvisa />} />
          <Route path="postedvisa" element={<Mypostings />} />
        </Route>
        <Route
          path="/visagrabberDashboard"
          element={<Visagrabber params={params} />}
        />
        <Route
          path="/visagrabberDashboard/:savedvisas"
          element={<Visagrabber setparams={setparams} />}
        />
          <Route
          path="/visagrabberDashboard/:appliedvisas"
          element={<Visagrabber setparams={setparams} />}
        /> 
        <Route path="displayvisas" element={<DisplayVisas />} />
      </Routes>
    </div>
  );
};

export default App;
