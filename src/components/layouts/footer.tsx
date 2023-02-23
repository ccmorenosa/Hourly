/**
 * Footer component.
 *
 * It renders the footer of the workspace.
 */
import React from "react";

interface IFooterProps {
    status: string;
    username: string;
    project: string;
}


/**
 * Class representing the footer of the workspace.
 * @extends {React.Component}
 */
class Footer extends React.Component<IFooterProps, {}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IFooterProps) {

        // Create superior class.
        super(props);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the Footer node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let footerClass = (
            "h-7 w-full text-xs flex flex-col text-gray-0 px-5 " +
            "font-semibold bg-purple-800"
        );

        // return the node.
        return (
            <div className={footerClass}>

                    <div
                        id="Status"
                        className="my-auto"
                    >
                        <span
                            className="border-r border-purple-400 pr-3"
                        >
                            Hourly
                        </span>

                        <span
                            className="border-r border-purple-400 pr-3"
                        >

                            <img
                                className="w-4 mx-2 hidden dark:inline"
                                src="icons/user-dark.svg"
                            />

                            <img
                                className="w-4 mx-2 dark:hidden inline"
                                src="icons/user.svg"
                            />

                            {this.props.username}

                        </span>

                        <span
                            className="border-r border-purple-400 pr-3"
                        >

                            <img
                                className="w-4 mx-2 hidden dark:inline"
                                src="icons/bag-dark.svg"
                            />

                            <img
                                className="w-4 mx-2 dark:hidden inline"
                                src="icons/bag.svg"
                            />

                            {this.props.project}

                        </span>

                        <span
                            className="border-purple-400 pr-3"
                        >

                            <img
                                className="w-4 mx-2 hidden dark:inline"
                                src="icons/check-circle-dark.svg"
                            />

                            <img
                                className="w-4 mx-2 dark:hidden inline"
                                src="icons/check-circle.svg"
                            />

                            {this.props.status}

                        </span>

                    </div>

            </div>
        );
    }

}


// Export Footer.
export default Footer;
