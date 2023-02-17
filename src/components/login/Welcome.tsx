/**
 * Welcome box component.
 *
 * It render the welcome box.
 */

import React from "react";
import Layout from "../layouts";


/**
 * Class representing the welcome box.
 * @extends {React.Component}
 */
class WelcomeBox extends React.Component<{}, {}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: {}) {

        // Create superior class.
        super(props);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the LogIn node.
     */
    render(): React.ReactNode {


        /** @typedef {string} - Class for the main div. */
        let boxClass = (
            "bg-celadon-500 dark:bg-celeste-1000 mx-auto w-1/3 " +
            "rounded-lg text-center p-10 h-5/6 flex flex-col"
        );

        /** @typedef {string} - Class for the welcome div. */
        let welcomeClass = (
            "w-full lg:text-5xl md:text-3xl sm:text-xl pb-5 border-b-2 " +
            "border-celeste-900 dark:border-celeste-100"
        );

        /** @typedef {string} - Class for the users band div. */
        let usersBandClass = (
            "overflow-x-scroll flex scrollbar scrollbar-thumb-celadon-700 "+
            "scrollbar-track-celadon-100 scrollbar-h-2 " +
            "scrollbar-thumb-rounded-full scrollbar-track-rounded-full " +
            "mt-10 p-3 h-36 justify-center"
        );


        // Return the node.
        return (
            <div className={boxClass}>

                <h1 className={welcomeClass}>Welcome</h1>

                <div className={usersBandClass}>

                    <div className="container text-right" id="b-dark-mode">
                        <Layout.buttons.loginMenuButton isUser={true} />
                    </div>

                </div>
                <div className="grid grid-rows-1 gap-10 mt-10">

                    <Layout.buttons.loginMenuButton text="New Profile" />

                </div>

                <div className="grid grid-cols-2 gap-10 mt-10">

                    <Layout.buttons.loginMenuButton text="a" />
                    <Layout.buttons.loginMenuButton text="b" />

                </div>

            </div>
        );

    }

}


// Export Welcome box.
export default WelcomeBox;
