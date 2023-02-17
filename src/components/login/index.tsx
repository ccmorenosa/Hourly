import * as ReactDOM from 'react-dom/client';
import Layout from "../layouts";


window.addEventListener('DOMContentLoaded', () => {
    let darkButton = ReactDOM.createRoot($("#b-dark-mode")[0]);

    darkButton.render(
        <Layout.buttons.darkModeButton />
    );

})
