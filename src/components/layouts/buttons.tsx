import React from "react";

class darkModeButton extends React.Component<{}, {isDark: boolean}> {

    constructor(props: {}) {

        super(props);

        this.handleDarkOnClick = this.handleDarkOnClick.bind(this);
        this.handleDarkOffClick = this.handleDarkOffClick.bind(this);

        this.state = {isDark: true};

    }

    handleDarkOnClick(): void {
        this.setState({isDark: true});
    }

    handleDarkOffClick(): void {
        this.setState({isDark: false});
    }

    render(): React.ReactNode {

        const isDark = this.state.isDark;
        let btnImage, btnClass, btnAction;

        if (isDark) {

            btnImage = "icons/moon-dark.svg";
            btnClass = "rounded-full bg-gray-900";
            btnAction = this.handleDarkOffClick;

            $("html").addClass("dark");

        } else {

            btnImage = "icons/sun.svg";
            btnClass = "rounded-full bg-gray-200";
            btnAction = this.handleDarkOnClick;

            $("html").removeClass("dark");

        }

        return (
            <div className="container text-right" id="b-dark-mode">
                <button className={btnClass} onClick={btnAction}>
                    <img className="m-2 w-5" src={btnImage}/>
                </button>
            </div>
        );

    }
}

class loginMenuButton extends
React.Component<{text?: string, isUser?: boolean}, {}> {

    constructor(
        props: {text: string, isUser: boolean} = {text: "", isUser: false}
    ) {

        super(props);

    }

    render(): React.ReactNode {

        if (this.props.isUser) {

            return (
                <button className="shrink-0">
                    <img className="w-28 rounded-full p-1 bg-celadon-100 dark:bg-celadon-700 hover:bg-celadon-0 hover:dark:bg-celadon-600 mx-2" src="icons/user.svg" />
                </button>
            );

        }

        return (
            <button className="p-3 bg-celadon-100 dark:bg-celadon-700 hover:bg-celadon-0 hover:dark:bg-celadon-600 rounded-lg">
                {this.props.text}
            </button>
        );

    }

}

const buttons = {
    darkModeButton: darkModeButton,
    loginMenuButton: loginMenuButton
};

export default buttons;
