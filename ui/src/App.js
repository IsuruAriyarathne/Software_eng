import SignIn from '../src/containers/Auth/auth';
import './App.css';

function App() {
  fetch("http://localhost:9000/testapi")
  .then(response => {
    console.log(response)
  });
  return (
    <SignIn />
  );
}

export default App;
