import { Guards } from "./guards";
import { ValueObject } from "./valueObject";

export class ValueObjectEnum<T extends string | number | boolean> extends ValueObject<T> {
    constructor(field: string, value: T, validValues: Record<string, T>, nullable = false) {
        super(field, value)

        if (!nullable && !value) {
            throw new Error(`${field}: The value cannot be null`);
        }
        if (nullable && !value) {
            return;
        }

        Guards.enumValues<T>(value, validValues)
    }
}