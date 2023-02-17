import React from "react";

class darkModeButton extends React.Component<{}, {isDark: boolean}> {

    constructor(props: {}) {

        super(props);

        this.handleDarkOnClick = this.handleDarkOnClick.bind(this);
        this.handleDarkOffClick = this.handleDarkOffClick.bind(this);

        this.state = {isDark: true};

    }

    handleDarkOnClick() {
        this.setState({isDark: true});
    }

    handleDarkOffClick() {
        this.setState({isDark: false});
    }

    render() {

        const isDark = this.state.isDark;
        let btnImage, btnClass, btnAction;

        if (isDark) {

            btnImage = "icons/moon-dark.svg";
            btnClass = "rounded-full bg-gray-900";
            btnAction = this.handleDarkOffClick;

        } else {

            btnImage = "icons/sun.svg";
            btnClass = "rounded-full bg-gray-200";
            btnAction = this.handleDarkOnClick;

        }

        return (
            <button className={btnClass} onClick={btnAction}>
                <img className="m-2 w-5" src={btnImage}/>
            </button>
        );

    }
}

class loginMenuButton extends React.Component {

    constructor(props: {}) {

        super(props);

        this.state = {
            props: true
        };

    }

}

const buttons = {
    darkModeButton: darkModeButton,
    loginMenuButton: loginMenuButton
};

export default buttons;
