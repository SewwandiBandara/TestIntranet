import { BrowserRouter,Routes,Route} from "react-router-dom";
// navbar imports
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Policies from "./pages/Policies";
import Communication from "./pages/Communication";
import Achievements from "./pages/Achievements";
//applications imports
import DisplayPanel from "./pages/DisplayPanel";
//policies imports
import SOP from "./pages/SOP";
import POS from "./pages/POS";
import ISO from "./pages/ISO";
import QMS from "./pages/QMS";
import EMS from "./pages/EMS";
import HW from "./pages/HW";
//admin import
import Admin from "./pages/Admin";


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<Home/>} path="/"/>
         {/* Default route for 404 Not Found */}
        <Route element={<NotFound/>} path="*"/> 

        <Route element={<Policies/>} path="/policies"/>
        <Route element={<Communication/>} path="/commu"/>
        <Route element={<Achievements/>} path="/ach"/>
        
        <Route element={<DisplayPanel/>} path="/display"/> 
        
        {/* Admin routes */}
        <Route element={<Admin/>} path="/admin"/>

        <Route element={<SOP/>} path="/sop"/>
        <Route element={<POS/>} path="/pos"/>
        <Route element={<ISO/>} path="/iso"/>
        <Route element={<QMS/>} path="/qms"/>
        <Route element={<EMS/>} path="/ems"/>
        <Route element={<HW/>} path="/hw"/>
               
    </Routes>
    </BrowserRouter>
  )
}

export default App
