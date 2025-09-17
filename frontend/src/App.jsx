import { BrowserRouter,Routes,Route} from "react-router-dom";
// navbar imports
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import Policies from "./pages/Policies";
import Communication from "./pages/Communication";
import Achievements from "./pages/Achievements";
//applications imports
import HumanResource from "./pages/HumanResource";
import Medical from "./pages/Medical";
import DisplayPanel from "./pages/DisplayPanel";
import Appraisal from "./pages/Appraisal";
import FeedbackForm from "./pages/FeedbackForm";
import NonConfirmity from "./pages/NonConfirmity";
import Docware from "./pages/Docware";
import IFS from "./pages/IFS";
//policies imports
import SOP from "./pages/SOP";
import POS from "./pages/POS";
import ISO from "./pages/ISO";
//admin import
import Admin from "./pages/Admin";



function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<Home/>} path="/"/>
         {/* Default route for 404 Not Found */}
        <Route element={<NotFound/>} path="*"/> 

        <Route element={<Applications/>} path="/appli"/>
        <Route element={<Policies/>} path="/policies"/>
        <Route element={<Communication/>} path="/commu"/>
        <Route element={<Achievements/>} path="/ach"/>

        <Route element={<HumanResource/>} path="/humanRe"/>
        <Route element={<Medical/>} path="/medical"/>
        <Route element={<DisplayPanel/>} path="/display"/>
        <Route element={<Appraisal/>} path="/appraisal"/>
        <Route element={<FeedbackForm/>} path="/feed"/>
        <Route element={<NonConfirmity/>} path="/noncnf"/>
        <Route element={<IFS/>} path="/ifs"/>
        
        {/* Docware and Production Display */}
        <Route element={<Docware/>} path="/docware"/>
        
        {/* Admin routes */}
        <Route element={<Admin/>} path="/admin"/>

        <Route element={<SOP/>} path="/sop"/>
        <Route element={<POS/>} path="/pos"/>
        <Route element={<ISO/>} path="/iso"/>
        
       
    </Routes>
    </BrowserRouter>
  )
}

export default App
