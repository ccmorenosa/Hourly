// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Import React Components.
import * as ReactDOM from 'react-dom/client';

window.addEventListener('DOMContentLoaded', () => {
    let darkButton = ReactDOM.createRoot(
        document.getElementById("b-dark-mode")
    );

    darkButton.render(
        <button className="rounded-full bg-gray-900 w-8">
            <img className="m-2" src="icons/moon-dark.svg" alt="dark"/>
        </button>
    );

})
