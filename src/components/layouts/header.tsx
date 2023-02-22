/**
 * Header component.
 *
 * It renders the header of the workspace.
 */
import React from "react";
import Layout from ".";

interface IHeaderProps {
    user: string;
    username: string;
    project: string;
    newProject: () => any;
    openProject: () => any;
}


/**
 * Class representing the header of the workspace.
 * @extends {React.Component}
 */
class Header extends React.Component<IHeaderProps, {}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IHeaderProps) {

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
        let itemsClass = "h-full flex flex-col px-2";

        /** @typedef {string} - Project name. */
        let activeProject: string = (
            this.props.project ?
            ("Working on '" + this.props.project + "' project") :
            "No project currently opened"
        );

        return (
            <div className={headerClass}>

                <div className={itemsClass}>

                    <div className="my-auto">
                        <span className="md:hidden lg:inline">
                            Welcome {this.props.user} | {activeProject}
                        </span>
                        <span className="md:inline lg:hidden">
                            {this.props.project}
                        </span>
                    </div>

                </div>

                <div className={itemsClass}>

                    <div className="my-auto grid grid-cols-2 gap-1">
                        <div className="col-auto">
                            <Layout.buttons.SimpleButton
                                size="sm" style="option-4"
                                action={this.props.newProject}
                            >

                                New project

                                <img
                                    className="w-4 ml-2 hidden dark:inline"
                                    src="icons/plus-dark.svg"
                                />

                                <img
                                    className="w-4 ml-2 dark:hidden inline"
                                    src="icons/plus.svg"
                                />

                            </Layout.buttons.SimpleButton>
                        </div>

                        <div className="col-auto">
                            <Layout.buttons.SimpleButton
                                size="sm" style="option-1"
                                action={this.props.openProject}
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
