
import './css/App.css';
import ApiCall from './components/apiCall';

function App() {
  return (
    
    <div className="App">
      <ApiCall shouldRun={true} apiObject={{url: 'https://fakestoreapi.com/products', data: '', showModal: true, shouldAuthorize: false}} />
    </div>
  );
}

export default App;
