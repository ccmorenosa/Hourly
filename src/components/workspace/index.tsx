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

interface IWorkSpaceState {
    warningZ: string;
    opacity: string;
    modal?: React.ReactNode;
}


/**
 * Class representing the Workspace component.
 * @extends {React.Component}
 */
class Workspace extends React.Component<IWorkSpaceProps, IWorkSpaceState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IWorkSpaceProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.handleLogOut = this.handleLogOut.bind(this);
        this.closeModal = this.closeModal.bind(this);

        // Set state.
        this.state = {
            warningZ: "z-0",
            opacity: "opacity-100",
            modal: <></>,
        };

    }

    /**
     * Show warning if logout button is clicked.
     */
    handleLogOut() {
       this.setState({
            warningZ: "z-[2]",
            opacity: "opacity-80",
            modal: (
                <Layout.modals.DangerModal
                    title="Caution"
                    message={"Are you sure you want to logout."}
                    cancel={this.closeModal}
                    proceed={this.props.handleLogOut}
                />
            ),
        });

        this.render();
    }

    /**
     * Close the modal box.
     */
    closeModal() {
       this.setState({
            warningZ: "z-0",
            opacity: "opacity-100",
            modal: <></>,
        });

        this.render();
    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the Workspace node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let viewClass: string = (
            "h-screen w-screen flex flex-col justify-center " +
            "text-gray-1000 dark:text-celeste-100 z-[1] fixed " +
            this.state.opacity
        );

        /** @typedef {string} - Class for the warning main div. */
        let warningClass: string = (
            this.state.warningZ + " h-screen w-screen flex fixed inset-0 " +
            "text-gray-1000 dark:text-celeste-100 font-bold "
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

                    {this.state.modal}

                </div>

            </div>

        );

    }

}


// Export Workspace.
export default Workspace;
