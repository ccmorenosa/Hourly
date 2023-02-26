/**
 * Modals Components.
 *
 * It renders the modal boxes to hold messages.
 */

import React from "react";
import Layout from ".";

interface IModalBaseProps {
    style?: "success" | "info" | "warning" | "danger";
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    cancel?: null | ((event: any) => any);
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
        let titleStyle: string = "my-3 mx-auto p-2 rounded-lg ";
        let cancelStyle: string;
        let proceedStyle: string;

        // Set button style.
        switch (this.props.style) {
            case "success":
                titleStyle += "bg-celadon-500 text-lg px-5 text-gray-1000";
                cancelStyle = "danger";
                proceedStyle = "success";
                break;

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

        /** @typedef {React.ReactNode} - Div for the buttons. */
        let cancelBtn: React.ReactNode = <></>;
        let proceedBtn: string = "col-span-2";

        if (this.props.cancel) {
            cancelBtn = (
                <div>
                    <Layout.buttons.SimpleButton
                        text="cancel" style={this.state.cancelStyle}
                        action={this.props.cancel}
                    />
                </div>
            );

            proceedBtn = "col-span-1";
        }

        // return the node.
        return (
            <div className={modalClass}>

                <div className={this.state.titleStyle}>
                    {this.props.title}
                </div>

                <div className="my-3 whitespace-pre-line">
                    {this.props.message}
                </div>

                <div className="grid grid-cols-2 gap-3 my-3">

                    {cancelBtn}

                    <div className={proceedBtn}>
                        <Layout.buttons.SimpleButton
                            text="Continue" style={this.state.proceedStyle}
                            action={this.props.proceed}
                        />
                    </div>
                </div>

            </div>
        );

    }

}


interface ISuccessModalProps {
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    proceed: (event: any) => any;
}

interface ISuccessModalState { }


/**
 * Class representing a modal for success message.
 * @extends {React.Component}
 */
class SuccessModal extends
React.Component<ISuccessModalProps, ISuccessModalState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: ISuccessModalProps) {

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
            <img className="w-7 inline mx-2" src="icons/check-circle.svg" />
        );

        // return the node.
        return (
            <ModalBase
                style="success"
                title={<>
                    {titleIcons}
                    {this.props.title}
                    {titleIcons}
                </>}
                message={this.props.message}
                proceed={this.props.proceed}
            />
        );

    }

}


interface IInfoModalProps {
    title: string | React.ReactNode;
    message: string | React.ReactNode;
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

        // return the node.
        return (
            <ModalBase
                style="info"
                title={<>
                    {titleIcons}
                    {this.props.title}
                    {titleIcons}
                </>}
                message={this.props.message}
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

        // return the node.
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

        // return the node.
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
            "hidden text-vermilion-500 dark:text-vermilion-300 mb-3 font-bold"
        );

        /** @typedef {React.ReactNode} - Form base to show in the modal. */
        let form: React.ReactNode = (<>
            <form
                id="form-modal"
                name="form-modal"
                className="w-full lg:text-sm md:text-xs"
                onSubmit={this.submit}
            >

                <div
                    id="invalid"
                    className={warnClass}
                >
                    {this.props.invalid}
                </div>
                {this.props.inputs}

            </form>
        </>);

        // return the node.
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
    SuccessModal: SuccessModal,
    InfoModal: InfoModal,
    WarningModal: WarningModal,
    DangerModal: DangerModal,
    FormModal: FormModal,
};

// Export ModalBase.
export default modals;
