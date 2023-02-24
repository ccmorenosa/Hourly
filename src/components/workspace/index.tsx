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
    username: string;
}

interface IWorkSpaceState {
    warningZ: string;
    opacity: string;
    project?: string;
    status?: string;
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
        this.createModal = this.createModal.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleNewProject = this.handleNewProject.bind(this);
        this.handleOpenProject = this.handleOpenProject.bind(this);
        this.handleNewEntry = this.handleNewEntry.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.checkProject = this.checkProject.bind(this);
        this.setProject = this.setProject.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.createProject = this.createProject.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.getEntries = this.getEntries.bind(this);

        // Set state.
        this.state = {
            warningZ: "z-0",
            opacity: "opacity-100",
            status: "Ready",
            modal: <></>,
        };

    }

    /**
     * Show a custom modal.
     * @param modal {React.ReactNode} - Modal to be shown.
     * @param status {string} - Status of the footer.
     */
    createModal(modal: React.ReactNode, status: string) {
       this.setState({
            warningZ: "z-[2]",
            opacity: "opacity-80",
            status: status,
            modal: modal,
        });
    }

    /**
     * Show warning if logout button is clicked.
     */
    handleLogOut() {
       this.setState({
            warningZ: "z-[2]",
            opacity: "opacity-80",
            status: "Logging out",
            modal: (
                <Layout.modals.DangerModal
                    title="Caution"
                    message={"Are you sure you want to logout?"}
                    cancel={this.closeModal}
                    proceed={this.props.handleLogOut}
                />
            ),
        });

        this.render();
    }

    /**
     * Show modal to create a new project.
     */
    handleNewProject() {
        /** @typedef {string} - Class for the input tags. */
        let inputClass = (
            "w-full form-input px-4 py-3 rounded-full " +
            "bg-celeste-100 dark:bg-celadon-300 text-gray-1000"
        );

       this.setState({
            warningZ: "z-[2]",
            opacity: "opacity-80",
            status: "Creating a new project",
            modal: (
                <Layout.modals.FormModal
                    title="Create new project"
                    invalid="Project already exists."
                    inputs={[
                        <div id="input-name" key="0">
                            <div className="mb-2 text-left w-full flex">
                                Project Name:
                            </div>

                            <input
                                type="text" className={inputClass}
                                name="name"
                                required
                            />
                        </div>,
                    ]}
                    cancel={this.closeModal}
                    proceed={this.createProject}
                />
            ),
        });

        this.render();
    }

    /**
     * Show warning if logout button is clicked.
     */
    async handleOpenProject() {
        /** @typedef {string} - Class for the input tags. */
        let inputClass = (
            "w-full form-input px-4 py-3 rounded-full " +
            "bg-celeste-100 dark:bg-celadon-300 text-gray-1000"
        );

        /** @typedef {string[]} - List of projects for the active user. */
        let projects: string[] = await this.getProjects();

        // Get options.
        let projectsOptions: React.ReactNode[] = projects.map((proj, i) => {
            return <option value={proj} key={i}>{proj}</option>
        });

        this.setState({
            warningZ: "z-[2]",
            opacity: "opacity-80",
            status: "Opening project",
            modal: (
                <Layout.modals.FormModal
                    title="Open project"
                    invalid="Project already exists."
                    inputs={[
                        <div id="input-name" key="0">
                            <div className="mb-2 text-left w-full flex">
                                Select project:
                            </div>

                            <select
                                name="project" id="project"
                                className={inputClass} required
                            >
                                {projectsOptions}
                            </select>
                        </div>,
                    ]}
                    cancel={this.closeModal}
                    proceed={
                        async (event: {value: string}[]): Promise<boolean> => {

                            // Set project.
                            this.setProject(event[0].value);

                            // Close modal.
                            this.closeModal();

                            return true;

                        }
                    }
                />
            ),
        });

        this.render();
    }

    /**
     * Create a new entry if arguments are ok.
     * @param initTime {string} - Initial time of the entry.
     * @param finalTime {string} - Final time of the entry.
     * @param elapsedTime {string} - Elapsed time of the entry.
     * @param task {string} - Task done on the entry.
     */
    handleNewEntry(
        initTime: string, finalTime: string, elapsedTime: string, task: string
    ) {

        // Check that a project is selected.
        if (!this.state.project) {

            this.handleOpenProject();
            return;

        }

        // Create new entry.
        window.EntriesAPI.createEntry(
            initTime, finalTime, elapsedTime, task, this.state.project
        );

    }

    /**
     * Close the modal box.
     */
    closeModal() {
       this.setState({
            warningZ: "z-0",
            opacity: "opacity-100",
            status: "Ready",
            modal: <></>,
        });

        this.render();
    }

    /**
     * Check that a project is opened.
     */
    async checkProject(): Promise<boolean> {
        // Check if a project if opened.
        if (!this.state.project) {

            // Check if any project exists.
            if ((await this.getProjects()).length > 0) {
                this.handleOpenProject();
            } else {
                this.handleNewProject();
            }

            return false;
        } else {
            return true;
        }
    }

    /**
     * Set the project.
     * @param proj {string} - Project name.
     */
    setProject(proj: string) {
        // Set project.
        this.setState({
            project: proj,
        });
    }

    /**
     * Set the status.
     * @param newStatus {string} - Status.
     */
    setStatus(newStatus: string) {
        // Set project.
        this.setState({
            status: newStatus,
        });

        this.render();
    }

    /**
     * Create a new project in the database.
     */
    async createProject(event: {value: string}[]): Promise<boolean> {

        // Check if the project does not exists.
        if (
            event[0].value != "" &&
            !(await this.getProjects()).includes(event[0].value)
        ) {

            // Create project.
            window.ProjectAPI.createProject(
                this.props.username, event[0].value
            );

            // Set project.
            this.setProject(event[0].value);

            // Close modal.
            this.closeModal();

            return true;

        } else {
            return false;
        }

    }

    /**
     * Get the projects stores in the database.
     */
    async getProjects(): Promise<string[]> {

        return await window.ProjectAPI.getProjects(this.props.username);

    }

    /**
     * Get list of entries.
     */
    async getEntries(): Promise<IEntriesDB[]> {
        return await window.EntriesAPI.getEntries(this.state.project);
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


                    <Layout.Header
                        user={this.props.user}
                        username={this.props.username}
                        project={this.state.project}
                        newProject={this.handleNewProject}
                        openProject={this.handleOpenProject}
                        />

                    <WorkspaceDashboard
                        handleLogOut={this.handleLogOut}
                        handleNewEntry={this.handleNewEntry}
                        checkProject={this.checkProject}
                        getEntries={this.getEntries}
                        setStatus={this.setStatus}
                        createModal={this.createModal}
                        closeModal={this.closeModal}
                    />

                    <Layout.Footer
                        username={this.props.username}
                        project={this.state.project}
                        status={this.state.status}
                    />

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
