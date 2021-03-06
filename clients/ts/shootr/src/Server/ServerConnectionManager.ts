import { IUserInformation } from "./IUserInformation";

export class ServerConnectionManager {
    constructor(private _authCookieName: string) {}

    public PrepareRegistration(): IUserInformation {
        var stateCookie: JQueryCookieStatic = $.cookie(this._authCookieName),
            state: any = stateCookie ? JSON.parse((<any>stateCookie)) : {},
            registrationID: string = state.RegistrationID;

        if (registrationID) {
            delete state.RegistrationID;

            // Re-update the registration cookie
            $.cookie(this._authCookieName, JSON.stringify(state), { path: '/', expires: 30 });

            return {
                Name: state.DisplayName,
                Photo: state.Photo,
                RegistrationID: registrationID,
                Role: state.Role,
            };
        } else {
            throw new Error("Registration ID not available.");
        }
    }
}