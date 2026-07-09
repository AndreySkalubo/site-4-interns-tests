import { faker } from "@faker-js/faker";

export const testConfigProducts = {
    numberOfProducts: 50,
    firstProductEntryID: 54, //not 1 due to db re-creation
    testProduct: {
        "name": faker.commerce.productName(),
        "description": faker.commerce.productDescription(),
        "price": Math.floor(Math.random() * 3000) + 3000,
        "urlImage": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500",
        "category": "ELECTRONICS"
    }
};