import { Filters } from "./filters/filters.interface";
import { QueryParams } from "./interfaces/criteria.interfaces";
import { ValueObjectInt } from "../valueObjects/index";
import { validateFilter } from "./filters/filters.utils";
import { validateOrder } from "./order/order.utils";
import { Order } from "./order/order.interface";
import { Knex } from "knex";
import { COMPARISION_OPERATORS, FILTER_TYPE } from "./filters/filters.constant";

export class Criteria {

    private _filters: Filters[] | null;
    private _order: Order | null;
    private _limit?: number | null;
    private _offset?: number | null;

    constructor(
        private criteriaParams: QueryParams
    ) {
        this._filters = !criteriaParams.filters ? [] : criteriaParams.filters.map((filter) => validateFilter(filter));
        this._order = !criteriaParams.order ? null : validateOrder(criteriaParams.order);
        this._offset = !criteriaParams.offset ? null : new ValueObjectInt("offset", criteriaParams.offset).value;
        this._limit = !criteriaParams.limit ? null : new ValueObjectInt("limit", criteriaParams.limit).value;
    }

    get limit() {
        return this._limit ?? 0;
    }

    get offset() {
        return this._offset ?? 0;
    }

    get order() {
        return this._order ? {
            field: this._order.field,
            direction: this._order.direction
        } : {}
    }


    convertToKnex(knexQuery: Knex.QueryBuilder, table = null) {

        this._filters?.forEach((filter) => this.convertFiltersToKnex(knexQuery, filter))


        if (this.limit) {
            knexQuery.limit(this.limit);
        }


        if (this._offset) {
            knexQuery.offset(this._offset);
        }
        if (this.order) {
            if (table) knexQuery.orderBy(`${table}.${this.order.field}`, this.order.direction);
            else knexQuery.orderBy(this.order.field as string, this.order.direction);
        }

    }

    private convertFiltersToKnex(KnexQuery: Knex.QueryBuilder, filter: Filters) {
        this.validateLikeOrIlikeOperator(filter);
        this.validateInNotInOperator(filter);
        this.validateBetweenOperator(filter);

        type ConditionKey = 'null' | 'notNull' | 'between' | 'default';

        const andCondition = {
            "null": () => KnexQuery.whereNull(filter.field),
            "notNull": () => KnexQuery.whereNotNull(filter.field),
            "between": () => KnexQuery.andWhereBetween(filter.field, filter.value as [string, string | number]),
            "default": () => KnexQuery.where(filter.field, filter.operator, filter.value)
        };

        const orCondition = {
            "null": () => KnexQuery.orWhereNull(filter.field),
            "notNull": () => KnexQuery.orWhereNotNull(filter.field),
            "between": () => KnexQuery.orWhereBetween(filter.field, filter.value as [string, string | number]),
            "default": () => KnexQuery.orWhere(filter.field, filter.operator, filter.value)
        };

        const operatorKey = filter.operator as ConditionKey;

        if (filter.type === FILTER_TYPE.AND) {
            if (operatorKey in andCondition) andCondition[operatorKey]()
            else andCondition["default"]()


        }
        if (filter.type === FILTER_TYPE.OR) {
            if (operatorKey in orCondition) orCondition[operatorKey]()
            else orCondition["default"]()
        }
    }

    validateLikeOrIlikeOperator(filter: Filters) {
        if (filter.operator === COMPARISION_OPERATORS.like || filter.operator === COMPARISION_OPERATORS.ilike) {
            filter.value = `%${filter.value}%`
        }
    }

    validateInNotInOperator(filter: Filters) {
        if (filter.operator === COMPARISION_OPERATORS.notIn || filter.operator === COMPARISION_OPERATORS.in) {
            filter.value = (filter.value as string).split(", ")
        }
    }

    validateBetweenOperator(filter: Filters) {
        if (filter.operator === COMPARISION_OPERATORS.between) {
            const valuesSplited = (filter.value as string).split(", ");
            if (valuesSplited.length !== 2) {
                throw new Error("Between must have 2 values");
            }

            filter.value = (filter.value as string).split(", ")
        }
    }
}
