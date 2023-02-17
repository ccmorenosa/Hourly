import * as ReactDOM from 'react-dom/client';

$("#b-dark-mode").on("click", () => {

    if ($("html").hasClass("dark")) {

        $("html").removeClass("dark");

    } else {

        $("html").addClass("dark");

    }

});
