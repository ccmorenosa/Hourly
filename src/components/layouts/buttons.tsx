/**
 * Buttons components.
 *
 * Set of buttons used recurrently in the application.
 */

import React from "react";


/**
 * Class that represent a dark mode button.
 * @extends {React.Component}
 */
class darkModeButton extends React.Component<{}, {isDark: boolean}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: {}) {

        // Create superior class.
        super(props);

        // Bind button actions.
        this.handleDarkOnClick = this.handleDarkOnClick.bind(this);
        this.handleDarkOffClick = this.handleDarkOffClick.bind(this);

        // Set the state for dark mode.
        this.state = {isDark: true};

    }

    /**
     * Change dark mode state to true.
     */
    handleDarkOnClick(): void {
        this.setState({isDark: true});
    }

    /**
     * Change dark mode state to false.
     */
    handleDarkOffClick(): void {
        this.setState({isDark: false});
    }

    /**
     * Config the characteristics of the button according to theme and render
     * the button.
     * @returns {React.ReactNode} the button node.
     */
    render(): React.ReactNode {

        /** @typedef {boolean} - Dark mode state. */
        const isDark = this.state.isDark;

        /** @typedef {string} - Strings of the classes for the tags. */
        let btnImage: string, btnClass: string;

        /** @typedef {Function} - Button function. */
        let btnAction;

        // Check dark mode state.
        if (isDark) {

            // Config classes and actions for dark mode.
            btnImage = "icons/moon-dark.svg";
            btnClass = "rounded-full bg-gray-900";
            btnAction = this.handleDarkOffClick;

            $("html").addClass("dark");

        } else {

            // Config classes and actions for light mode.
            btnImage = "icons/sun.svg";
            btnClass = "rounded-full bg-gray-200";
            btnAction = this.handleDarkOnClick;

            $("html").removeClass("dark");

        }

        // Return the node.
        return (
            <button className={btnClass} onClick={btnAction}>
                <img className="m-2 w-5" src={btnImage}/>
            </button>
        );

    }
}


/**
 * Class that represent a menu in the LogIn.
 * @extends {React.Component}
 */
class loginMenuButton extends
React.Component<{
    text?: string,
    user?: string,
    children?: any,
}, {
}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(
        props: {
            text: string,
            user: string,
            children: any,
        }
    ) {
        // Create superior class.
        super(props);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the button node.
     */
    render(): React.ReactNode {

        // Check if the component has user prop.
        if (this.props.user) {

            // Return the node for user button.
            return (
                <button className="shrink-0">
                    <img className="lg:w-36 md:w-20 rounded-full p-1 bg-celadon-100 dark:bg-celadon-700 hover:bg-celadon-0 hover:dark:bg-celadon-600 mx-2" src="icons/user.svg" />
                    {this.props.user}
                </button>
            );

        }

        // Return the node for normal button.
        return (
            <button className="p-3 bg-celadon-100 dark:bg-celadon-700 hover:bg-celadon-0 hover:dark:bg-celadon-600 rounded-lg">
                {this.props.text}
                {this.props.children}
            </button>
        );

    }

}


/** @typedef {object} - Group buttons components */
const buttons = {
    darkModeButton: darkModeButton,
    loginMenuButton: loginMenuButton
};

// Export buttons.
export default buttons;
