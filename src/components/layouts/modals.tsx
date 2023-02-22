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
    titleStyle: string;
    cancelStyle: string;
    proceedStyle: string;
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
        let titleStyle: string = "my-5 mx-auto p-2 rounded-lg ";
        let cancelStyle: string;
        let proceedStyle: string;

        // Set button style.
        switch (this.props.style) {
            case "info":
                titleStyle += "bg-celeste-500 text-lg px-5 text-gray-1000";
                cancelStyle = "danger";
                proceedStyle = "success";
                break;

            case "warning":
                titleStyle += "bg-honey-500 text-lg px-5 text-gray-1000";
                cancelStyle = "danger";
                proceedStyle = "success";
                break;

            case "danger":
                titleStyle += "bg-vermilion-500 text-lg px-5 text-gray-0";
                cancelStyle = "option-4";
                proceedStyle = "danger";
                break;

            default:
                titleStyle += "bg-celeste-500 text-lg px-5 text-gray-1000";
                cancelStyle = "danger";
                proceedStyle = "success";
                break;
        }

        // Set state.
        this.state = {
            titleStyle: titleStyle,
            cancelStyle: cancelStyle,
            proceedStyle: proceedStyle,
        };

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the modal node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the modal div. */
        let modalClass: string = (
            "bg-gray-300 dark:bg-gray-900 m-auto rounded-2xl py-5 px-16 " +
            "border-4 border-gray-500 dark:border-0 flex flex-col text-center"
        );

        return (
            <div className={modalClass}>

                <div className={this.state.titleStyle}>
                    {this.props.title}
                </div>

                <div className="my-5">
                    {this.props.message}
                </div>

                <div className="grid grid-cols-2 gap-10 mt-10">
                    <Layout.buttons.SimpleButton
                        text="cancel" style={this.state.cancelStyle}
                        action={this.props.cancel}
                    />
                    <Layout.buttons.SimpleButton
                        text="Ok!" style={this.state.proceedStyle}
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

interface IInfoModalState { }


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

interface IWarningModalState { }


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

interface IDangerModalState { }


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


interface IFormModalProps {
    style?: "info" | "warning" | "danger";
    title: string | React.ReactNode;
    inputs: string[] | React.ReactNode[];
    invalid?: string;
    cancel: (event: any) => any;
    proceed: (event: any) => Promise<boolean>;
}

interface IFormModalState {
    values: {}
}


/**
 * Class representing a modal for form modal.
 * @extends {React.Component}
 */
class FormModal<PROPS extends IFormModalProps, STATE extends IFormModalState>
extends React.Component<PROPS, STATE> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: PROPS) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.submit = this.submit.bind(this);

        // Set state.
        this.state = {
            values: {}
         } as STATE;

    }

    /**
     * Create new user.
     * @param event {any} - Event when submitting the form.
     */
    async submit(event: any): Promise<void> {
        event.preventDefault();

        // Block buttons.
        $("#form-modal button").prop('disabled', true);

        // Collect values.
        let values = $("#form-modal .form-input").map((i, inputTag) => {

            return {
                name: (inputTag.getAttribute("name") as string),
                value: (inputTag as HTMLInputElement).value,
            };

        });

        // Check if the form is valid.
        if (
            ! await this.props.proceed(values)
        ) {

            $("#invalid").removeClass("hidden");

        } else {

            $("#invalid").addClass("hidden");

        }

        // Activate buttons.
        $("#form-modal button").prop('disabled', false);

        this.render();

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the modal node.
     */
    render(): React.ReactNode {

        /** @typedef {string} - Warning class. */
        let warnClass: string = (
            "hidden text-vermilion-500 dark:text-vermilion-300 ml-1 font-bold"
        );

        /** @typedef {React.ReactNode} - Form base to show in the modal. */
        let form: React.ReactNode = (<>
            <form
                id="form-modal"
                name="form-modal"
                className="w-full lg:text-sm md:text-xs"
                onSubmit={this.submit}
            >

                <span
                    id="invalid"
                    className={warnClass}
                >
                    {this.props.invalid}
                </span>
                {this.props.inputs}

            </form>
        </>);

        return (
            <ModalBase
                style={this.props.style}
                title={this.props.title}
                message={form}
                cancel={this.props.cancel}
                proceed={this.submit}
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
    FormModal: FormModal,
};

// Export ModalBase.
export default modals;
