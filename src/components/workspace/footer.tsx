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
            "h-5 bg-purple-800 text-xs flex text-gray-0 font-semibold"
        );

        /** @typedef {string} - Class for the main div. */
        let statusClass = (
            "h-full flex flex-col px-5"
        );

        return (
            <div className={footerClass}>

                <div className={statusClass}>

                    <div id="Status" className="my-auto">
                        Idle
                    </div>

                </div>

            </div>
        );
    }

}


// Export WorkspaceFooter.
export default WorkspaceFooter;
