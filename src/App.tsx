/**
 * App script to render main processes of the application.
 */

import LogIn from "./components/login";
import * as ReactDOM from 'react-dom/client';

// Processes when the window has loaded its content.
window.addEventListener('DOMContentLoaded', () => {
    // Get root div.
    let darkButton = ReactDOM.createRoot($("#root")[0]);

    // Render login view when window is ready.
    darkButton.render(<LogIn />);

});
