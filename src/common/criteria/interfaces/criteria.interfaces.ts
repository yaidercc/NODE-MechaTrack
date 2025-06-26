import { Filters } from "../filters/filters.interface";
import { Order } from "../order/order.interface";

export interface QueryParams {
    filters: Filters[] | null,
    order?: Order,
    limit?: number,
    offset?: number
}

