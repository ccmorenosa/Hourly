/**
 * Modals Components.
 *
 * It renders the modal boxes to hold messages.
 */

import React from "react";
import Layout from ".";

interface IModalBaseProps {
    style?: "info" | "warning" | "danger";
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    cancel: (event: any) => any;
    proceed: (event: any) => any;
}

interface IModalBaseState {
    style: string;
}


/**
 * Class representing a modal base.
 * @extends {React.Component}
 */
class ModalBase extends React.Component<IModalBaseProps, IModalBaseState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IModalBaseProps) {

        // Create superior class.
        super(props);

        /** @typedef {string} - Title color and style. */
        let style: string = "my-5 mx-auto p-2 rounded-lg ";

        // Set button style.
        switch (this.props.style) {
            case "info":
                style += "bg-celeste-500 text-lg text-gray-1000";
                break;

            case "warning":
                style += "bg-honey-500 text-lg text-gray-1000";
                break;

            case "danger":
                style += "bg-vermilion-500 text-lg text-gray-0";
                break;

            default:
                style += "bg-celeste-500 text-lg text-gray-1000";
                break;
        }

        // Set state.
        this.state = {
            style: style
        };

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the modal node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the modal div. */
        let modalClass: string = (
            "bg-gray-200 m-auto rounded-2xl py-5 px-16 " +
            "flex flex-col text-center"
        );

        return (
            <div className={modalClass}>

                <div className={this.state.style}>
                    {this.props.title}
                </div>

                <div className="my-5 dark:text-gray-1000 text-celeste-100">
                    {this.props.message}
                </div>

                <div className="grid grid-cols-2 gap-10 mt-10">
                    <Layout.buttons.SimpleButton
                        text="cancel" style="option-4"
                        action={this.props.cancel}
                    />
                    <Layout.buttons.SimpleButton
                        text="Ok!" style="danger"
                        action={this.props.proceed}
                    />
                </div>

            </div>
        );

    }

}


interface IInfoModalProps {
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    cancel: (event: any) => any;
    proceed: (event: any) => any;
}

interface IInfoModalState {
}


/**
 * Class representing a modal for information message.
 * @extends {React.Component}
 */
class InfoModal extends React.Component<IInfoModalProps, IInfoModalState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IInfoModalProps) {

        // Create superior class.
        super(props);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the modal node.
     */
    render(): React.ReactNode {

        /** @typedef {React.ReactNode} - Icons showed in the title. */
        let titleIcons: React.ReactNode = (
            <img className="w-7 inline mx-2" src="icons/info-circle.svg" />
        );

        return (
            <ModalBase
                style="info"
                title={<>
                    {titleIcons}
                    {this.props.title}
                    {titleIcons}
                </>}
                message={this.props.message}
                cancel={this.props.cancel}
                proceed={this.props.proceed}
            />
        );

    }

}


interface IWarningModalProps {
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    cancel: (event: any) => any;
    proceed: (event: any) => any;
}

interface IWarningModalState {
}


/**
 * Class representing a modal for warning message.
 * @extends {React.Component}
 */
class WarningModal extends
React.Component<IWarningModalProps, IWarningModalState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IWarningModalProps) {

        // Create superior class.
        super(props);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the modal node.
     */
    render(): React.ReactNode {

        /** @typedef {React.ReactNode} - Icons showed in the title. */
        let titleIcons: React.ReactNode = (
            <img
                className="w-7 inline mx-2"
                src="icons/exclamation-triangle.svg"
            />
        );

        return (
            <ModalBase
                style="warning"
                title={<>
                    {titleIcons}
                    {this.props.title}
                    {titleIcons}
                </>}
                message={this.props.message}
                cancel={this.props.cancel}
                proceed={this.props.proceed}
            />
        );

    }

}


interface IDangerModalProps {
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    cancel: (event: any) => any;
    proceed: (event: any) => any;
}

interface IDangerModalState {
}


/**
 * Class representing a modal for danger message.
 * @extends {React.Component}
 */
class DangerModal extends
React.Component<IDangerModalProps, IDangerModalState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IDangerModalProps) {

        // Create superior class.
        super(props);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the modal node.
     */
    render(): React.ReactNode {

        /** @typedef {React.ReactNode} - Icons showed in the title. */
        let titleIcons: React.ReactNode = (
            <img
                className="w-7 inline mx-2"
                src="icons/exclamation-octagon-dark.svg"
            />
        );

        return (
            <ModalBase
                style="danger"
                title={<>
                    {titleIcons}
                    {this.props.title}
                    {titleIcons}
                </>}
                message={this.props.message}
                cancel={this.props.cancel}
                proceed={this.props.proceed}
            />
        );

    }

}


/** @typedef {object} - Group modals components */
const modals = {
    ModalBase: ModalBase,
    InfoModal: InfoModal,
    WarningModal: WarningModal,
    DangerModal: DangerModal,
};

// Export ModalBase.
export default modals;
