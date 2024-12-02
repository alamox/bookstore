import  {Route, Routes, BrowserRouter} from 'react-router-dom';
import Index from './pages';
import Create from './pages/create';
import View from './pages/view';
import Store from './store/store';

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='create' element={<Create />} />
          <Route path='view/:bookId' element={<View />} />
        </Routes>
      </BrowserRouter>
    </Store>
  );
}
/*
Routes es como un contenedor para almacenar las rutas que vayamos a usar
Route sirve para espeficiar dicha ruta, esto contendra dos props:
  - Path: donde se especifica la ruta donde vamos a redirigirnos
  - Element: que es el elemento interno al que vamos a acceder

view/:bookId --> Al poner algo despues de los dos puntos es como un
"placeholder" significa que se sustituirá por un valor.
*/

export default App;
