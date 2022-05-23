import './styles/App.scss';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import DiscoverPage from './pages/DiscoverPage/DiscoverPage';
import FriendsListPage from './pages/FriendsListPage/FriendsListPage';
import EditPage from './pages/EditPage/EditPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotificationPage from './pages/NotificationPage/NotificationPage';

class App extends Component {

  render(){
    return (
        <div className="App">
          <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/profile/:user" component={ProfilePage}/>
            <Route path="/discover/:user" component={DiscoverPage}/>
            <Route path="/friendslist/:user" component={FriendsListPage}/>
            <Route path='/edit1/:user' component={EditPage}/>
            <Route path='/notifications/:user' component={NotificationPage}/>
          </Switch>
          </BrowserRouter>
        </div>
    );  
  }
}

export default App;
