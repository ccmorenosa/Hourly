/**
 * Main file of the login component.
 *
 * It renders the login pages when the application starts.
 */

import React from "react";
import WelcomeBox from "./Welcome";
import Layout from "../layouts";


/**
 * Class representing the LogIn component.
 * @extends {React.Component}
 */
class LogIn extends React.Component<{}, {content: React.ReactNode | null}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: {}) {

        // Create superior class.
        super(props);

        // Set state.
        this.state = {
            content: <WelcomeBox
                newUserBtn={
                    < Layout.buttons.loginMenuButton text="New Profile"
                        action={this.newUserForm}
                    />
                }
            />
        };

        // Bind actions.
        this.displayWelcomeBox = this.displayWelcomeBox.bind(this);

    }

    /**
     * Set content state to welcome box.
     */
    displayWelcomeBox(): void {

        this.setState({
            content: (
                <WelcomeBox
                    newUserBtn={
                        < Layout.buttons.loginMenuButton text="New Profile"
                            action={this.newUserForm}
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
            "h-screen flex flex-col justify-center bg-celeste-100 " +
            "dark:bg-celeste-900 text-celeste-900 dark:text-celeste-100"
        );

        /** @typedef {React.ReactNode} - Box in the login view. */
        let content = this.state.content;

        // Return the node.
        return (
            <div className={viewClass}>

                <div className="container text-right" id="b-dark-mode">
                    <Layout.buttons.darkModeButton />
                </div>

                {content}

            </div>
        );

    }

}


// Export LogIn.
export default LogIn;
