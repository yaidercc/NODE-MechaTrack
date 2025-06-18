import { Filters } from "@common/interfaces";
import { Order } from "../order/order.interface";

export interface QueryParams<T> {
    filters: Filters<T>[] | undefined | null,
    order?: Order,
    limit?: number,
    offset?: number
}

