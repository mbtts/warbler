import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Nav from './Nav';
import Welcome from './Welcome';
import PostRegister from './PostRegister';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

const NAV = ['login', 'register'];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.createAppState({ navItems: this.createNavItems() });
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.renderHome = this.renderHome.bind(this);
    }

    createAppState({ user = null, newRegistration = false, navItems = [] } = {}) {
        return { user, newRegistration, navItems };
    }

    createNavItems() {
        return NAV.map(id => this.createNavItem(id));
    }

    createNavItem(id) {
        const handler = () => this.setState({ view: id });
        return { id, handler };
    }

    onLogin(user) {
        this.postLoginState(user);
    }

    onRegister(user) {
        this.postLoginState(user, true);
    }

    postLoginState(user, newRegistration) {
        this.setState(this.createAppState({ user, newRegistration }));
    }

    renderHome() {
        const { user, newRegistration } = this.state;

        if (user && newRegistration) {
            return <PostRegister username={user.username} />
        } else if (user) {
            return <Welcome username={user.username} />
        } else {
            return <Redirect to="/login" />
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav navItems={this.state.navItems} />
                    <Route exact path="/" component={this.renderHome} />
                    <Route path="/login" render={props => <Login  {...props} onLogin={this.onLogin} />} />
                    <Route path="/register" render={props => <Register {...props} onRegister={this.onRegister} />} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
