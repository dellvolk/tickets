import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";
import "toastr/build/toastr.min.css";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"
// Import Backend Configuration file
// import Backend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
// new Backend()

// Activating fake firebase
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const Layout = HorizontalLayout

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

App.propTypes = {
  layout: PropTypes.object,
}

export default connect(mapStateToProps, null)(App)
