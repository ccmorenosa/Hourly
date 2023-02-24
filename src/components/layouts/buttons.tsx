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
    id?: string;
    text?: string;
    disabled?: boolean;
    style?: string;
    type?: "submit" | "button" | "reset";
    size?: "sm" | "md" | "lg" | "";
    children?: any;
    action?: (event?: any) => any;
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
        let btnStyle: string = "disabled:opacity-50 disabled:dark:opacity-30 ";

        // Set button style.
        switch (this.props.style) {
            case "success":
                btnStyle += (
                    "bg-celadon-100 dark:bg-celadon-700 " +
                    "enabled:hover:bg-celadon-0 " +
                    "enabled:hover:dark:bg-celadon-600 "
                );
                break;

            case "option-1":
                btnStyle += (
                    "bg-celeste-300 dark:bg-celeste-700 " +
                    "enabled:hover:bg-celeste-200 " +
                    "enabled:hover:dark:bg-celeste-600 "
                );
                break;

            case "option-2":
                btnStyle += (
                    "bg-celeste-100 dark:bg-celeste-1000 " +
                    "enabled:hover:bg-celeste-0 " +
                    "enabled:hover:dark:bg-celeste-900 "
                );
                break;

            case "option-3":
                btnStyle += (
                    "bg-celadon-100 dark:bg-celadon-1000 " +
                    "enabled:hover:bg-celadon-0 " +
                    "enabled:hover:dark:bg-celadon-900 "
                );
                break;

            case "option-4":
                btnStyle += (
                    "bg-celadon-300 dark:bg-celadon-700 " +
                    "enabled:hover:bg-celadon-200 " +
                    "enabled:hover:dark:bg-celadon-600 "
                );
                break;

            case "option-5":
                btnStyle += (
                    "bg-honey-100 dark:bg-honey-1000 " +
                    "enabled:hover:bg-honey-0 " +
                    "enabled:hover:dark:bg-honey-900 "
                );
                break;

            case "option-6":
                btnStyle += (
                    "bg-honey-300 dark:bg-honey-500 " +
                    "enabled:hover:bg-honey-200 " +
                    "enabled:hover:dark:bg-honey-600 "
                );
                break;

            case "danger":
                btnStyle += (
                    "bg-vermilion-500 enabled:hover:bg-vermilion-400 " +
                        "text-celeste-100 "
                );
                break;

            default:
                btnStyle += (
                    "bg-celeste-300 dark:bg-celeste-700 " +
                    "enabled:hover:bg-celeste-200 " +
                    "enabled:hover:dark:bg-celeste-600 "
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
                type={this.props.type}
                disabled={this.props.disabled}
            >
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
                btnClass += "p-1 px-3 rounded-lg text-sm";
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
                id={this.props.id}
                className={btnClass}
                onClick={this.props.action}
                type={type}
                disabled={this.props.disabled}
            >
                {this.props.text}
                {this.props.children}
            </button>
        );

    }

}


interface IUserButtonProps {
    text?: string;
    disabled?: boolean;
    style?: string;
    user?: string;
    type?: "submit" | "button" | "reset";
    size?: "sm" | "md" | "lg" | "";
    children?: any;
    action?: (event?: any) => any;
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

        /** @type {string} - Class for the image in the button. */
        let btnClass: string = this.state.btnStyle;

        // Update the button (image) style.
        btnClass += "lg:w-36 md:w-20 rounded-full p-1 mx-2";

        // Return the node for user button.
        return (
            <button
                id={this.props.user}
                className="shrink-0"
                onClick={this.props.action}
                type={type}
                disabled={this.props.disabled}
            >
                <img className={btnClass} src="icons/user.svg" />
                {this.props.user}
            </button>
        );

    }

}


interface ISidebarButtonProps {
    text?: string;
    disabled?: boolean;
    id?: string;
    icon?: string;
    style?: string;
    type?: "submit" | "button" | "reset";
    children?: any;
    action?: (event?: any) => any;
}


/**
 * Class that represents a sidebar option.
 * @extends {React.Component}
 */
class SidebarButton extends
React.Component<ISidebarButtonProps, IBaseButtonState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: ISidebarButtonProps) {

        // Create superior class.
        super(props);

        /** @typedef {string} - Button color and style. */
        let btnStyle: string = (
            "w-full p-2 text-left disabled:opacity-50 " +
            "disabled:dark:opacity-30 "
        );

        // Set button style.
        switch (this.props.style) {
            case "danger":
                btnStyle += (
                    "bg-vermilion-300 dark:bg-vermilion-600 " +
                    "enabled:hover:bg-vermilion-200 " +
                    "enabled:hover:dark:bg-vermilion-500 "
                );
                break;

            default:
                btnStyle += (
                    "hover:bg-gray-400 hover:dark:bg-gray-700 "
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
     * @returns {React.ReactNode} the option node.
     */
    render(): React.ReactNode {
        /** @type {"submit" | "button" | "reset"} - Type of the button. */
        let type: "submit" | "button" | "reset" = this.props.type;

        // Check type value.
        if (!type) {
            type = "button";
        }

        /** @typedef {string} - Source for the button image. */
        let btnImage: string = "icons/" + this.props.icon;

        /** @type {string} - Class for the button. */
        let btnClass: string = this.state.btnStyle;

        // Return the node for option button.
        return (
            <button
                id={this.props.id}
                className={btnClass}
                onClick={this.props.action}
                type={this.props.type}
                disabled={this.props.disabled}
            >

                <img
                    className="w-6 mr-2 hidden dark:inline"
                    src={btnImage + "-dark.svg"}
                />
                <img
                    className="w-6 mr-2 dark:hidden inline"
                    src={btnImage + ".svg"}
                />

                {this.props.text}
                {this.props.children}
            </button>
        );

    }

}


/** @typedef {object} - Group buttons components */
const buttons = {
    DarkModeButton: DarkModeButton,
    SimpleButton: SimpleButton,
    UserButton: UserButton,
    SidebarButton: SidebarButton,
};

// Export buttons.
export default buttons;
