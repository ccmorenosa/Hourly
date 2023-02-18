/**
 * Define global APIs
 */

// Export interface IUserAPI.
export interface IUserAPI {
    getUsers: () => Promise<string[]>,
}

// Declare new attribute of window.
declare global {
    interface Window {
        UserAPI: IUserAPI
    }
}
