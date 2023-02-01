// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Import React Components.
import * as ReactDOM from 'react-dom/client';

window.addEventListener('DOMContentLoaded', () => {

    const replaceText = (selector: string, text: string): void => {
        const target = ReactDOM.createRoot(document.getElementById(selector));

        if (target) target.render(text);
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }

})
