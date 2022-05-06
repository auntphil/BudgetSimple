import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Home</h1>
      <Link to="/oauth">Ouath</Link>
    </div>
  );
}

export default App;
