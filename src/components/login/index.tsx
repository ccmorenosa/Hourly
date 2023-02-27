/**
 * Main file of the login component.
 *
 * It renders the login pages when the application starts.
 */

import React from "react";
import WelcomeBox from "./Welcome";
import LogInForm from "./LogInForm";
import NewUserForm from "./NewUserForm";
import Layout from "../layouts";

interface ILogInProps {
    handleLogIn: (
        user:string, username: string, password: string
    ) => Promise<boolean>;
}

interface ILogInState {
    content: string;
    welcome: React.ReactNode;
    logInForm?: React.ReactNode;
    newUserForm: React.ReactNode;
}


/**
 * Class representing the LogIn component.
 * @extends {React.Component}
 */
class LogIn extends React.Component<ILogInProps, ILogInState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: ILogInProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.welcomeBox = this.welcomeBox.bind(this);
        this.logInForm = this.logInForm.bind(this);
        this.newUserForm = this.newUserForm.bind(this);

        // Set state.
        this.state = {
            content: "welcome",
            welcome: (
                <WelcomeBox
                    logInForm={this.logInForm}
                    newUserBtn={
                        < Layout.buttons.SimpleButton
                            text="New Profile" style="option-1"
                            action={this.newUserForm}
                        />
                    }
                />
            ),
            newUserForm: (
                <NewUserForm
                    handleLogIn={this.props.handleLogIn}
                    cancelBtn={
                        <Layout.buttons.SimpleButton
                            text="Cancel" style="danger"
                            action={this.welcomeBox}
                        />
                    }
                />
            )
        };

    }

    /**
     * Set content state to welcome box.
     */
    welcomeBox(): void {

        this.setState({
            content: "welcome"
        });

        this.render();

    }

    /**
     * Set content view to login form.
     */
    logInForm(user: string, username: string): void {

        this.setState({
            content: "logInForm",
            logInForm: <LogInForm
                handleLogIn={this.props.handleLogIn}
                user={user}
                username={username}
                cancelBtn={
                    <Layout.buttons.SimpleButton
                        text="Cancel" style="danger"
                        action={this.welcomeBox}
                    />
                }
            />
        });

        this.render();

    }

    /**
     * Set content view to new user form.
     */
    newUserForm(): void {

        this.setState({
            content: "newUserForm"
        });

        this.render();

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the LogIn node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let viewClass = (
            "h-screen flex flex-col justify-center bg-gray-300 " +
            "dark:bg-purple-600 text-gray-1000 dark:text-gray-100"
        );

        /** @typedef {string} - Class for the box div. */
        let boxClass = (
            "bg-purple-500 dark:bg-purple-900 mx-auto w-1/3 " +
            "rounded-lg text-center p-10 sm:p-5 h-5/6 flex flex-col"
        );

        /** @typedef {React.ReactNode} - Box in the login view. */
        let content: React.ReactNode;

        switch (this.state.content) {
            case "welcome":
                content = this.state.welcome;
                break;

            case "newUserForm":
                content = this.state.newUserForm;
                break;

            case "logInForm":
                content = this.state.logInForm;
                break;
        }

        // Return the node.
        return (
            <div className={viewClass}>

                <div className="container text-right" id="b-dark-mode">
                    <Layout.buttons.DarkModeButton />
                </div>

                <div className={boxClass}>
                    {content}
                </div>

            </div>
        );

    }

}


// Export LogIn.
export default LogIn;
