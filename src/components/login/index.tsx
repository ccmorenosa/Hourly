import React from "react";
import WelcomeBox from "./Welcome";
import Layout from "../layouts";


class LogIn extends React.Component<{}, {}> {

    constructor(props: {}) {

        super(props);

    }

    render(): React.ReactNode {

        let viewClass = (
            "h-screen flex flex-col justify-center bg-celeste-100 " +
            "dark:bg-celeste-900 text-celeste-900 dark:text-celeste-100"
        );

        return (
            <div className={viewClass}>

                <Layout.buttons.darkModeButton />

                <WelcomeBox />

            </div>
        );

    }

}

export default LogIn;
