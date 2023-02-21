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
    style?: string,
    type?: "submit" | "button" | "reset",
    children?: any,
    action?: () => any
}, {
    btnStyle: string
}> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(
        props: {
            text: string,
            user: string,
            style: string,
            type: "submit" | "button" | "reset",
            children: any,
            action: () => any
        }
    ) {
        // Create superior class.
        super(props);

        /** @typedef {string} - Button color and style. */
        let btnStyle: string = "";

        // Set button style.
        switch (this.props.style) {
            case "success":
                btnStyle = (
                    "bg-celadon-100 dark:bg-celadon-700 " +
                    "hover:bg-celadon-0 hover:dark:bg-celadon-600 "
                );
                break;

            case "danger":
                btnStyle = (
                    "bg-vermilion-500 hover:bg-vermilion-400 text-celeste-100 "
                );
                break;

            default:
                btnStyle = (
                    "bg-celadon-100 dark:bg-celadon-700 hover:bg-celadon-0 " +
                    "hover:dark:bg-celadon-600 "
                );
                break;
        }

        // Set state.
        this.state = {
            btnStyle: btnStyle
        };

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the button node.
     */
    render(): React.ReactNode {
        /** @type {"submit" | "button" | "reset"} - Type of the button. */
        let type: "submit" | "button" | "reset" = this.props.type;

        // Check type value.
        if (!type) {
            type = "button";
        }

        /** @type {string} - Class for the button. */
        let btnClass: string = this.state.btnStyle;

        // Check if the component has user prop.
        if (this.props.user) {

            // Update the button (image) style.
            /** @type {string} - Class for the image in the button. */
            btnClass += "lg:w-36 md:w-20 rounded-full p-1 mx-2";

            // Return the node for user button.
            return (
                <button
                    className="shrink-0"
                    onClick={this.props.action}
                    type={type}
                >
                    <img className={btnClass} src="icons/user.svg" />
                    {this.props.user}
                </button>
            );

        }

        // Update the button style.
        btnClass += "p-3 rounded-lg";

        // Return the node for normal button.
        return (
            <button
                className={btnClass}
                onClick={this.props.action}
                type={type}>
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
