import './styles/App.scss';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const API_URL = process.env.REACT_APP_API_URL

class App extends Component {

  render(){
    return (
        <div className="App">
          <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/profile/:user" component={ProfilePage}/>
          </Switch>
          </BrowserRouter>
        </div>
    );  
  }
}

export default App;
