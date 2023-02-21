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
        return (
            <div className="h-5 bg-celeste-500">

            </div>
        );
    }

}


// Export WorkspaceFooter.
export default WorkspaceFooter;
