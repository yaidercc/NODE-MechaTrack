import { VALID_DIRECTIONS } from "./order.constants";
import { Order } from "./order.interface";

export const validateOrder = (order: Order) => {
    if (Object.values(VALID_DIRECTIONS).includes(order.direction.toLowerCase() as VALID_DIRECTIONS)) {
        throw new Error(`the direction: ${order.direction}, is not a valid direction`);
    }
    return order;
}