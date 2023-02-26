/**
 * New Entry View component.
 *
 * It renders the new entry view in the dashboard.
 */
import React from "react";
import Layout from "../layouts";
import moment from 'moment';

interface INewEntryViewProps {
    handleNewEntry: (
        initTime: string, finalTime: string, elapsedTime: string, task: string,
        fav: 0 | 1
    ) => void;
    setStatus: (newStatus: string) => void;
    createModal: (modal: React.ReactNode, status: string) => void;
    closeModal: () => void;
}

interface INewEntryViewState {
    initDateNum: number;
    initTime: string;
    finalTime: string;
    elapsedTime: string;
    update: number;
    tasks: string;
    fav: 0 | 1;
}


/**
 * Class representing the new entry view in the dashboard.
 * @extends {React.Component}
 */
class NewEntryView extends
React.Component<INewEntryViewProps, INewEntryViewState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: INewEntryViewProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.favorite = this.favorite.bind(this);
        this.getElapsedTime = this.getElapsedTime.bind(this);
        this.initStopwatch = this.initStopwatch.bind(this);
        this.pauseStopwatch = this.pauseStopwatch.bind(this);
        this.stopStopwatch = this.stopStopwatch.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.updateStopwatch = this.updateStopwatch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);

        // Set state.
        this.state = {
            initDateNum: -1,
            initTime: "",
            finalTime: "",
            elapsedTime: "",
            update: -1,
            tasks: "",
            fav: 0,
        };

    }

    /**
     * Set check to true/false for all the checkbox
     * @param event {any} - The favorite button.
     */
    favorite(event: any) {
        // Get current button.
        let btn = event.currentTarget;

        if (btn.id == ("fav")) {

            // Activate fav. Update state.
            this.setState({
                fav: 1,
            });

            $("#fav").addClass("hidden");
            $("#fav-active").removeClass("hidden");

        } else {

            // Deactivate fav. Update state.
            this.setState({
                fav: 0,
            });

            $("#fav").removeClass("hidden");
            $("#fav-active").addClass("hidden");

        }

    }

    /**
     * Get the difference between initial an final time.
     * @param finalTime {number} - Final date in milliseconds.
     */
    getElapsedTime(finalTime: number) {

        // Get time elapsed.
        let diff: number = finalTime - this.state.initDateNum;

        return (
            "HH:mm:ss".replace(
                "HH",
                Math.floor(diff / 1000 / 60 / 60).toString().padStart(2, '0')
            ).replace(
                "mm",
                Math.floor(diff / 1000 / 60 % 60).toString().padStart(2, '0')
            ).replace(
                "ss",
                Math.floor(diff / 1000 % 60).toString().padStart(2, '0')
            )
        );

    }

    /**
     * Initiate stopwatch.
     */
    initStopwatch() {

        // Hide success.
        $("#success").addClass("hidden");

        // Update status.
        this.props.setStatus("Working...");

        // Get actual time.
        let actual: number = Date.now();

        if (this.state.initDateNum > 0 && this.state.update == -1) {

            // Update state.
            this.setState({
                finalTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                elapsedTime: this.getElapsedTime(actual),
                // Set the interval to update the stopwatch.
                update: window.setInterval(this.updateStopwatch, 10),
            });

        } else if (this.state.update == -1) {

            // Update state.
            this.setState({
                initDateNum: actual,
                initTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                finalTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                elapsedTime: "00:00:00",
                // Set the interval to update the stopwatch.
                update: window.setInterval(this.updateStopwatch, 10),
            });

        }

    }

    /**
     * Pause stopwatch.
     */
    pauseStopwatch() {

        // Update status.
        this.props.setStatus("Paused...");

        // Clear interval that updates the stopwatch.
        clearInterval(this.state.update);

        // Update state.
        this.setState({
            // Reset the interval to update the stopwatch.
            update: -1,
        });


    }

    /**
     * Stop stopwatch.
     */
    stopStopwatch() {

        // Update status.
        this.props.setStatus("Ready");

        // Clear interval that updates the stopwatch.
        clearInterval(this.state.update);

        // Update state.
        this.setState({
            initDateNum: -1,
            initTime: "",
            finalTime: "",
            elapsedTime: "",
            // Reset the interval to update the stopwatch.
            update: -1,
        });

    }

    /**
     * Reset the stopwatch and the tasks.
     */
    resetForm() {

        // Update status.
        this.props.setStatus("Ready");

        // Update state.
        this.setState({
            initDateNum: -1,
            initTime: "",
            finalTime: "",
            elapsedTime: "",
            tasks: "",
            fav: 0,
        });

        $("#fav").removeClass("hidden");
        $("#fav-active").addClass("hidden");

    }

    /**
     * Update final time and elapsed time stopwatch.
     */
    updateStopwatch() {

        // Get actual time.
        let actual: number = Date.now();

        // Update state.
        this.setState({
            finalTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            elapsedTime: this.getElapsedTime(actual),
        });

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
     * Validate the inputs.
     * @param event {any} - Event when submitting the form.
     */
    validate(event: any): void {
        event.preventDefault();

        // Block buttons.
        $("#new-entry-form button").prop('disabled', true);

        // Hide success.
        $("#success").addClass("hidden");

        /** @typedef {INewEntryViewState} - Value of the input tags. */
        let values: INewEntryViewState = this.state;

        // Define vals regex.
        const taskRegex = new RegExp("^[\\n ]+$");

        /** @typedef {boolean} - Flag indicating state of the form */
        let is_valid: boolean = true;

        // Check username regex.
        if (taskRegex.test(values.tasks)) {
            is_valid = false;
            $("#empty-tasks").removeClass("hidden");
        } else {
            $("#empty-tasks").addClass("hidden");
        }

        // Check username regex.
        if (values.initDateNum == -1) {
            is_valid = false;
            $("#empty-time").removeClass("hidden");
        } else {
            $("#empty-time").addClass("hidden");
        }

        // Check username regex.
        if (values.update != -1) {
            is_valid = false;
            $("#not-stopped").removeClass("hidden");
        } else {
            $("#not-stopped").addClass("hidden");
        }

        // Check if the form is valid.
        if (is_valid) {

            this.props.handleNewEntry(
                values.initTime,
                values.finalTime,
                "2000-01-01 " + values.elapsedTime,
                values.tasks,
                values.fav
            );

            // Show success and reset form.
            $("#success").removeClass("hidden");

            this.props.createModal(
                <Layout.modals.SuccessModal
                    title="Entry saved"
                    message="The entry has been saved successfully!"
                    proceed={this.props.closeModal}
                />, "Ready."
            );

            this.resetForm();

        }

        // Activate buttons.
        $("#new-entry-form button").prop('disabled', false);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the NewEntryView node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the textarea. */
        let textAreaClass: string = (
            "h-full text-gray-1000 dark:text-gray-1000 rounded-xl p-3"
        );

        /** @typedef {string} - Class for the textarea. */
        let timeInputsClass: string = (
            "w-full rounded-2xl py-5 bg-gray-300 dark:bg-gray-700 flex"
        );

        /** @typedef {string} - Class for the input tags. */
        let inputClass = (
            "form-input px-4 rounded-full select-none " +
            "bg-gray-100 dark:bg-gray-300 text-gray-1000 w-56"
        );

        /** @typedef {string} - Warning class. */
        let warnClass: string = (
            "hidden text-vermilion-500 dark:text-vermilion-300 mb-0.5 " +
            "font-bold text-sm"
        );

        /** @typedef {string} - Success class. */
        let successClass: string = (
            "hidden text-celadon-1000 dark:text-celadon-300 mb-0.5 " +
            "font-bold text-sm"
        );

        console.log(this.state.fav);

        // return the node.
        return (
            <form
                id="new-entry-form"
                className="h-full p-4"
                onSubmit={this.validate}
            >

                <div className="h-full grid grid-rows-2 gap-5">

                    <div className="flex flex-col">

                        <div className="mb-2 text-2xl font-bold" >
                            New Entry
                        </div>

                        <div
                            id="buttons-menu"
                            className="grid grid-cols-10 gap-2 mb-5"
                        >

                            <Layout.buttons.SimpleButton
                                id="fav"
                                className={!this.state.fav ? "" : "hidden"}
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
                                id="fav-active"
                                className={!this.state.fav ? "hidden" : ""}
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

                            <Layout.buttons.SimpleButton
                                size="sm" style="option-4"
                                title="Start stopwatch."
                                action={this.initStopwatch}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/play-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/play.svg"
                                />

                            </Layout.buttons.SimpleButton>

                            <Layout.buttons.SimpleButton
                                size="sm" style="option-4"
                                title="Pause stopwatch."
                                action={this.pauseStopwatch}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/pause-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/pause.svg"
                                />

                            </Layout.buttons.SimpleButton>

                            <Layout.buttons.SimpleButton
                                size="sm" style="danger"
                                title="Stop stopwatch."
                                action={this.stopStopwatch}
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/square-shape-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/square-shape.svg"
                                />

                            </Layout.buttons.SimpleButton>

                            <Layout.buttons.SimpleButton
                                size="sm" style="option-1"
                                title="Save entry."
                                type="submit"
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

                        </div>

                        <div className="flex flex-col">

                            <span
                                id="empty-time"
                                className={warnClass}
                            >
                                Stopwatch haven't being started.
                            </span>

                            <span
                                id="not-stopped"
                                className={warnClass}
                            >
                                Stopwatch still running.
                            </span>

                            <span
                                id="empty-tasks"
                                className={warnClass}
                            >
                                Tasks is empty.
                            </span>

                            <span
                                id="success"
                                className={successClass}
                            >
                                Saved!
                            </span>

                        </div>

                        <div className={timeInputsClass}>

                            <div id="input-init-time" className="mx-auto">
                                <div className="pb-2 text-left w-full flex">
                                    Initial time:
                                </div>

                                <input
                                    value={this.state.initTime}
                                    type="text"
                                    className={inputClass}
                                    name="initTime"
                                    disabled
                                />
                            </div>

                            <div id="input-final-time" className="mx-auto">
                                <div className="pb-2 text-left w-full flex">
                                    Final time:
                                </div>

                                <input
                                    value={this.state.finalTime}
                                    type="text"
                                    className={inputClass}
                                    name="finalTime"
                                    disabled
                                />
                            </div>

                            <div id="input-elapsed-time" className="mx-auto">
                                <div className="pb-2 text-left w-full flex">
                                    Elapsed time:
                                </div>

                                <input
                                    value={this.state.elapsedTime}
                                    type="text"
                                    className={inputClass}
                                    name="elapsedTime"
                                    disabled
                                />
                            </div>


                        </div>

                    </div>

                    <div className="flex flex-col">
                        <div className="mb-5">Tasks: </div>

                        <textarea
                            className={textAreaClass}
                            value={this.state.tasks}
                            onChange={this.handleInputChange}
                            name="tasks"
                            id="tasks"
                            cols={80}
                            placeholder="Describe what did you did."
                            required
                        />
                    </div>

                </div>

            </form>
        );
    }

}


// Export NewEntryView.
export default NewEntryView;
