/**
 * Workspace component.
 *
 * It renders the workspace pages where the user works in their project.
 */

import React from "react";
import WorkspaceDashboard from "./dashboard";
import Layout from "../layouts";

interface IWorkSpaceProps {
    handleLogOut: () => void;
    user: string;
}

interface IWorkSpaceSate {
    warningZ: string;
    opacity: string;
}


/**
 * Class representing the Workspace component.
 * @extends {React.Component}
 */
class Workspace extends React.Component<IWorkSpaceProps, IWorkSpaceSate> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IWorkSpaceProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.handleLogOut = this.handleLogOut.bind(this);
        this.cancelLogOut = this.cancelLogOut.bind(this);

        // Set state.
        this.state = {
            warningZ: "z-0",
            opacity: "opacity-100",
        }

    }

    /**
     * Show warning if logout button is clicked.
     */
    handleLogOut() {
       this.setState({
            warningZ: "z-[2]",
            opacity: "opacity-80",
        });

        this.render();
    }

    /**
     * Cancel logout.
     */
    cancelLogOut() {
       this.setState({
            warningZ: "z-0",
            opacity: "opacity-100",
        });

        this.render();
    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the Workspace node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let viewClass = (
            "h-screen w-screen flex flex-col justify-center " +
            "text-gray-1000 dark:text-celeste-100 z-[1] fixed " +
            this.state.opacity
        );

        /** @typedef {string} - Class for the warning main div. */
        let warningClass = (
            this.state.warningZ + " h-screen w-screen flex fixed inset-0 " +
            "text-gray-1000 dark:text-celeste-100 font-bold "
        );

        /** @typedef {string} - Class for the warning main div. */
        let warningBoxClass = (
            "bg-gray-200 m-auto rounded-2xl py-5 px-16 " +
            "flex flex-col text-center"
        );

        // Return the node.
        return (
            <div>

                <div className={viewClass}>


                    <Layout.Header user={this.props.user}/>
                    <WorkspaceDashboard
                        handleLogOut={this.handleLogOut}
                    />
                    <Layout.Footer />

                </div>

                <div className={warningClass}>

                    <div className={warningBoxClass}>
                        <div className={
                                "my-5 mx-auto p-2 bg-vermilion-500 " +
                                "text-lg rounded-lg text-gray-0"
                            }>
                            <img
                                className="w-7 inline mx-2"
                                src="icons/exclamation-octagon-dark.svg"
                            />
                            Warning
                            <img
                                className="w-7 inline mx-2"
                                src="icons/exclamation-octagon-dark.svg"
                            />
                        </div>

                        <div className={
                            "my-5 dark:text-gray-1000 text-celeste-100"
                        }>
                            Are you sure you want to logout.
                        </div>



                        <div className="grid grid-cols-2 gap-10 mt-10">

                            <Layout.buttons.SimpleButton
                                text="cancel" style="option-4"
                                action={this.cancelLogOut}
                                />
                            <Layout.buttons.SimpleButton
                                text="Ok!" style="danger"
                                action={this.props.handleLogOut}
                            />

                        </div>


                    </div>

                    <div className="w-7"></div>

                </div>

            </div>

        );

    }

}


// Export Workspace.
export default Workspace;
