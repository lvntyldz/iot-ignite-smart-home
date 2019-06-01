export const constraints = {
    userEmail: {
        presence: true,
        email: true
    },
    userPwd: {
        presence: true,
        length: {
            minimum: 3,
            maximum: 20
        }
    }
};