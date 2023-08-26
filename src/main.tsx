import * as ReactDOM from "react-dom";
import App from "./App";
// import TransferTool from "./TransferTool/TransferTool";
import './index.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.render(
  <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Switch>
          <Route path="/" component={App} />
          {/* <Route path="/trans" component={TransferTool} /> */}
        </Switch>
      </I18nextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

