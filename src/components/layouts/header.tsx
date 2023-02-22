/**
 * Header component.
 *
 * It renders the header of the workspace.
 */
import React from "react";
import Layout from ".";


/**
 * Class representing the header of the workspace.
 * @extends {React.Component}
 */
class Header extends React.Component<{}, {}> {

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
     * @returns {React.ReactNode} the Header node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let headerClass = (
            "text-lg h-12 flex font-semibold " +
            "bg-purple-400 dark:bg-purple-900"
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
                            <Layout.buttons.SimpleButton
                                size="sm" style="option-4"
                            >

                                New project

                                <img
                                    className="w-4 mx-2 hidden dark:inline"
                                    src="icons/plus-dark.svg"
                                />

                                <img
                                    className="w-4 mx-2 dark:hidden inline"
                                    src="icons/plus.svg"
                                />

                            </Layout.buttons.SimpleButton>
                        </div>

                        <div>
                            <Layout.buttons.SimpleButton
                                size="sm" style="option-1"
                            >

                                Open project

                                <img
                                    className="w-4 mx-2 hidden dark:inline"
                                    src="icons/folder-open-dark.svg"
                                />

                                <img
                                    className="w-4 mx-2 dark:hidden inline"
                                    src="icons/folder-open.svg"
                                />

                            </Layout.buttons.SimpleButton>
                        </div>
                    </div>

                </div>

                <div className={itemsClass + " ml-auto"}>

                    <div className="my-auto grid grid-cols-1">
                        <Layout.buttons.DarkModeButton />
                    </div>

                </div>

            </div>
        );
    }

}


// Export Header.
export default Header;
