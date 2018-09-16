const ReturnUser = {
    email: '123@dwq.com',
    password: "123",
    username: "max"
};

export default function authAsync(user) {
    return new Promise((resolve, reject) => {
        process.nextTick(
            () =>
            ReturnUser.toString = user.toString ?
            resolve(authSuccess()) :
            reject(authFail()),
        );
    });
}

const authSuccess = () => {
    return;
};

const authFail = () => {
    return;
};