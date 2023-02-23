/**
 * History View component.
 *
 * It renders the history view in the dashboard.
 */
import React from "react";
import Layout from "../layouts";
import moment from 'moment';

interface IHistoryViewProps {
    getEntries: () => Promise<IEntriesDB[]>;
    setStatus: (newStatus: string) => void;
    project: string;
}

interface IHistoryViewState {
    tasks: string;
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
        this.getEntries = this.getEntries.bind(this);

        // Set state.
        this.state = {
            tasks: "",
            entries: [],
        };

        // Get entries
        this.getEntries();

    }

    /**
     * Get list of entries.
     */
    async getEntries() {
        let res = await this.props.getEntries();
        this.setState({entries: res});
    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the HistoryView node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the textarea. */
        let textAreaClass: string = (
            "h-full text-gray-1000 dark:text-gray-1000 rounded-xl p-3 " +
            "bg-gray-100 border-4 border-gray-500"
        );

        /** @typedef {string} - Class for the entries of the table. */
        let tableClass: string = (
            "md:h-[26.5rem] lg:h-[27rem] justify-center mb-auto  scrollbar " +
            "overflow-y-scroll overflow-x-scroll scrollbar-w-2 " +
            "scrollbar-h-2 scrollbar-thumb-celeste-900 " +
            "scrollbar-track-celeste-100 scrollbar-thumb-rounded-full " +
            "scrollbar-track-rounded-full grid grid-cols-1 "
        );

        /** @typedef {string} - Class for the rows of the table. */
        let rowClass: string = (
            "grid grid-cols-12 border-b w-[48rem] text-center"
        );

        /** @typedef {string[]} - List of projects for the active user. */
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
                        id={entry.id.toString()}
                        key={i}
                    >
                        <div className="p-2 border-x">
                            {entry.id}
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
                        <div className="p-2 border-r">
                            <Layout.buttons.SimpleButton
                                size="sm"
                                type="submit"
                                style="option-1"
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
                        <div className="p-2">
                            <Layout.buttons.SimpleButton
                                size="sm"
                                type="submit"
                                style="option-6"
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
            <div className="h-full p-4">

                <div className="h-full grid grid-cols-2 gap-5">

                    <div className="flex flex-col">

                        <div className="mb-5 text-2xl font-bold">
                            History
                        </div>

                        <div id="table-rows" className={tableClass}>

                            <div
                                className={rowClass}
                            >
                                <div className="p-2 border-x">
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

                    </div>

                    <form className="flex flex-col">
                        <div className="mb-5 flex">
                            <div className="mr-auto">Tasks:</div>

                            <Layout.buttons.SimpleButton
                                size="md"
                                type="submit"
                                style="option-1"
                                disabled
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
                                disabled
                            >

                                <img
                                    className="w-6 hidden dark:inline"
                                    src="icons/times-circle-dark.svg"
                                />

                                <img
                                    className="w-6 dark:hidden inline"
                                    src="icons/times-circle.svg"
                                />

                            </Layout.buttons.SimpleButton>

                        </div>

                        <textarea
                            className={textAreaClass}
                            value={this.state.tasks}
                            name="tasks"
                            id="tasks"
                            cols={80}
                            disabled
                        />
                    </form>

                </div>

            </div>
        );
    }

}


// Export HistoryView.
export default HistoryView;
