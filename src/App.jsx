import React, { Component } from "react";
import Footer from "./components/Footer.jsx";
import SiteNav from "./components/SiteNav.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Blogs from "./components/Blogs.jsx";
import Tech from "./components/Tech.jsx";
import Friends from "./components/Friends.jsx";
import FriendsForm from "./components/FriendsForm.jsx";
import Jobs from "./components/Jobs.jsx";
import Events from "./components/Events.jsx";
import Register from "./components/Register";
import * as userService from "./services/userService";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    user: {
      isLoggedIn: false,
      userFirstName: "",
      userLastName: "",
    },
  };

  getCurrentUser = () => {
    userService
      .userCurrent()
      .then(this.onCurrentSuccess)
      .catch(this.onCurrentError);
  };

  onCurrentSuccess = (response) => {
    const userId = response.data.item.id;
    this.getById(userId);
  };

  onCurrentError = (response) => {
    console.log(response.message);
  };

  getById = (userId) => {
    userService.userId(userId).then(this.onIdSuccess).catch(this.onIdError);
  };

  onIdSuccess = (response) => {
    this.setState(() => {
      let user = { ...this.state.user };
      const data = response.data.item;
      user.userFirstName = data.firstName;
      user.userLastName = data.lastName;
      user.userId = data.id;
      user.isLoggedIn = true;
      return { user };
    });
  };
  onIdError = (response) => {
    console.log(response.message);
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  componentDidUpadte() {
    if (!this.state.user.userFirstName && !this.state.user.userLastName) {
      this.getCurrentUser();
    }
  }

  updateUserLogin = (isLoggedIn) => {
    this.setState((current) => {
      return {
        ...current,
        user: {
          ...current.user,
          isLoggedIn,
        },
      };
    });
  };

  render() {
    return (
      <BrowserRouter>
        <SiteNav
          {...this.props}
          updateUserLogin={this.updateUserLogin}
          isUserLoggedIn={this.state.user.isLoggedIn}
          firstName={this.state.user.userFirstName}
        />
        <main role="main">
          <Switch>
            <Route
              path="/Login"
              exact
              render={() => {
                return <Login updateUserLogin={this.updateUserLogin} />;
              }}
            />
            <Route path="/Register" exact component={Register} />
            <Route path="/Friends" exact component={Friends} />
            <Route path="/FriendsForm/" exact component={FriendsForm} />
            <Route path="/FriendsForm/:id(\d+)" exact component={FriendsForm} />
            <Route path="/Blogs" exact component={Blogs} />
            <Route path="/Tech" exact component={Tech} />
            <Route path="/Jobs" exact component={Jobs} />
            <Route path="/Events" exact component={Events} />
            <Route
              path="/"
              exact
              render={() => {
                return <Home user={this.state.user} />;
              }}
            />
          </Switch>
        </main>

        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
