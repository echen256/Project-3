import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Articles from './pages/Articles';
import SavedArticles from './pages/SavedArticles';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import Recommendation from './pages/Recommendation';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Comments from "./pages/Comments"

class App extends Component {


  state = {
    loggedin: false
  }

  componentDidMount() {
    this.updateLogin(this);
  };

  updateLogin (scope){
    scope.setState({loggedin : localStorage.getItem('jwtToken') !== null})
    console.log(scope.state.loggedin);
  }


  render() {
    console.log(this.state.loggedin);
    return (<Router>
      <div>
        <Nav loggedin = {this.state.loggedin} />

        <Switch>

          
          <Route exact path="/savedArticles" component={SavedArticles} />
          <Route exact path="/savedArticles/:id" component={Comments} />
          <Route exact path="/recommendation" component={Recommendation} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/"  render=   {(props) => this.state.loggedin ? <Articles/> : <Login {...props} parent={this} updateLogin = {this.updateLogin}/>}/>
          <Route exact path="/login" component = {Login}/>
          <Route component={NoMatch} />
          <Route exact path="/(|articles)" component={Articles} />
        </Switch>


      </div>
    </Router>);
  }

}

export default App;
