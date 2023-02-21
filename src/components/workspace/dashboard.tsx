/**
 * Dashboard component.
 *
 * It renders the dashboard of the workspace.
 */
import React from "react";


/**
 * Class representing the dashboard of the workspace.
 * @extends {React.Component}
 */
class WorkspaceDashboard extends React.Component<{}, {}> {

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
     * @returns {React.ReactNode} the WorkspaceDashboard node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let headerClass = (
            "h-full text-lg flex bg-gray-100 dark:bg-gray-900 "
        );

        return (
            <div className={headerClass}>

                <div className="w-52 bg-gray-300 dark:bg-gray-800">

                </div>

            </div>
        );
    }

}


// Export WorkspaceDashboard.
export default WorkspaceDashboard;
