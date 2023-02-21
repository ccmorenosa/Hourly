/**
 * Header component.
 *
 * It renders the header of the workspace.
 */
import React from "react";
import buttons from "../layouts/buttons";


/**
 * Class representing the header of the workspace.
 * @extends {React.Component}
 */
class WorkspaceHeader extends React.Component<{}, {}> {

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
     * @returns {React.ReactNode} the WorkspaceHeader node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let headerClass = (
            "text-lg h-12 flex font-semibold " +
            "bg-celeste-400 dark:bg-celeste-800"
        );

        /** @typedef {string} - Class for the main div. */
        let itemsClass = (
            "h-full flex flex-col px-5"
        );

        return (
            <div className={headerClass}>

                <div className={itemsClass}>

                    <div className="my-auto">
                        Welcome | No project currently opened

                    </div>

                </div>

                <div className={itemsClass}>

                    <div className="my-auto grid grid-cols-2 gap-2">
                        <div>
                            <buttons.SimpleButton
                                size="sm" style="option-1"
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/folder-open-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/folder-open.svg"
                                />

                            </buttons.SimpleButton>
                        </div>

                        <div>
                            <buttons.SimpleButton
                                size="sm" style="option-2"
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/plus-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/plus.svg"
                                />

                            </buttons.SimpleButton>
                        </div>
                    </div>

                </div>

                <div className={itemsClass + " ml-auto"}>

                    <div className="my-auto grid grid-cols-1">
                        <buttons.DarkModeButton />
                    </div>

                </div>

            </div>
        );
    }

}


// Export WorkspaceHeader.
export default WorkspaceHeader;
