/**
 * History View component.
 *
 * It renders the history view in the dashboard.
 */
import React from "react";
import Layout from "../layouts";
import moment from 'moment';

interface IHistoryViewProps {
    getEntriesByProject: () => Promise<IEntriesDB[]>;
    setStatus: (newStatus: string) => void;
    createModal: (modal: React.ReactNode, status: string) => void;
    closeModal: () => void;
}

interface IHistoryViewState {
    tasks: string;
    tasksID?: number;
    editing?: boolean;
    entries: IEntriesDB[];
}


/**
 * Class representing the history view in the dashboard.
 * @extends {React.Component}
 */
class HistoryView extends
React.Component<IHistoryViewProps, IHistoryViewState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IHistoryViewProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.getEntriesByProject = this.getEntriesByProject.bind(this);
        this.showTasks = this.showTasks.bind(this);
        this.editTask = this.editTask.bind(this);
        this.removeEntries = this.removeEntries.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.disableEdit = this.disableEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        // Set state.
        this.state = {
            tasks: "",
            entries: [],
        };

        // Get entries
        this.getEntriesByProject();

    }

    /**
     * Get list of entries.
     */
    async getEntriesByProject() {
        let res = await this.props.getEntriesByProject();
        this.setState({entries: res});
    }

    /**
     * Disable edit buttons and text area..
     */
    enableEdit() {
        // Update status.
        this.props.setStatus("Editing...");

        // Enabled text area.
        $("#tasks-edit textarea").prop('disabled', false);

        // Change edit state.
        this.setState({
            editing: true,
        });
    }

    /**
     * Disable edit buttons and text area..
     */
    disableEdit() {
        // Update status.
        this.props.setStatus("Ready");

        // Disabled text area.
        $("#tasks-edit textarea").prop('disabled', true);

        // Change edit state.
        this.setState({
            editing: false,
        });
    }

    /**
     * Show the tasks of the entry in the tasks box.
     * @param event {any} - Button that was clicked.
     */
    showTasks(event: any) {

        // Get the target.
        let target = event.currentTarget;

        // Get entry ID.
        let entryId: number = target.parentNode.parentNode.id;

        // Get task id.
        let id: number = target.id;

        if (target.parentNode.classList.contains("edit-btn")) {

            this.enableEdit();

        } else {

            this.disableEdit();

        }

        // Show the tasks.
        this.setState({
            tasks: this.state.entries[entryId].task,
            tasksID: id,
        });

    }

    /**
     * Edit task.
     */
    editTask() {

        // Define vals regex.
        const taskRegex = new RegExp("^[\\n ]*$");

        // Check username regex.
        if (taskRegex.test(this.state.tasks)) {
            $("#empty-tasks").removeClass("hidden");
            return;
        } else {
            $("#empty-tasks").addClass("hidden");
        }

        if (this.state.editing) {

            this.props.createModal(
                <Layout.modals.WarningModal
                    title="Editing an item"
                    message="Are you sure you want to edit the entry's task?"
                    cancel={this.props.closeModal}
                    proceed={() =>{
                        // Change item.
                        window.EntriesAPI.editEntryTask(
                            this.state.tasksID,
                            this.state.tasks
                        );

                        // Disable edit.
                        this.disableEdit();

                        // Update entries.
                        this.getEntriesByProject();

                        // Close modal.
                        this.props.closeModal();
                    }}
                />, "Saving edition..."
            );

        }

    }

    /**
     * Remove entries task.
     */
    removeEntries() {

        /** @typedef {number[]} - Get ID checked. */
        let IDs: number[] = [];

        $("input:checkbox[name=entry]:checked").each(
            (i, entry) => {
                IDs.push(+(entry as HTMLInputElement).value);
            }
        );

        if (IDs.length > 0) {

            /** @typedef {string} - Set the message for the modal. */
            let message: string = (
                "Are you sure you want to delete the selected entries?"
            );

            this.props.createModal(
                <Layout.modals.DangerModal
                    title="Remove items"
                    message={message}
                    cancel={this.props.closeModal}
                    proceed={() =>{
                        // Delete entries.
                        window.EntriesAPI.deleteEntries(IDs);

                        // Uncheck all.
                        $("input:checkbox[name=entry]:checked").prop(
                            'checked', false
                        );

                        // Update entries.
                        this.getEntriesByProject();

                        // Close modal.
                        this.props.closeModal();
                    }}
                />, "Deleting entries..."
            );

        }

    }

    /**
     * Update value when changing task input.
     * @param event {any} - Event when changing an input.
     */
    handleInputChange(event: any) {

        // Update state with the new value.
        this.setState({
            tasks: event.target.value
        });

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the HistoryView node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the textarea. */
        let textAreaClass: string = (
            "h-full text-gray-1000 dark:text-gray-1000 rounded-xl p-3 " +
            "bg-gray-100 disabled:bg-gray-300 " +
            "border-4 border-gray-500"
        );

        /** @typedef {string} - Class for the entries of the table. */
        let tableClass: string = (
            "min-w-[40rem] justify-center " +
            "overflow-y-scroll overflow-x-scroll scrollbar-w-2 scrollbar " +
            "scrollbar-h-2 scrollbar-thumb-celeste-900 " +
            "scrollbar-track-celeste-100 scrollbar-thumb-rounded-full " +
            "scrollbar-track-rounded-full grid grid-cols-1 "
        );

        /** @typedef {string} - Class for the rows of the table. */
        let rowClass: string = (
            "grid grid-cols-12 border-b min-w-[50rem] text-center"
        );

        /** @typedef {string} - Warning class. */
        let warnClass: string = (
            "hidden text-vermilion-500 dark:text-vermilion-300 mb-0.5 " +
            "font-bold text-sm ml-3"
        );

        /** @typedef {IEntriesDB[]} - List of entires for the active user. */
        let entries: IEntriesDB[] = this.state.entries;

        // Get options.
        let entriesRows: React.ReactNode[] = entries.map(
            (entry: IEntriesDB, i) => {
                // Convert to strings.
                let initTime: string = moment(
                    entry.initTime
                ).format("YYYY-MM-DD HH:mm:ss");

                let finalTime: string = moment(
                    entry.finalTime
                ).format("YYYY-MM-DD HH:mm:ss");

                let elapsedTime: string = moment(
                    entry.elapsedTime
                ).format("HH:mm:ss");

                return (
                    <div
                        className={rowClass}
                        id={i.toString()}
                        key={i}
                    >
                        <div className="p-2 border-r">
                            <input
                                className="mr-2"
                                type="checkbox"
                                name="entry"
                                value={entry.id.toString()}
                                id={"checkbox-" + entry.id.toString()}
                            />
                            <div className="inline">
                                {i + 1}
                            </div>
                        </div>
                        <div className="p-2 col-span-3 border-r">
                            {initTime}
                        </div>
                        <div className="p-2 col-span-3 border-r">
                            {finalTime}
                        </div>
                        <div className="p-2 col-span-3 border-r">
                            {elapsedTime}
                        </div>
                        <div className="p-2 border-r show-btn">
                            <Layout.buttons.SimpleButton
                                size="sm"
                                style="option-1"
                                title="Show tasks."
                                action={this.showTasks}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/eye-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/eye.svg"
                                />

                            </Layout.buttons.SimpleButton>
                        </div>
                        <div className="p-2 edit-btn">
                            <Layout.buttons.SimpleButton
                                id={entry.id.toString()}
                                size="sm"
                                style="option-6"
                                title="Edit tasks."
                                action={this.showTasks}
                            >

                                <img
                                    className="w-6 disabled:hidden inline"
                                    src="icons/edit.svg"
                                />

                            </Layout.buttons.SimpleButton>
                        </div>
                    </div>
                );
            }
        );

        // return the node.
        return (
            <div className="h-full p-4 grid grid-rows-2 gap-5">

                <form
                    id="entries-table"
                    className="flex flex-col"
                >

                    <div className="mb-5 flex">
                        <div
                            className="text-2xl font-bold mr-auto">
                                History
                        </div>

                        <Layout.buttons.SimpleButton
                            size="md"
                            style="danger"
                            title="Remove selected entries."
                            action={this.removeEntries}
                        >

                            <img
                                className="w-6 inline"
                                src="icons/minus-circle-dark.svg"
                            />

                        </Layout.buttons.SimpleButton>

                    </div>

                    <div id="table-rows" className={tableClass}>

                        <div
                            className={rowClass}
                        >
                            <div className="p-2 border-r">
                                ID
                            </div>
                            <div className="p-2 col-span-3 border-r">
                                Initial Time
                            </div>
                            <div className="p-2 col-span-3 border-r">
                                Final Time
                            </div>
                            <div className="p-2 col-span-3 border-r">
                                Elapsed Time
                            </div>
                            <div className="p-2 border-r">
                                Tasks
                            </div>
                            <div className="p-2">
                                Edit
                            </div>
                        </div>

                        {entriesRows}

                    </div>

                </form>

                <form
                    id="tasks-edit"
                    className="flex flex-col"
                >
                    <div className="mb-5 flex">
                        <div className="mr-auto">
                            Tasks:

                            <span
                                id="empty-tasks"
                                className={warnClass}
                            >
                                Tasks is empty.
                            </span>

                        </div>

                        <Layout.buttons.SimpleButton
                            size="md"
                            style="option-1"
                            title="Save edition."
                            action={this.editTask}
                        >

                            <img
                                className="w-6 hidden dark:inline"
                                src="icons/save-dark.svg"
                            />

                            <img
                                className="w-6 dark:hidden inline"
                                src="icons/save.svg"
                            />

                        </Layout.buttons.SimpleButton>

                        <div className="w-3"></div>

                        <Layout.buttons.SimpleButton
                            size="md"
                            style="danger"
                            title="Cancel edition."
                            action={this.disableEdit}
                        >

                            <img
                                className="w-6 inline"
                                src="icons/times-circle-dark.svg"
                            />

                        </Layout.buttons.SimpleButton>

                    </div>

                    <textarea
                        className={textAreaClass}
                        value={this.state.tasks}
                        onChange={this.handleInputChange}
                        name="tasks"
                        id="tasks"
                        disabled
                    />
                </form>

            </div>

        );
    }

}


// Export HistoryView.
export default HistoryView;
