/**
 * Dashboard component.
 *
 * It renders the dashboard of the workspace.
 */
import React from "react";
import Layout from "../layouts";
import NewEntryView from "./NewEntry";

interface IWorkspaceDashboardProps {
    handleLogOut: () => void;
}

interface IWorkspaceDashboardState {
    view: string;
}


/**
 * Class representing the dashboard of the workspace.
 * @extends {React.Component}
 */
class WorkspaceDashboard extends
React.Component<IWorkspaceDashboardProps, IWorkspaceDashboardState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IWorkspaceDashboardProps) {

        // Create superior class.
        super(props);

        // Set state.
        this.state = {
            view: "newEntry"
        };

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

        // Return the node.
        return (
            <div className={headerClass}>

                <div className={
                    "w-52 bg-gray-300 dark:bg-gray-800 flex flex-col"
                }>

                    <Layout.buttons.SidebarButton
                        text="Home" icon="home"
                    />

                    <Layout.buttons.SidebarButton
                        text="New entry" icon="stopwatch"
                    />

                    <Layout.buttons.SidebarButton
                        text="History" icon="history"
                    />

                    <Layout.buttons.SidebarButton
                        text="Print" icon="print"
                    />

                    <Layout.buttons.SidebarButton
                        text="Settings" icon="setting"
                    />

                    <div className="mt-auto"></div>

                    <Layout.buttons.SidebarButton
                        text="Logout" icon="logout" style="danger"
                        action={this.props.handleLogOut}
                    />

                </div>

                <div className="w-full">
                    <NewEntryView />
                </div>

            </div>
        );
    }

}


// Export WorkspaceDashboard.
export default WorkspaceDashboard;
