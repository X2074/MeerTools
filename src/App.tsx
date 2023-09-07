import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Faucet from './components/Faucet';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Faucet} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;