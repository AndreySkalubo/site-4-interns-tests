import { testConfigProducts } from "../config/test-config-products";

export function giveRandomItemId() {
    return Math.floor(Math.random() * testConfigProducts.numberOfProducts) +
        testConfigProducts.firstProductEntryID;
}