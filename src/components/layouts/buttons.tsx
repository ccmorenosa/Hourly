/**
 * Buttons components.
 *
 * Set of buttons used recurrently in the application.
 */

import React from "react";

interface IDarkModeButtonProps {
}

interface IDarkModeButtonState {
    isDark: boolean;
}


/**
 * Class that represent a dark mode button.
 * @extends {React.Component}
 */
class DarkModeButton extends
React.Component<IDarkModeButtonProps, IDarkModeButtonState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IDarkModeButtonProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.handleDarkOnClick = this.handleDarkOnClick.bind(this);
        this.handleDarkOffClick = this.handleDarkOffClick.bind(this);

        // Set state.
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

        /** @typedef {string} - Classes for the button. */
        let btnClass: string;

        /** @typedef {string} - Path of the image. */
        let btnImage: string;

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
            btnClass = "rounded-full bg-gray-100";
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


interface IBaseButtonProps {
    text?: string;
    style?: string;
    type?: "submit" | "button" | "reset";
    size?: "sm" | "md" | "lg" | "";
    children?: any;
    action?: () => any;
}

interface IBaseButtonState {
    btnStyle: string;
}


/**
 * Class that represent a base for the buttons.
 * @extends {React.Component}
 */
class BaseButton
<PROPS extends IBaseButtonProps, STATE extends IBaseButtonState> extends
React.Component<PROPS, STATE> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: PROPS) {

        // Create superior class.
        super(props);

        /** @typedef {string} - Button color and style. */
        let btnStyle: string = "";

        // Set button style.
        switch (this.props.style) {
            case "success":
                btnStyle = (
                    "bg-celadon-100 dark:bg-celadon-700 " +
                    "enabled:hover:bg-celadon-0 " +
                    "enabled:hover:dark:bg-celadon-600 " +
                    "disabled:bg-celadon-0 disabled:dark:bg-celadon-500 "
                );
                break;

            case "option-1":
                btnStyle = (
                    "bg-celeste-300 dark:bg-celeste-700 " +
                    "enabled:hover:bg-celeste-200 " +
                    "enabled:hover:dark:bg-celeste-600 " +
                    "disabled:bg-celeste-0 disabled:dark:bg-celeste-500 "
                );
                break;

            case "option-2":
                btnStyle = (
                    "bg-celeste-100 dark:bg-celeste-1000 " +
                    "enabled:hover:bg-celeste-0 " +
                    "enabled:hover:dark:bg-celeste-900 " +
                    "disabled:bg-celeste-0 disabled:dark:bg-celeste-500 "
                );
                break;

            case "option-3":
                btnStyle = (
                    "bg-celadon-100 dark:bg-celadon-1000 " +
                    "enabled:hover:bg-celadon-0 " +
                    "enabled:hover:dark:bg-celadon-900 " +
                    "disabled:bg-celadon-0 disabled:dark:bg-celadon-500 "
                );
                break;

            case "option-4":
                btnStyle = (
                    "bg-celadon-300 dark:bg-celadon-700 " +
                    "enabled:hover:bg-celadon-200 " +
                    "enabled:hover:dark:bg-celadon-600 " +
                    "disabled:bg-celadon-0 disabled:dark:bg-celadon-500 "
                );
                break;

            case "danger":
                btnStyle = (
                    "bg-vermilion-500 enabled:hover:bg-vermilion-400 " +
                    "disabled:bg-vermilion-300 text-celeste-100 "
                );
                break;

            default:
                btnStyle = (
                    "bg-celeste-300 dark:bg-celeste-700 " +
                    "enabled:hover:bg-celeste-200 " +
                    "enabled:hover:dark:bg-celeste-600 " +
                    "disabled:bg-celeste-0 disabled:dark:bg-celeste-500 "
                );
                break;
        }

        // Set state.
        this.state = {
            btnStyle: btnStyle
        } as STATE;

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the button node.
     */
    render(): React.ReactNode {

        // Return the node for normal button.
        return (
            <button
                className={this.state.btnStyle}
                onClick={this.props.action}
                type={this.props.type}>
                {this.props.text}
                {this.props.children}
            </button>
        );

    }

}


/**
 * Class that represent a button.
 * @extends {BaseButton}
 */
class SimpleButton extends
BaseButton<IBaseButtonProps, IBaseButtonState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IBaseButtonProps) {

        // Create superior class.
        super(props);

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

        // Get image class from the size.
        switch (this.props.size) {
            case "sm":
                btnClass += "p-1 rounded-lg text-sm";
                break;

            case "md":
                btnClass += "p-3 rounded-lg text-base";
                break;

            case "lg":
                btnClass += "p-5 rounded-lg text-lg";
                break;

            default:
                btnClass += "p-3 rounded-lg text-base";
                break;
        }

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


interface IUserButtonProps {
    text?: string;
    style?: string;
    user?: string;
    type?: "submit" | "button" | "reset";
    size?: "sm" | "md" | "lg" | "";
    children?: any;
    action?: () => any;
}


/**
 * Class that represent a user button in the LogIn.
 * @extends {BaseButton}
 */
class UserButton extends BaseButton<IUserButtonProps, IBaseButtonState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IBaseButtonProps) {

        // Create superior class.
        super(props);

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

}


/** @typedef {object} - Group buttons components */
const buttons = {
    DarkModeButton: DarkModeButton,
    SimpleButton: SimpleButton,
    UserButton: UserButton
};

// Export buttons.
export default buttons;
