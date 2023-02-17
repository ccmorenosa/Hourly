import React from "react";
import Layout from "../layouts";

class WelcomeBox extends React.Component<{}, {}> {

    constructor(props: {}) {

        super(props);

    }

    render(): React.ReactNode {

        let boxClass = (
            "bg-celadon-500 dark:bg-celeste-1000 mx-auto w-1/3 " +
            "rounded-lg text-center p-10 h-5/6 flex flex-col"
        );

        let welcomeClass = (
            "w-full lg:text-5xl md:text-3xl sm:text-xl pb-5 border-b-2 " +
            "border-celeste-900 dark:border-celeste-100"
        );

        let userBandClass = (
            "overflow-x-scroll flex scrollbar scrollbar-thumb-celadon-700 "+
            "scrollbar-track-celadon-100 scrollbar-h-2 " +
            "scrollbar-thumb-rounded-full scrollbar-track-rounded-full " +
            "mt-10 p-3 h-36 justify-center"
        );

        return (
            <div className={boxClass}>

                <h1 className={welcomeClass}>Welcome</h1>

                <div className={userBandClass}>
                    <Layout.buttons.loginMenuButton isUser={true} />
                </div>
                <div className="grid grid-rows-1 gap-10 mt-10">

                    <Layout.buttons.loginMenuButton text="New Profile" />

                </div>

                <div className="grid grid-cols-2 gap-10 mt-10">

                    <Layout.buttons.loginMenuButton text="a" />
                    <Layout.buttons.loginMenuButton text="b" />

                </div>

            </div>
        );

    }

}

export default WelcomeBox;
