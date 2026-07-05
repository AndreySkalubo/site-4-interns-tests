export const testConfigCredentials = {
    admin: {
        "email": "admin@test.com",
        "password": "admin123"
    },
    user1: {
        "email": "user1@test.com",
        "password": "user123"
    },
    user2: {
        "email": "user2@test.com",
        "password": "user123"
    },
    user1BadData: {
        "email": "user1@tes",
        "password": "user12"
    },
    nonExistentData: {
        "email": "non-existent@gmail.com",
        "password": "user123"
    },
    emptyPassword: {
        "email": "non-existent@gmail.com",
        "password": null
    },
    emptyEmail: {
        "email": null,
        "password": "user123"
    },
    emptyLoginData: {
        "email": null,
        "password": null
    }
};