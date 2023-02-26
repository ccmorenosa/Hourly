/**
 * Boxes Components.
 *
 * It renders the boxes to hold messages.
 */

import React, { PropsWithChildren } from "react";

interface IBoxBaseProps {
    style?: string;
    title: string;
    value: string;
}

interface IBoxBaseState {
    boxStyle?: string;
}


/**
 * Class representing a box base.
 * @extends {React.Component}
 */
class BoxBase<PROPS extends IBoxBaseProps, STATE extends IBoxBaseState> extends
React.Component<PROPS, STATE> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: PROPS) {

        // Create superior class.
        super(props);

        /** @typedef {string} - Box color and style. */
        let boxStyle: string = (
            "flex flex-col lg:p-4 md:p-2 rounded-lg font-bold "
        );

        // Set button style.
        switch (this.props.style) {
            case "green":
                boxStyle += "bg-celadon-300 dark:bg-celadon-700 ";
                break;

            case "gray":
                boxStyle += "bg-gray-300 dark:bg-gray-700 ";
                break;

            case "yellow":
                boxStyle += "bg-honey-300 dark:bg-honey-700 ";
                break;

            case "red":
                boxStyle += "bg-vermilion-300 dark:bg-vermilion-700 ";
                break;

            case "blue":
                boxStyle += "bg-celeste-300 dark:bg-celeste-700 ";
                break;

            case "purple":
                boxStyle += "bg-purple-300 dark:bg-purple-700 ";
                break;

            default:
                boxStyle += "bg-celadon-300 dark:bg-celadon-700 ";
                break;
        }

        // Set state.
        this.state = {
            boxStyle: boxStyle,
        } as STATE;

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the box node.
     */
    render(): React.ReactNode {

        // return the node.
        return (
            <div className={this.state.boxStyle}>

                <span className="lg:text-lg md:text-base justify-center">
                    {this.props.title}
                </span>

                <div className="flex">

                    <span className="lg:text-3xl md:text-xl m-auto whitespace-pre-line">
                        {this.props.value}
                    </span>

                </div>

        </div>
        );

    }

}


interface IStatsBoxProps {
    style?: string;
    title: string;
    value: string;
    icon: string;
}

interface IStatsBoxState {
    boxStyle?: string;
}


/**
 * Class representing a box base.
 * @extends {React.Component}
 */
class StatsBox extends BoxBase<IStatsBoxProps, IStatsBoxState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IStatsBoxProps) {

        // Create superior class.
        super(props);

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the box node.
     */
    render(): React.ReactNode {

        /** @typedef {string} - Images. */
        let icon: string = `icons/${this.props.icon}`;

        // return the node.
        return (
            <div className={this.state.boxStyle}>

                <span className="lg:text-lg md:text-base">
                    {this.props.title}
                </span>

                <div className="flex">

                    <span className="lg:text-3xl md:text-xl mr-auto">
                        {this.props.value}
                    </span>
                    <img className="lg:w-10 md:w-5 hidden dark:inline"
                        src={`${icon}-dark.svg`}
                    />
                    <img className="lg:w-10 md:w-5 dark:hidden inline"
                        src={`${icon}.svg`}
                    />

                </div>

        </div>
        );

    }

}


/** @typedef {object} - Group boxes components */
const boxes = {
    BoxBase: BoxBase,
    StatsBox: StatsBox,
};

// Export boxes.
export default boxes;
