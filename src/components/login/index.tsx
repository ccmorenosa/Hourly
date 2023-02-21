/**
 * Main file of the login component.
 *
 * It renders the login pages when the application starts.
 */

import React from "react";
import WelcomeBox from "./Welcome";
import NewUserForm from "./NewUserForm";
import Layout from "../layouts";

interface ILogInState {
    content: React.ReactNode;
}


/**
 * Class representing the LogIn component.
 * @extends {React.Component}
 */
class LogIn extends React.Component<{}, ILogInState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: {}) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.welcomeBox = this.welcomeBox.bind(this);
        this.newUserForm = this.newUserForm.bind(this);

        // Set state.
        this.state = {
            content: (
                <WelcomeBox
                    newUserBtn={
                        < Layout.buttons.SimpleButton
                            text="New Profile" style="option-1"
                            action={this.newUserForm}
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
            content: (
                <WelcomeBox
                    newUserBtn={
                        < Layout.buttons.SimpleButton
                            text="New Profile" style="option-1"
                            action={this.newUserForm}
                        />
                    }
                />
            )
        });

    }

    /**
     * Set content view to new user form.
     */
    newUserForm(): void {

        this.setState({
            content: (
                <NewUserForm
                    cancelBtn={
                        <Layout.buttons.SimpleButton
                            text="Cancel" style="danger"
                            action={this.welcomeBox}
                        />
                    }
                />
            )
        });

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the LogIn node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let viewClass = (
            "h-screen flex flex-col justify-center bg-gray-300 " +
            "dark:bg-purple-600 text-gray-1000 dark:text-celeste-100"
        );

        /** @typedef {string} - Class for the box div. */
        let boxClass = (
            "bg-purple-500 dark:bg-purple-900 mx-auto w-1/3 " +
            "rounded-lg text-center p-10 sm:p-5 h-5/6 flex flex-col"
        );

        /** @typedef {React.ReactNode} - Box in the login view. */
        let content = this.state.content;

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
