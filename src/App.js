import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
//import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Flights from './containers/Flights/Flights';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import Tickets from './containers/Tickets/Tickets'
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Login} />
         <Route path="/flights" component= {Flights} /> 
         <Route path="/" component ={Flights}/>
        {/* <Route path="/flights" component={} */}
        {/* <Route path="/" exact component={BurgerBuilder} /> */}
         <Redirect to="/" /> 
      </Switch>
    );

   if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/flights" component={Tickets}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/" component={Flights}/>
           <Redirect to="/" /> 
        </Switch>
      );
    } 

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
