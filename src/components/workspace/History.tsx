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

        /** @typedef {string} - Class for the entries table. */
        let tableClass: string = (
            "md:h-[26.5rem] lg:h-[27rem] justify-center my-auto " +
            "overflow-y-scroll overflow-x-scroll scrollbar-w-2" +
            "scrollbar-h-2 scrollbar scrollbar-thumb-celeste-900 " +
            "scrollbar-track-celeste-100 scrollbar-thumb-rounded-full " +
            "scrollbar-track-rounded-full "
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
                        className="flex border-b w-[36rem] text-center"
                        key={i}
                    >
                        <div className="px-2 border-r w-12">
                            {entry.id}
                        </div>
                        <div className="px-2 border-r">{initTime}</div>
                        <div className="px-2 border-r">{finalTime}</div>
                        <div className="px-2">{elapsedTime}</div>
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

                        <div className={tableClass}>

                            {entriesRows}

                        </div>

                    </div>

                    <div className="flex flex-col">
                        <div className="mb-5">Tasks: </div>

                        <textarea
                            className={textAreaClass}
                            value={this.state.tasks}
                            name="tasks"
                            id="tasks"
                            cols={80}
                            disabled
                        />
                    </div>

                </div>

            </div>
        );
    }

}


// Export HistoryView.
export default HistoryView;
