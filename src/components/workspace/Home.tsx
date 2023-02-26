/**
 * Home View component.
 *
 * It renders the home view in the dashboard.
 */

import React from "react";
import Layout from "../layouts";
import moment from 'moment';

interface IHomeViewProps {
    user: string;
    username: string;
    setStatus: (newStatus: string) => void;
    getCurrentProject: () => string;
    setProject: (proj: string) => void;
    getProjects: () => Promise<string[]>;
    getEntriesByProject: () => Promise<IEntriesDB[]>;
    getEntriesByUser: () => Promise<IEntriesDB[]>;
    createModal: (modal: React.ReactNode, status: string) => void;
    closeModal: () => void;
}

interface IHomeViewState {
    projects: string[];
    entries: IEntriesDB[];
    workedTime: string;
    lastEntry: string;
    entriesProj: IEntriesDB[];
    workedTimeProj: string;
    lastEntryProj: string;
}

/**
 * Class representing the home view in the dashboard.
 * @extends {React.Component}
 */
class HomeView extends
React.Component<IHomeViewProps, IHomeViewState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IHomeViewProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.computeStats = this.computeStats.bind(this);
        this.getStats = this.getStats.bind(this);
        this.projectAction = this.projectAction.bind(this);

        // Set state.
        this.state = {
            projects: [],
            entries: [],
            workedTime: "",
            lastEntry: "",
            entriesProj: [],
            workedTimeProj: "",
            lastEntryProj: "",
        };

        this.getStats();

    }

    /**
     * Compute total time and lat entry.
     * @param entries {IEntriesDB[]} - List of entries for the project or user.
     */
    computeStats(entries: IEntriesDB[])
    : {workedTime: string, lastEntry: string} {

        /** @typedef {string} - Get last entry time. */
        let lastEntry: string = "-";
        if (entries.length > 0) {
            lastEntry = moment(
                entries[0].finalTime
            ).format("YY-MM-DD");
        }

        /** @typedef {number} - Total worked seconds. */
        let totalSec: number = 0;

        entries.forEach((entry, i) => {
            totalSec += (
                entry.elapsedTime.getHours() * 60 * 60 +
                entry.elapsedTime.getMinutes() * 60 +
                entry.elapsedTime.getSeconds()
            );
        });

        return {
            workedTime: (
                "HH:mm:ss".replace(
                    "HH",
                    Math.floor(totalSec / 60 / 60).toString().padStart(2, '0')
                ).replace(
                    "mm",
                    Math.floor(totalSec / 60 % 60).toString().padStart(2, '0')
                ).replace(
                    "ss",
                    Math.floor(totalSec % 60).toString().padStart(2, '0')
                )
            ),
            lastEntry: lastEntry,
        };

    }

    /**
     * Get projects, entries, worked time and time of the last entry.
     */
    async getStats() {

        /** @typedef {string[]} - Get projects list. */
        let projects: string[] = await this.props.getProjects();

        /** @typedef {IEntriesDB[]} - Get entries list. */
        let entriesU: IEntriesDB[] = await this.props.getEntriesByUser();
        let entriesP: IEntriesDB[] = await this.props.getEntriesByProject();

        // Get total time and last entry.
        let statsU = this.computeStats(entriesU);
        let statsP = this.computeStats(entriesP);

        this.setState({
            projects: projects,
            entries: entriesU,
            workedTime: statsU.workedTime,
            lastEntry: statsU.lastEntry,
            entriesProj: entriesP,
            workedTimeProj: statsP.workedTime,
            lastEntryProj: statsP.lastEntry,
        });

    }

    /**
     * Set the project.
     * @param event {any} - Button clicked.
     */
    projectAction(event: any) {
        // Get target.
        let target = event.currentTarget;

        // Set the project name.
        let proj = target.parentNode.parentNode.id;

        if (target.parentNode.classList.contains("open")) {
            // Set project.
            this.props.setProject(proj);
        } else {

            /** @typedef {string} - Set the modal message. */
            let message: string = (
                `Are you sure you want to delete "${proj}" project?`
            );

            this.props.createModal(
                <Layout.modals.DangerModal
                    title="Remove project"
                    message={message}
                    cancel={this.props.closeModal}
                    proceed={() =>{
                        // Delete project.
                        window.ProjectAPI.deleteProject(
                            this.props.username, proj
                        );

                        // Update entries.
                        this.getStats();

                        if (this.props.getCurrentProject() === proj) {

                            this.props.setProject("");

                        }

                        // Close modal.
                        this.props.closeModal();
                    }}
                />, "Deleting project..."
            );

        }

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the HomeView node.
     */
    render(): React.ReactNode {

        /** @typedef {string} - Class for scroll. */
        let scroll: string = (
            "scrollbar overflow-x-scroll scrollbar-h-2 " +
            "overflow-y-scroll scrollbar-w-2 " +
            "scrollbar-thumb-celeste-900 scrollbar-track-rounded-full " +
            "scrollbar-track-celeste-100 scrollbar-thumb-rounded-full "
        );

        /** @typedef {string} - Class for scroll. */
        let projectsClass: string = (
            "grid grid-cols-1 bg-gray-0 dark:bg-gray-1000 rounded-lg p-5 "
        );

        /** @typedef {string} - Class for scroll. */
        let tableBoxClass: string = (
            "grid grid-cols-2 bg-gray-200 dark:bg-gray-800 rounded-lg p-3 "
        );

        /** @typedef {React.ReactNode[]} - List of projects for the user. */
        let projects: React.ReactNode[] = this.state.projects.map(
            (proj: string, i: number) => {
                return (
                    <div
                        id={proj}
                        className="flex border-b p-2"
                        key={i}
                    >

                        <span>{proj}</span>

                        <div className="ml-auto open">
                            <Layout.buttons.SimpleButton
                                size="sm"
                                style="option-1"
                                title="Open."
                                action={this.projectAction}
                            >

                                <img
                                    className={
                                        "lg:w-6 md:w-4 hidden dark:inline"
                                    }
                                    src="icons/folder-open-dark.svg"
                                />

                                <img
                                    className={
                                        "lg:w-6 md:w-4 dark:hidden inline"
                                    }
                                    src="icons/folder-open.svg"
                                />

                            </Layout.buttons.SimpleButton>
                        </div>

                        <div className="ml-2 remove">
                            <Layout.buttons.SimpleButton
                                size="sm"
                                style="danger"
                                title="Remove."
                                action={this.projectAction}
                            >

                                <img
                                    className={
                                        "lg:w-6 md:w-4 hidden dark:inline"
                                    }
                                    src="icons/minus-circle-dark.svg"
                                />

                                <img
                                    className={
                                        "lg:w-6 md:w-4 dark:hidden inline"
                                    }
                                    src="icons/minus-circle.svg"
                                />

                            </Layout.buttons.SimpleButton>
                        </div>

                    </div>

                );
            }
        );

        if (projects.length == 0) {

            let badgeClass : string = (
                "m-auto py-1 px-3 text-xs font-bold rounded-full " +
                "bg-gray-300 dark:bg-gray-700"
            );

            projects = [<div className="flex p-2" key={0}>

                <div className={badgeClass}>
                    You don't have any project.
                </div>

            </div>];
        }

        // Current project stats.
        let currentProj: React.ReactNode, LastEntry: React.ReactNode;

        let proj: string = this.props.getCurrentProject();

        if (proj) {

            currentProj = (
                <div className={tableBoxClass + scroll}>

                    <div className="border-b p-3">
                        Project:
                    </div>
                    <div className="border-b p-3">{proj}</div>

                    <div className="border-b p-3">
                        Entries:
                    </div>
                    <div className="border-b p-3">{
                        this.state.entriesProj.length.toString()
                    }</div>

                    <div className="border-b p-3">
                        Time worked:
                    </div>
                    <div className="border-b p-3">{
                        this.state.workedTimeProj
                    }</div>

                    <div className="border-b p-3">
                        Last entry:
                    </div>
                    <div className="border-b p-3">{
                        this.state.lastEntryProj
                    }</div>

                </div>
            );

        } else {

            currentProj = (
                <div className="flex h-full">

                    <div className="m-auto">
                    <Layout.boxes.BoxBase
                        style="gray"
                        title="No active project"
                        value="Open a project
                        to see more stats"
                    />
                    </div>

                </div>
            );

        }

        if (this.state.entries.length > 0) {

            let lastItem: IEntriesDB = this.state.entries[0];

            LastEntry = (
                <div className={tableBoxClass + scroll}>

                    <div className="border-b p-3">
                        Project:
                    </div>
                    <div className="border-b p-3">{lastItem.name}</div>

                    <div className="border-b p-3">
                        Init time:
                    </div>
                    <div className="border-b p-3">{
                        moment(
                            lastItem.initTime
                        ).format("YYYY-MM-DD HH:mm:ss")
                    }</div>

                    <div className="border-b p-3">
                        Final time:
                    </div>
                    <div className="border-b p-3">{
                        moment(
                            lastItem.finalTime
                        ).format("YYYY-MM-DD HH:mm:ss")
                    }</div>

                    <div className="border-b p-3">
                        Elapsed time:
                    </div>
                    <div className="border-b p-3">{
                        moment(
                            lastItem.elapsedTime
                        ).format("HH:mm:ss")
                    }</div>

                    <div className=" p-3 col-span-2 ">
                        Tasks:
                    </div>
                    <div
                        className={
                            "border-b p-3 col-span-2 whitespace-pre-wrap"
                        }
                    >
                        {lastItem.task}
                    </div>

                </div>
            );

        } else {

            LastEntry = (
                <div className="h-full flex">

                    <div className="m-auto">

                        <div className="m-auto">
                            <Layout.boxes.BoxBase
                                style="gray"
                                title="No entries"
                                value="Create an entry
                                to see more stats"
                            />
                        </div>

                    </div>

                </div>
            );

        }

        // return the node.
        return (
            <div className="h-full p-4 grid grid-rows-2 grid-flow-col gap-5">

                <div className="flex flex-col">
                    <span className="text-2xl font-bold mb-1">
                        Home
                    </span>

                    <span className="text-xl font-bold mb-1">
                        Hi {this.props.user}! here are some of your stats.
                    </span>

                    <div className="grid grid-cols-2 gap-2">

                        <Layout.boxes.StatsBox
                            title="Projects"
                            value={this.state.projects.length.toString()}
                            icon="bag"
                        />

                        <Layout.boxes.StatsBox
                            style="blue"
                            title="Entries"
                            value={this.state.entries.length.toString()}
                            icon="list"
                        />

                        <Layout.boxes.StatsBox
                            title="Time worked"
                            style="yellow"
                            value={this.state.workedTime}
                            icon="clock"
                        />

                        <Layout.boxes.StatsBox
                            style="purple"
                            title="Last entry"
                            value={this.state.lastEntry}
                            icon="history"
                        />

                    </div>

                </div>

                <div className="flex flex-col">
                    <span className="mb-5"> Current project: </span>

                    {currentProj}

                </div>

                <div className="flex flex-col">
                    <span className="mb-5"> Your projects: </span>

                    <div
                        className={projectsClass + scroll}
                    >
                        {projects}
                    </div>

                </div>

                <div className="flex flex-col">
                    <span className="mb-5"> Last entry: </span>

                    {LastEntry}

                </div>

            </div>
        );
    }

}


// Export HomeView.
export default HomeView;
