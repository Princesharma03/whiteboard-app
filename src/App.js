
import './App.css';
import Container from './components/container/Container';
import Welcome from "./components/Welcome/Welcome";
import {Routes,Route,Navigate} from 'react-router-dom'

function App() {
  return (
    
      <Routes>
        <Route path="" element={<Welcome/>}/>
        <Route path="/whiteboard/:room" element={<Container/>}/>
       

      </Routes>
   
  );
}

export default App;
