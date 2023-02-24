/**
 * Dashboard component.
 *
 * It renders the dashboard of the workspace.
 */
import React from "react";
import Layout from "../layouts";
import NewEntryView from "./NewEntry";
import HistoryView from "./History";

interface IWorkspaceDashboardProps {
    getView: () => "home" | "newEntry" | "history" | "report" | "settings" ;
    handleLogOut: () => void;
    handleNewEntry: (
        initTime: string, finalTime: string, elapsedTime: string, task: string
    ) => void;
    setView: (event: any) => Promise<void>;
    getEntries: () => Promise<IEntriesDB[]>;
    setStatus: (newStatus: string) => void;
    createModal: (modal: React.ReactNode, status: string) => void;
    closeModal: () => void;
}

interface IWorkspaceDashboardState {
    home: React.ReactNode;
    newEntry: React.ReactNode;
    history: React.ReactNode;
    report: React.ReactNode;
    settings: React.ReactNode;
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

        // Bind actions.
        // this.func = this.func.bind(this);

        // Set state.
        this.state = {
            home: <></>,

            newEntry: (
                <NewEntryView
                    setStatus={this.props.setStatus}
                    handleNewEntry={this.props.handleNewEntry}
                />
            ),

            history: (
                <HistoryView
                    setStatus={this.props.setStatus}
                    getEntries={this.props.getEntries}
                    createModal={this.props.createModal}
                    closeModal={this.props.closeModal}
                />
            ),

            report: <></>,
            settings: <></>,
        };

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the WorkspaceDashboard node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the main div. */
        let dashClass = (
            "h-full text-lg flex bg-gray-100 dark:bg-gray-900 " +
            "scrollbar overflow-x-scroll scrollbar-h-2 " +
            "overflow-y-scroll scrollbar-w-2 " +
            "scrollbar-thumb-celeste-900 scrollbar-track-rounded-full " +
            "scrollbar-track-celeste-100 scrollbar-thumb-rounded-full "
        );

        /**
         * @typedef {"home" | "newEntry" | "history" | "report" | "settings"}
         * Active view. */
        let view = this.props.getView();

        // Active status buttons.
        let isActive = {
            home: "inactive",
            newEntry: "inactive",
            history: "inactive",
            report: "inactive",
            settings: "inactive",
        }

        isActive[view] = "active";

        // Return the node.
        return (
            <div className={dashClass}>

                <div className={
                    "w-52 bg-gray-300 dark:bg-gray-800 flex flex-col"
                }>

                    <Layout.buttons.SidebarButton
                        text="Home" icon="home"
                        id="home"
                        style={isActive["home"]}
                        action={this.props.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="New entry" icon="stopwatch"
                        id="newEntry"
                        style={isActive["newEntry"]}
                        action={this.props.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="History" icon="history"
                        id="history"
                        style={isActive["history"]}
                        action={this.props.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="Report" icon="file"
                        id="report"
                        style={isActive["report"]}
                        action={this.props.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="Settings" icon="setting"
                        id="settings"
                        style={isActive["settings"]}
                        action={this.props.setView}
                    />

                    <div className="mt-auto"></div>

                    <Layout.buttons.SidebarButton
                        text="Logout" icon="logout"
                        style="danger" action={this.props.handleLogOut}
                    />

                </div>

                <div className="w-full">

                    {this.state[view]}

                </div>

            </div>
        );
    }

}


// Export WorkspaceDashboard.
export default WorkspaceDashboard;
