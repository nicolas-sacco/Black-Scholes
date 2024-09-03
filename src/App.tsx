import LinkedIn from "./header-components/linkedin";
import Github from "./header-components/github";
import About from "./header-components/aboutme";


function App() {
  return (
    <>
    <div className="sidebar">SideBar</div>

    <div className="topbar"><About /><LinkedIn></LinkedIn> <Github></Github> </div>
    
    
    <div className="main">Main</div>
    
    
    
    </>
  );
}

export default App;
