import { ValueObject } from "./valueObject"
import { validate } from "uuid"

export class ValueObjectId extends ValueObject<string> {
    constructor(field: string, value: string, nullable = false) {
        super(field, value);

        if (!value && !nullable) {
            throw new Error(`${this.field}: the value cannot be null.`);
        }

        this.ensureValueObjectUuid(value)
    }

    private ensureValueObjectUuid(value: string) {
        if (!validate(value)) {
            throw new Error(`${this.field}: Invalid value ${value} for object uuid`);
        }
    }

}
