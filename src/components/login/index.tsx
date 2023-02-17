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
class LogIn extends React.Component<{}, {}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: {}) {

        // Create superior class.
        super(props);

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

        // Return the node.
        return (
            <div className={viewClass}>

                <Layout.buttons.darkModeButton />

                <WelcomeBox />

            </div>
        );

    }

}


// Export LogIn.
export default LogIn;
