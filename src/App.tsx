/**
 * App script to render main processes of the application.
 */

import * as ReactDOM from 'react-dom/client';
import React from "react";
import LogIn from "./components/login";
import Workspace from './components/workspace';

interface IAppState {
    isLogged: boolean;
    user: string;
}


/**
 * Class that represent the App.
 * @extends {React.Component}
 */
class App extends React.Component<{}, IAppState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: {}) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);

        // Set state.
        this.state = {
            isLogged: false,
            user: "",
        }

    }

    /**
     * Validate that the login info is correct.
     * @param user {string} - The name of the user.
     * @param username {string} - Username.
     * @param password {string} - Password to ve validated.
     */
    async handleLogIn(
        user:string, username: string, password: string
    ): Promise<boolean> {
        if (await window.UserAPI.validateUserLogIn(username, password)) {

            this.setState({
                isLogged: true,
                user: user
            });

            this.render();

            return true;

        }

        return false;

    }

    /**
     * Logout.
     */
    handleLogOut() {
        this.setState({
            isLogged: false,
            user: "",
        });

        this.render();
    }

    /**
     * Config the characteristics of the button according to theme and render
     * the button.
     * @returns {React.ReactNode} the button node.
     */
    render(): React.ReactNode {

        if (this.state.isLogged) {
            return <Workspace user={this.state.user} />;
        }
        return <LogIn handleLogIn={this.handleLogIn} />;

    }
}


// Get root div.
let darkButton = ReactDOM.createRoot($("#root")[0]);

// Render login view when window is ready.
darkButton.render(<App />);
