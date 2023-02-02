import * as ReactDOM from 'react-dom/client';

let darkButton = ReactDOM.createRoot($("#b-dark-mode")[0]);

$("#b-dark-mode").on("click", () => {

    if ($("html").hasClass("dark")) {

        $("html").removeClass("dark");

        darkButton.render(
            <button className="rounded-full bg-gray-200 w-8">
                <img className="m-2" src="icons/sun.svg" alt="light"/>
            </button>
        );

    } else {

        $("html").addClass("dark");

        darkButton.render(
            <button className="rounded-full bg-gray-900 w-8">
                <img className="m-2" src="icons/moon-dark.svg" alt="dark"/>
            </button>
        );

    }

});
