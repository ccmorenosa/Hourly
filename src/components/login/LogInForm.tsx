/**
 * LogIn form box component.
 *
 * It render the login form.
 */

import React from "react";
import Layout from "../layouts";

/** Create the state interface */
interface ILogInFormProps {
    handleLogIn: (
        user:string, username: string, password: string
    ) => Promise<boolean>;
    user: string;
    username: string;
    cancelBtn: React.ReactNode;
};

/** Create the props interface */
interface ILogInFormState {
    password: string;
};


/**
 * Class representing the login form.
 * @extends {React.ReactNode}
 */
class LogInForm extends
React.Component<ILogInFormProps, ILogInFormState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: ILogInFormProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.LogIn = this.LogIn.bind(this);

        // Set state.
        this.state = {
            password: "",
        };

    }

    /**
     * Update value when changing an input.
     * @param event {any} - Event when changing an input.
     */
    handleInputChange(event: any) {
        // Get target input.
        const target = event.target;

        // Get value of the input and the name.
        const value: string = target.value;
        const name:string = target.name;

        // Update state with the new value.
        this.setState(
            {
                [name]: value
            } as Pick<ILogInFormState, keyof ILogInFormState>
        );

      }

      /**
       * Create new user.
       * @param event {any} - Event when submitting the form.
       */
      async LogIn(event: any): Promise<void> {
          event.preventDefault();

          // Block buttons.
          $("button").prop('disabled', true);

          /** @typedef {ILogInFormState} - Value of the input tags. */
          let values: ILogInFormState = this.state;

          // Check if the form is valid.
          if (
              ! await this.props.handleLogIn(
                  this.props.user,
                  this.props.username,
                  values.password
              )
          ) {

              $("#invalid-password").removeClass("hidden");

          } else {

              $("#invalid-password").addClass("hidden");

          }

          // Activate buttons.
          $("button").prop('disabled', false);

      }

    /**
     * Render the component.
     * @returns {React.ReactNode} the New User Form node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Class for the welcome div. */
        let welcomeClass = (
            "w-full lg:text-5xl md:text-3xl sm:text-xl pb-5 border-b-2 " +
            "border-celeste-900 dark:border-celeste-100"
        );

        /** @typedef {string} - Class for the input tags. */
        let inputClass = (
            "w-full form-input px-4 py-3 rounded-full " +
            "bg-celeste-300 dark:bg-celadon-300 text-gray-1000"
        );

        /** @typedef {string} - Warning class. */
        let warnClass: string = (
            "hidden text-vermilion-500 dark:text-vermilion-300 ml-1 font-bold"
        );

        // Return the node.
        return (
            <span>
                <h1 className={welcomeClass}>
                    Welcome <br /> {this.props.user}
                </h1>

                <form
                    name="login-form"
                    className="w-full lg:text-sm md:text-xs lg:p-5 md:pt-2"
                    onSubmit={this.LogIn}
                >

                    <div>
                        <Layout.buttons.UserButton
                            user={this.props.username}
                            style="option-1"
                        />
                    </div>

                    <div id="input-password">
                        <div className="p-2 text-left w-full flex">
                            Password:
                            <span
                                id="invalid-password"
                                className={warnClass}
                            >
                                Invalid password.
                            </span>
                        </div>

                        <input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password" className={inputClass}
                            name="password"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-5">
                        {this.props.cancelBtn}

                        <Layout.buttons.SimpleButton
                            style="success" type="submit" text="Login"
                        />
                    </div>

                </form>

            </span>
        );

    }

}


// Export New User form.
export default LogInForm;
