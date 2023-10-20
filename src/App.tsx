import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Faucet from './components/Faucet';
import Home from './components/Home';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/faucet" exact component={Faucet} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;