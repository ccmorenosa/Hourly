/**
 * Boxes Components.
 *
 * It renders the boxes to hold messages.
 */

import React from "react";

interface IHomeBoxProps {
    style?: string;
    title: string;
    value: string;
    icon: string;
}

interface IHomeBoxState { }


/**
 * Class representing a box base.
 * @extends {React.Component}
 */
class HomeBox extends React.Component<IHomeBoxProps, IHomeBoxState> {

    /**
     * Create the component.
     * @param props {object} - Properties of the component.
     */
    constructor(props: IHomeBoxProps) {

        // Create superior class.
        super(props);

        // Set state.
        this.state = { };

    }

    /**
     * Render the component.
     * @returns {React.ReactNode} the box node.
     */
    render(): React.ReactNode {
        /** @typedef {string} - Box color and style. */
        let boxStyle: string = (
            "flex flex-col lg:p-4 md:p-2 rounded-lg font-bold "
        );

        // Set button style.
        switch (this.props.style) {
            case "green":
                boxStyle += "bg-celadon-300 dark:bg-celadon-900 ";
                break;

            case "gay":
                boxStyle += "bg-gray-300 dark:bg-gray-900 ";
                break;

            case "yellow":
                boxStyle += "bg-honey-300 dark:bg-honey-900 ";
                break;

            case "red":
                boxStyle += "bg-vermilion-300 dark:bg-vermilion-900 ";
                break;

            case "blue":
                boxStyle += "bg-celeste-300 dark:bg-celeste-900 ";
                break;

            case "purple":
                boxStyle += "bg-purple-300 dark:bg-purple-900 ";
                break;

            default:
                boxStyle += "bg-celadon-300 dark:bg-celadon-900 ";
                break;
        }

        /** @typedef {string} - Images. */
        let icon: string = `icons/${this.props.icon}`;

        // return the node.
        return (
            <div className={boxStyle}>

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
    HomeBox: HomeBox,
};

// Export boxes.
export default boxes;
