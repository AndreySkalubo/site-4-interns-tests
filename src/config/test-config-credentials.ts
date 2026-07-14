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
        "email": "user1@test.com",
        "password": null
    },
    emptyEmail: {
        "email": null,
        "password": "user123"
    },
    emptyLoginData: {
        "email": null,
        "password": null
    },
    sqlInjection: {
        "email": "admin@test.com' --",
        "password": null
    },
    sqlInjection2: {
        "email": "' OR '1'='1",
        "password": "' OR '1'='1"
    },
    existingUser: {
        "firstname": "John",
        "lastname": "Doe",
        "email": "user1@test.com",
        "username": "user1",
        "phoneNumber": "+10000000001",
        "password": "user123",
        "role": "USER"
    }
} as const;