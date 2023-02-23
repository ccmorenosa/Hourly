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
    handleNewEntry: (
        initTime: string, finalTime: string, elapsedTime: string, task: string
    ) => void;
    setStatus: (newStatus: string) => void;
}

interface IWorkspaceDashboardState {
    view: "home" | "newEntry" | "history" | "print" | "settings" ;
    home: React.ReactNode;
    newEntry: React.ReactNode;
    history: React.ReactNode;
    print: React.ReactNode;
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
            view: "newEntry",
            home: <></>,
            newEntry: (
                <NewEntryView
                    setStatus={this.props.setStatus}
                    handleNewEntry={this.props.handleNewEntry}
                />
            ),
            history: <></>,
            print: <></>,
            settings: <></>,
        };

    }

    /**
     * Set dash to new entry view.
     * @param event {any} - Button that was clicked.
     */
    setView(event: any): void {

        this.setState({
            view: event.target.id,
        });

        this.render();

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
                        text="Print" icon="print"
                        id="print"
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
