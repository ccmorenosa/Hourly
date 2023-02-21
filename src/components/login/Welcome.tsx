/**
 * Welcome box component.
 *
 * It render the welcome box.
 */

import React from "react";
import Layout from "../layouts";

interface IWelcomeBoxProps {
    newUserBtn: React.ReactNode;
}
interface IWelcomeBoxState {
    users: string[]
}


/**
 * Class representing the welcome box.
 * @extends {React.Component}
 */
class WelcomeBox extends
React.Component<IWelcomeBoxProps, IWelcomeBoxState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IWelcomeBoxProps) {

        // Create superior class.
        super(props);

        // Set state.
        this.state = {
            users: []
        };

        // Get the user.
        this.getUsers();

    }

    /**
     * Get list of users in the database and store in the state.
     */
    async getUsers() {
        let res = await window.UserAPI.getUsers();
        this.setState({users: res});
    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the Welcome node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the welcome div. */
        let welcomeClass = (
            "w-full lg:text-5xl md:text-3xl sm:text-xl pb-5 border-b-2 " +
            "border-celeste-900 dark:border-celeste-100"
        );

        /** @typedef {string} - Class for the users band div. */
        let usersBandClass = (
            "overflow-x-scroll flex scrollbar scrollbar-thumb-celeste-900 "+
            "scrollbar-track-celeste-100 scrollbar-h-2 " +
            "scrollbar-thumb-rounded-full scrollbar-track-rounded-full " +
            "mt-10 p-3 justify-center pl-20"
        );

        /** @type {string[]} - Get the user from the state. */
        let users: string[] = this.state.users;

        /** @type {React.ReactNode[]} - List of user tags. */
        let usersNodes: React.ReactNode[] = [];

        // Create the user tags.
        for (let i = 0; i < users.length; i++) {

            usersNodes.push(
                <Layout.buttons.UserButton
                    user={users[i]}
                    style="option-1"
                    key={i}
                />
            );

        }

        // Return the node.
        return (
            <span>
                <h1 className={welcomeClass}>Welcome</h1>

                <div className={usersBandClass}>

                    {usersNodes}

                </div>
                <div className="grid grid-rows-1 gap-10 mt-10">

                    {this.props.newUserBtn}

                </div>

                <div className="grid grid-cols-2 gap-10 mt-10">

                    <Layout.buttons.SimpleButton text="a" style="option-1" />
                    <Layout.buttons.SimpleButton text="b" style="option-1" />

                </div>
            </span>
        );

    }

}


// Export Welcome box.
export default WelcomeBox;
