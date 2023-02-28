/**
 * History View component.
 *
 * It renders the history view in the dashboard.
 */
import React from "react";
import Layout from "../layouts";
import moment from 'moment';

interface IHistoryViewProps {
    getEntriesByProject: (query?: IEntryQuery) => Promise<IEntriesDB[]>;
    setStatus: (newStatus: string) => void;
    createModal: (modal: React.ReactNode, status: string) => void;
    closeModal: () => void;
}

interface IHistoryViewState {
    tasks: string;
    tasksID?: number;
    editing?: boolean;
    entries: IEntriesDB[];
    fav: boolean;
    from: string;
    to: string;
    minElapsed: string[];
    maxElapsed: string[];
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
        this.favorite = this.favorite.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.check = this.check.bind(this);
        this.showTasks = this.showTasks.bind(this);
        this.editTask = this.editTask.bind(this);
        this.removeEntries = this.removeEntries.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.disableEdit = this.disableEdit.bind(this);
        this.search = this.search.bind(this);
        this.reset = this.reset.bind(this);
        this.handleFavChange = this.handleFavChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);

        // Set state.
        this.state = {
            tasks: "",
            entries: [],
            fav: false,
            from: "",
            to: "",
            minElapsed: ["", "", ""],
            maxElapsed: ["", "", ""],
        };

        // Get entries
        this.getEntriesByProject();

    }

    /**
     * Get list of entries.
     */
    async getEntriesByProject() {
        let res = await this.props.getEntriesByProject();
        this.setState({
            entries: res,
            from: moment(res[res.length - 1].initTime).format("YYYY-MM-DD"),
            to: moment(res[0].finalTime).format("YYYY-MM-DD"),
        });
    }

    /**
     * Set check to true/false for all the checkbox
     * @param event {any} - The favorite button.
     */
    favorite(event: any) {
        // Get current button.
        let btn = event.currentTarget;

        /** @typedef {number} - Index and id of the entry */
        let entryIndex = btn.parentNode.parentNode.id;
        let entryID = this.state.entries[entryIndex].id;

        if (btn.id == ("fav-" + entryIndex.toString())) {

            // Activate fav.
            window.EntriesAPI.changeFav(entryID, 1);

            $("#fav-" + entryIndex.toString()).addClass("hidden");
            $("#fav-active-" + entryIndex.toString()).removeClass("hidden");

        } else {

            // Deactivate fav.
            window.EntriesAPI.changeFav(entryID, 0);

            $("#fav-" + entryIndex.toString()).removeClass("hidden");
            $("#fav-active-" + entryIndex.toString()).addClass("hidden");

        }

    }

    /**
     * Set check to true/false for all the checkbox.
     * @param event {any} - The general checkbox change event.
     */
    checkAll(event: any) {

        if (event.currentTarget.checked) {

            // Check all.
            $("input:checkbox[name=entry]").prop(
                'checked', true
            );

        } else {

            // Uncheck all.
            $("input:checkbox[name=entry]").prop(
                'checked', false
            );

        }

    }

    /**
     * Set check to true/false the general checkbox.
     * @param event {any} - The list checkbox change event.
     */
    check() {

        if (
            $("input:checkbox[name=entry]").length ==
            $("input:checkbox[name=entry]:checked").length
        ) {

            // Check general.
            $("input:checkbox[name=entry-all]").prop(
                'checked', true
            );

        } else {

            // Uncheck general.
            $("input:checkbox[name=entry-all]").prop(
                'checked', false
            );

        }

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

        if (target.id) {

            this.enableEdit();

        } else {

            this.disableEdit();

        }

        $("#dashboard").animate(
            {scrollTop: $("#tasks-edit").offset().top},
            500
        );

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

                        // Uncheck general.
                        $("input:checkbox[name=entry-all]").prop(
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
     * Apply the filters to query the entries.
     */
    async search() {
        /** @typedef {IHistoryViewState} - Actual state. */
        let state: IHistoryViewState = this.state;


        for (let i = 0; i < 3; i++) {
            if (state.maxElapsed[i].length == 0)
            state.maxElapsed[i] = i == 0 ? "23" : "59";

            state.minElapsed[i].padStart(2, "0");
            state.maxElapsed[i].padStart(2, "0");
        }

        /** @typedef {IEntryQuery} - Query instance. */
        let query: IEntryQuery = {
            fav: state.fav ? [1] : [0, 1],
            from: state.from + " 00:00:00",
            to: state.to + " 23:59:59",
            minElapsed: "2000-01-01 " + state.minElapsed.join(":"),
            maxElapsed: "2000-01-01 " + state.maxElapsed.join(":"),
        };

        // Make the query.
        let res = await this.props.getEntriesByProject(query);
        this.setState({
            entries: res,
        });

    }

    /**
     * Reset the filters to the entries.
     */
    async reset() {
        // Reset the entries list.
        await this.getEntriesByProject();
        this.setState({
            fav: false,
            minElapsed: ["", "", ""],
            maxElapsed: ["", "", ""],
        });

        $("#fav-filter").removeClass("hidden");
        $("#fav-active-filter").addClass("hidden");

    }

    /**
     * Update value when changing fav button.
     * @param event {any} - Event when changing an input.
     */
    handleFavChange(event: any) {

        // Get target button.
        let btn = event.currentTarget;

        if (btn.id == ("fav-filter")) {

            // Activate fav.
            this.setState({
                fav: true,
            });

            $("#fav-filter").addClass("hidden");
            $("#fav-active-filter").removeClass("hidden");

        } else {

            // Deactivate fav.
            this.setState({
                fav: false,
            });

            $("#fav-filter").removeClass("hidden");
            $("#fav-active-filter").addClass("hidden");

        }

    }

    /**
     * Update value when changing a date input.
     * @param event {any} - Event when changing an input.
     */
    handleDateChange(event: any) {

        // Get target.
        let target = event.target;

        /** @typedef {string} - New value. */
        let value: string = target.value;


        // Update state with the new value.
        this.setState({
            [target.name]: value
        } as Pick<IHistoryViewState, keyof IHistoryViewState>);

    }

    /**
     * Update value when changing a date input.
     * @param event {any} - Event when changing an input.
     */
    handleTimeChange(event: any) {

        // Get target.
        let target = event.target;

        /** @typedef {string} - New value. */
        let value: string = target.value;

        switch (true) {
            case /^(00\d|\d\d\d)$/g.test(value):
                value = value[2];
                break;

            case /^0\d\d$/g.test(value):
                value = value[1] + value[2];
                break;

            case /^00\d$/g.test(value):
                value = value[2];
                break;

            default:
                break;

        }

        /** @typedef {string[]} - Get actual string. */
        let timeValue: string[] = this.state[
            target.name as "minElapsed" | "maxElapsed"
        ];

        switch (target.id) {
            case target.name + "Hour":
                timeValue[0] = parseInt(value) < 24 ? value : "";
                if (timeValue[0].length == 2)
                $("#" + target.name + "Minute").trigger("focus");
                break;

            case target.name + "Minute":
                timeValue[1] = parseInt(value) < 60 ? value : ""
                if (timeValue[1].length == 2)
                $("#" + target.name + "Second").trigger("focus");
                break;

            case target.name + "Second":
                timeValue[2] = parseInt(value) < 60 ? value : ""
                if (timeValue[2].length == 2)
                $("#search").trigger("focus");
                break;

        }

        this.setState({
            [target.name]: timeValue,
        } as Pick<IHistoryViewState, keyof IHistoryViewState>);

    }

    /**
     * Update value when changing task input.
     * @param event {any} - Event when changing an input.
     */
    handleTextAreaChange(event: any) {

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
            "h-72 text-gray-1000 dark:text-gray-1000 rounded-xl p-3 " +
            "bg-gray-100 disabled:bg-gray-300 " +
            "border-4 border-gray-500 mb-5 "
        );

        /** @typedef {string} - Class for the input tags. */
        let inputClass = (
            "h-4/5 form-input px-3 rounded-full " +
            "bg-celeste-100 dark:bg-celadon-100 text-gray-1000 "
        );

        /** @typedef {string} - Class for the entries of the table. */
        let tableClass: string = (
            "h-72 justify-center " +
            "overflow-y-scroll overflow-x-scroll scrollbar-w-2 scrollbar " +
            "scrollbar-h-2 scrollbar-thumb-celeste-900 " +
            "scrollbar-track-celeste-100 scrollbar-thumb-rounded-full " +
            "scrollbar-track-rounded-full grid grid-cols-1 "
        );

        /** @typedef {string} - Class for the rows of the table. */
        let rowClass: string = (
            "grid grid-cols-10 border-b text-center "
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

                // Set fav button display.
                let fav: string = "", favActive: string = "hidden";

                if (entry.fav == 1) {
                    fav = "hidden", favActive = "";
                }

                return (
                    <div
                        className={rowClass}
                        id={i.toString()}
                        key={entry.id}
                    >

                        <div className="p-2 border-r">
                            <input
                                className="mr-2"
                                type="checkbox"
                                name="entry"
                                value={entry.id.toString()}
                                onChange={this.check}
                                id={"checkbox-" + entry.id.toString()}
                            />
                        </div>

                        <div className="p-2 border-r">

                            <Layout.buttons.SimpleButton
                                id={"fav-" + i.toString()}
                                className={fav}
                                size="sm"
                                style="fav"
                                title=""
                                action={this.favorite}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/favorite-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/favorite.svg"
                                />

                            </Layout.buttons.SimpleButton>

                            <Layout.buttons.SimpleButton
                                id={"fav-active-" + i.toString()}
                                className={favActive}
                                size="sm"
                                style="fav"
                                title=""
                                action={this.favorite}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/favorite-active-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/favorite-active.svg"
                                />

                            </Layout.buttons.SimpleButton>

                        </div>

                        <div className="p-2 border-r">
                            <div className="inline">
                                {i + 1}
                            </div>
                        </div>

                        <div className="p-2 col-span-2 border-r">
                            {initTime}
                        </div>

                        <div className="p-2 col-span-2 border-r">
                            {finalTime}
                        </div>

                        <div className="p-2 col-span-2 border-r">
                            {elapsedTime}
                        </div>

                        <div className={
                            "p-2 border-r show-btn grid grid-cols-2 gap-2"
                        }>
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

        if (entriesRows.length == 0) {

            let badgeClass : string = (
                "m-auto py-1 px-3 text-xs font-bold rounded-full " +
                "bg-gray-300 dark:bg-gray-700"
            );

            entriesRows = [<div className="flex p-2" key={0}>

                <div className={badgeClass}>
                    No entry was found.
                </div>

            </div>];
        }

        // return the node.
        return (
            <div className="h-full min-w-[65rem] p-4 grid grid-cols-1 gap-5">

                <form
                    id="entries-table"
                    className="flex flex-col"
                >

                    <div className="mb-5 flex">
                        <div className="text-2xl font-bold mr-3 my-auto">
                                History
                        </div>

                        <Layout.buttons.SimpleButton
                            size="md"
                            className="ml-auto"
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

                    <div>
                        filters:

                        <Layout.buttons.SimpleButton
                            id="reset"
                            className="ml-3"
                            size="sm"
                            style="option-1"
                            text="Reset filters"
                            action={this.reset}
                        />

                    </div>

                    <div className={
                        "mb-5 grid grid-cols-10 gap-3 text-center"
                    }>

                        <div>Fav:</div>

                        <div className="col-span-2">From:</div>
                        <div className="col-span-2">To:</div>
                        <div className="col-span-2">Min duration:</div>
                        <div className="col-span-2">Max duration:</div>

                        <div>Search</div>

                        <div>

                            <Layout.buttons.SimpleButton
                                id="fav-filter"
                                className=""
                                size="sm"
                                style="fav"
                                title=""
                                action={this.handleFavChange}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/favorite-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/favorite.svg"
                                />

                            </Layout.buttons.SimpleButton>

                            <Layout.buttons.SimpleButton
                                id="fav-active-filter"
                                className="hidden"
                                size="sm"
                                style="fav"
                                title=""
                                action={this.handleFavChange}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/favorite-active-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/favorite-active.svg"
                                />

                            </Layout.buttons.SimpleButton>

                        </div>

                        <input
                            type="date"
                            name="from"
                            max={this.state.to}
                            value={this.state.from}
                            onChange={this.handleDateChange}
                            className={inputClass + " col-span-2"}
                        />

                        <input
                            type="date"
                            name="to"
                            min={this.state.from}
                            value={this.state.to}
                            onChange={this.handleDateChange}
                            className={inputClass + " col-span-2"}
                        />

                        <div className="grid grid-cols-11 col-span-2 gap-0">

                            <input
                                type="number"
                                id="minElapsedHour"
                                name="minElapsed"
                                min={0}
                                max={23}
                                value={this.state.minElapsed[0]}
                                placeholder="hh"
                                onChange={this.handleTimeChange}
                                onFocus={(event : any) => {
                                    event.currentTarget.select();
                                }}
                                className={inputClass + " col-span-3"}
                            />

                            <div className="m-0 p-0">:</div>

                            <input
                                type="number"
                                id="minElapsedMinute"
                                name="minElapsed"
                                min={0}
                                max={59}
                                value={this.state.minElapsed[1]}
                                placeholder="mm"
                                onChange={this.handleTimeChange}
                                onFocus={(event : any) => {
                                    event.currentTarget.select();
                                }}
                                className={inputClass + " col-span-3"}
                            />

                            <div className="m-0 p-0">:</div>

                            <input
                                type="number"
                                id="minElapsedSecond"
                                name="minElapsed"
                                min={0}
                                max={59}
                                value={this.state.minElapsed[2]}
                                placeholder="ss"
                                onChange={this.handleTimeChange}
                                onFocus={(event : any) => {
                                    event.currentTarget.select();
                                }}
                                className={inputClass + " col-span-3"}
                            />

                        </div>

                        <div className="grid grid-cols-11 col-span-2 gap-0">

                            <input
                                type="number"
                                id="maxElapsedHour"
                                name="maxElapsed"
                                min={0}
                                max={23}
                                value={this.state.maxElapsed[0]}
                                placeholder="hh"
                                onChange={this.handleTimeChange}
                                onFocus={(event : any) => {
                                    event.currentTarget.select();
                                }}
                                className={inputClass + " col-span-3"}
                            />

                            <div className="m-0 p-0">:</div>

                            <input
                                type="number"
                                id="maxElapsedMinute"
                                name="maxElapsed"
                                min={0}
                                max={59}
                                value={this.state.maxElapsed[1]}
                                placeholder="mm"
                                onChange={this.handleTimeChange}
                                onFocus={(event : any) => {
                                    event.currentTarget.select();
                                }}
                                className={inputClass + " col-span-3"}
                            />

                            <div className="m-0 p-0">:</div>

                            <input
                                type="number"
                                id="maxElapsedSecond"
                                name="maxElapsed"
                                min={0}
                                max={59}
                                value={this.state.maxElapsed[2]}
                                placeholder="ss"
                                onChange={this.handleTimeChange}
                                onFocus={(event : any) => {
                                    event.currentTarget.select();
                                }}
                                className={inputClass + " col-span-3"}
                            />

                        </div>

                        <div>

                            <Layout.buttons.SimpleButton
                                id="search"
                                className=""
                                size="md"
                                style="option-1"
                                title=""
                                action={this.search}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/search-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/search.svg"
                                />

                            </Layout.buttons.SimpleButton>

                        </div>

                    </div>

                    <div id="table-rows" className={tableClass}>

                        <div
                            className={rowClass}
                        >

                            <div className="p-2 border-r">
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    name="entry-all"
                                    id="checkbox-all"
                                    onChange={this.checkAll}
                                />
                            </div>

                            <div className="p-2 border-r">
                                Favorite
                            </div>

                            <div className="p-2 border-r">
                                ID
                            </div>

                            <div className="p-2 col-span-2 border-r">
                                Initial Time
                            </div>

                            <div className="p-2 col-span-2 border-r">
                                Final Time
                            </div>

                            <div className="p-2 col-span-2 border-r">
                                Elapsed Time
                            </div>

                            <div className="p-2 border-r">
                                Options
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
                        onChange={this.handleTextAreaChange}
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
