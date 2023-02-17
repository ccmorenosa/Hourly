// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Import React Components.
import * as ReactDOM from 'react-dom/client';
import Layout from "./components/layouts";


window.addEventListener('DOMContentLoaded', () => {
    let darkButton = ReactDOM.createRoot(
        document.getElementById("b-dark-mode")
    );

    darkButton.render(
        <Layout.buttons.darkModeButton />
    );

})
