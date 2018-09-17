import {
    authStart,
    authSuccess,
    authFail,
    logout,
    setAuthRedirectPath,
    auth
} from "../../../reducers/auth/actions"
import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT_PATH,
} from "../../../reducers/auth/actions"

jest.mock('../../__mocks__/authAsync');


describe("Auth action", () => {
    const fakeToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywiYWxpYXMiOiJzZGciLCJwaG90byI6bnVsbCwiaXNfYWRtaW4iOmZhbHNlfQ.--BIGZOTKlq37ykkSZ0h1B3hXqvE6j-C1GlAVMc67AU"
    const fakeUser = {
      alias: "sdg",  
      id: 3,
      is_admin: false,
      photo: null
    }
    const fakeFailError = "User not found";
    const fakePath = "/home"



    it("auth start has the correct type", () => {
        const action = authStart();
        expect(action.type).toBe(AUTH_START)
    })

    it("auth success has the correct type", () => {
        const action = authStart();
        expect(action.type).toBe(AUTH_START)
    })

    it("auth success has the correct payload", () => {
        const action = authSuccess(fakeToken, fakeUser);
        expect(action.token).toBe(fakeToken)
        expect(action.user).toBe(fakeUser)
    })

    it("auth fail has the correct type", () => {
        const action = authFail();
        expect(action.type).toBe(AUTH_FAILURE)

    })
    it("auth fail has the correct payload", () => {
        const action = authFail(fakeFailError);
        expect(action.error).toBe(fakeFailError)
    })

    it("logout has the correct type", () => {
        const action = logout();
        expect(action.type).toBe(AUTH_LOGOUT)
    })

    it("setAuthRedirectPath has the correct type", () => {
        const action = setAuthRedirectPath();
        expect(action.type).toBe(SET_AUTH_REDIRECT_PATH)
    })

    it("setAuthRedirectPath has the correct payload", () => {
        const action = setAuthRedirectPath(fakePath);
        expect(action.path).toBe(fakePath)
    })

    // it("auth, sign in correct", () => {
    //     console.log(auth({
    //         email: '123@dwq.com',
    //         password: "123",
    //         username: "max"
    //     }));
    // })
})