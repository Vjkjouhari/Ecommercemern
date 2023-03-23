import './App.css';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
  );
}

export default App;
