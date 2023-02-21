/**
 * New user form box component.
 *
 * It render the new user form.
 */

import React from "react";
import Layout from "../layouts";

/** Create the state interface */
interface INewUserFormProps {
    cancelBtn: React.ReactNode;
};

/** Create the props interface */
interface INewUserFormState {
    users: string[] | string;
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
};


/**
 * Class representing the new user form.
 * @extends {React.ReactNode}
 */
class NewUserForm extends
React.Component<INewUserFormProps, INewUserFormState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: INewUserFormProps) {

        // Create superior class.
        super(props);

        // Bind actions.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNewUser = this.createNewUser.bind(this);

        // Set state.
        this.state = {
            users: [],
            name: "",
            username: "",
            password: "",
            confirmPassword: ""
        };

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
            } as Pick<INewUserFormState, keyof INewUserFormState>
        );

      }

      /**
       * Create new user.
       * @param event {any} - Event when submitting the form.
       */
      createNewUser(event: any): void {
          event.preventDefault();

          // Block buttons.
          $("button").prop('disabled', true);

          /** @typedef {INewUserFormState} - Value of the input tags. */
          let values: INewUserFormState = this.state;

          // Define vals regex.
          const usernameRegex = new RegExp("^[A-Za-z][\\w]{7,29}$");
          const passwordRegex = new RegExp(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[\\w@$!%*?&]{8,}$"
          );

          /** @typedef {boolean} - Flag indicating state of the form */
          let is_valid: boolean = true;

          // Check username regex.
          if (! usernameRegex.test(values.username)) {
              is_valid = false;
              $("#invalid-username").removeClass("hidden");
            } else {
                $("#invalid-username").addClass("hidden");

                // Check if username exists.
                if (values.users.includes(values.username)) {
                    is_valid = false;
                    $("#existing-username").removeClass("hidden");
                } else {
                    $("#existing-username").addClass("hidden");
                }

          }

          // Check password regex.
          if (! passwordRegex.test(values.password)) {
              is_valid = false;
              $("#invalid-password").removeClass("hidden");
          } else {
              $("#invalid-password").addClass("hidden");
          }

          // Check password regex.
          if (! (values.password === values.confirmPassword)) {
              is_valid = false;
              $("#invalid-confirm-password").removeClass("hidden");
          } else {
              $("#invalid-confirm-password").addClass("hidden");
          }

          // Check if the form is valid.
          if (is_valid) {

              // Create the new user in the database.
              window.UserAPI.createUsers(
                  values.name,
                  values.username,
                  values.password
              );

              // Update users.
              this.getUsers();

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

        /** @typedef {string} - Source for the info mark. */
        let infoImage: string = "icons/question-circle.svg";

        // Get mode status.
        if ($("html").hasClass("dark")) {
            infoImage = "icons/question-circle-dark.svg";
        }

        /** @typedef {string} - Warning class. */
        let warnClass: string = (
            "hidden text-vermilion-500 dark:text-vermilion-300 ml-1 font-bold"
        );

        // Return the node.
        return (
            <span>
                <h1 className={welcomeClass}>New User</h1>

                <form
                    name="new-user-form"
                    className="w-full lg:text-sm md:text-xs lg:p-5 md:pt-2"
                    onSubmit={this.createNewUser}
                >

                    <span
                        id="existing-username"
                        className={warnClass}
                    >
                        User already exists.
                    </span>

                    <div id="input-name">
                        <div className="p-2 text-left w-full flex">
                            Name:
                        </div>

                        <input
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            type="text" className={inputClass} name="name"
                            required
                        />
                    </div>

                    <div id="input-username">
                        <div className="p-2 text-left w-full flex">
                            Username:
                            <img
                                className="w-5 ml-1" src={infoImage}
                                title={
                                    "Username must:\n" +
                                    " - Contain between 8 to 30 characters." +
                                    "\n - Start with a letter.\n" +
                                    " - Contain only alphanumeric " +
                                    "characters and underscores (_)."
                                }
                            />
                            <span
                                id="invalid-username"
                                className={warnClass}
                            >
                                Invalid username.
                            </span>
                        </div>

                        <input
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            type="text" className={inputClass} name="username"
                            required
                        />
                    </div>

                    <div id="input-password">
                        <div className="p-2 text-left w-full flex">
                            Password:
                            <img
                                className="w-5 ml-1" src={infoImage}
                                title={
                                    "Password must contain:\n" +
                                    " - Minimum 8 characters.\n"  +
                                    " - At least one uppercase letter.\n" +
                                    " - At least one lowercase letter.\n" +
                                    " - At least one number.\n" +
                                    " - At least one special character."
                                }
                            />
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

                    <div id="input-confirm-password">
                        <div className="p-2 text-left w-full flex">
                            Confirm password:
                            <span
                                id="invalid-confirm-password"
                                className={warnClass}
                            >
                                Password do not match.
                            </span>
                        </div>

                        <input
                            value={this.state.confirmPassword}
                            onChange={this.handleInputChange}
                            type="password" className={inputClass}
                            name="confirmPassword"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-5">
                        {this.props.cancelBtn}

                        <Layout.buttons.SimpleButton
                            style="success" type="submit" text="create"
                        />
                    </div>

                </form>

            </span>
        );

    }

}


// Export New User form.
export default NewUserForm;
