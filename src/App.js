import './styles/App.scss';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'

class App extends Component {
  render(){
    return (
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginPage}/>
          <Route path="/signup" component={SignUpPage}/>
        </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
