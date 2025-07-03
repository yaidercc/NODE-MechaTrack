import { Guards } from "./guards";
import { ValueObject } from "@common/valueObjects"

export class ValueObjectInt extends ValueObject<number> {
    constructor(field: string, value: number, nullable = false) {
        super(field, value)
        if (!value && !nullable) {
            throw new Error(`${this.field}: the value cannot be null`);
        }
        Guards.integerType(value);
    }
}
