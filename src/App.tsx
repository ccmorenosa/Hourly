/**
 * App script to render main processes of the application.
 */

import * as ReactDOM from 'react-dom/client';
import React from "react";
import LogIn from "./components/login";

interface IAppState {
    isLogged: boolean;
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

        // Set state.
        this.state = {
            isLogged: false,
        }

    }

    /**
     * Validate that the login info is correct.
     * @param username {string} - Given username.
     * @param password {string} - Password to ve validated.
     */
    handleLogIn(username: string, password: string) {
        this.setState({
            isLogged: true
        });
    }

    /**
     * Config the characteristics of the button according to theme and render
     * the button.
     * @returns {React.ReactNode} the button node.
     */
    render(): React.ReactNode {

        return <LogIn />;

    }
}


// Get root div.
let darkButton = ReactDOM.createRoot($("#root")[0]);

// Render login view when window is ready.
darkButton.render(<App />);
