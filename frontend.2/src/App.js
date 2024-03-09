//IMPORTACION DE MODULOS Y COMPONENTES
import './App.css';
import AddInmuebleComponent from './component/AddInmuebleComponent';
import FooterComponent from './component/FooterComponent';
import HeaderComponent from './component/HeaderComponent';
import ListInmuebleComponent from './component/ListInmuebleComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//CONFIGURACION DE REACT-ROUTER Y SUS RUTAS
function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListInmuebleComponent />}></Route>
            <Route path='/inmueble' element={<ListInmuebleComponent />}></Route>
            <Route path='/add-inmueble' element={<AddInmuebleComponent />}></Route>
            <Route path='/edit-inmueble/:id' element={<AddInmuebleComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
