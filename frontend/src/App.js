
import './css/App.css';
import ApiCall from './components/apiCall';

function App() {
  return (
    
    <div className="App">
      <ApiCall shouldRun={true} apiObject={{url: '', data: '', showModal: true}} />
    </div>
  );
}

export default App;
