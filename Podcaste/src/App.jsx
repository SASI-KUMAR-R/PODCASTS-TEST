import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/FunctionComponents/SignUp";
import Home from "./Components/FunctionComponents/Home";
import Login from "./Components/FunctionComponents/Login";
import Pod from "./Components/FunctionComponents/Pod";
import Detail from "./Components/FunctionComponents/Detail";
import ANNOUNCEMENT from "./Components/FunctionComponents/IMP";
import YourLibraryHome from "./Components/FunctionComponents/YourLibraryHome";
import AddPodcast from "./Components/FunctionComponents/AddPodcast";
import DeletePodcast from "./Components/FunctionComponents/DeletePodcast";
import { UserProvider } from "./Components/FunctionComponents/UserContext";

function App() {
  return (
    <UserProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pod" element={<Pod />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/announ" element={<ANNOUNCEMENT />} />
          <Route path="/libhome" element={<YourLibraryHome />} />
          <Route path="/addpod" element={<AddPodcast />} />
          <Route path="/deletepod" element={<DeletePodcast />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
