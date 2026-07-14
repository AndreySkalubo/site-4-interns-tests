import { giveRandomItemId } from "../helpers/give-random-item-id";

export const testConfigOrders = {
    testOrder: {
        "items": [
            {
                "product_id": giveRandomItemId(),
                "quantity": 1
            },
            {
                "product_id": giveRandomItemId(),
                "quantity": 1
            },
            {
                "product_id": giveRandomItemId(),
                "quantity": 1
            }
        ]
    },
    testEmptyOrder: {
        "items": []
    }
} as const;