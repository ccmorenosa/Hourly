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
    handleLogOut: () => void;
    handleNewEntry: (
        initTime: string, finalTime: string, elapsedTime: string, task: string
    ) => void;
    checkProject: () => Promise<boolean>;
    getEntries: () => Promise<IEntriesDB[]>;
    setStatus: (newStatus: string) => void;
}

interface IWorkspaceDashboardState {
    view: "home" | "newEntry" | "history" | "report" | "settings" ;
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
        this.setView = this.setView.bind(this);

        // Set state.
        this.state = {
            view: "home",

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
                />
            ),

            report: <></>,
            settings: <></>,
        };

    }

    /**
     * Set dash to new entry view.
     * @param event {any} - Button that was clicked.
     */
    async setView(event: any): Promise<void> {

        // Check that a project is opened
        if (event.target.id == "home" || await this.props.checkProject()) {

            this.setState({
                view: event.target.id,
            });

            this.render();

        }

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

        // Return the node.
        return (
            <div className={dashClass}>

                <div className={
                    "w-52 bg-gray-300 dark:bg-gray-800 flex flex-col"
                }>

                    <Layout.buttons.SidebarButton
                        text="Home" icon="home"
                        id="home"
                        action={this.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="New entry" icon="stopwatch"
                        id="newEntry"
                        action={this.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="History" icon="history"
                        id="history"
                        action={this.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="Report" icon="file"
                        id="report"
                        action={this.setView}
                    />

                    <Layout.buttons.SidebarButton
                        text="Settings" icon="setting"
                        id="settings"
                        action={this.setView}
                    />

                    <div className="mt-auto"></div>

                    <Layout.buttons.SidebarButton
                        text="Logout" icon="logout"
                        style="danger" action={this.props.handleLogOut}
                    />

                </div>

                <div className="w-full">

                    {this.state[this.state.view]}

                </div>

            </div>
        );
    }

}


// Export WorkspaceDashboard.
export default WorkspaceDashboard;
