/**
 * Workspace component.
 *
 * It renders the workspace pages where the user works in their project.
 */

import React from "react";
import WorkspaceDashboard from "./dashboard";
import Layout from "../layouts";


/**
 * Class representing the Workspace component.
 * @extends {React.Component}
 */
class Workspace extends React.Component<{}, {}> {

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
     * @returns {React.ReactNode} the Workspace node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let viewClass = (
            "h-screen flex flex-col justify-center " +
            "text-gray-1000 dark:text-celeste-0"
        );

        // Return the node.
        return (
            <div className={viewClass}>

                <Layout.Header />
                <WorkspaceDashboard />
                <Layout.Footer />

            </div>
        );

    }

}


// Export Workspace.
export default Workspace;
