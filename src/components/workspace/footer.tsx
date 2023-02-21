/**
 * Footer component.
 *
 * It renders the footer of the workspace.
 */
import React from "react";


/**
 * Class representing the footer of the workspace.
 * @extends {React.Component}
 */
class WorkspaceFooter extends React.Component<{}, {}> {

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
     * @returns {React.ReactNode} the WorkspaceFooter node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let footerClass = (
            "h-5 bg-purple-500 text-xs flex"
        );

        return (
            <div className={footerClass}>

            </div>
        );
    }

}


// Export WorkspaceFooter.
export default WorkspaceFooter;
