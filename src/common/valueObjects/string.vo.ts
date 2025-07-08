import { Guards } from "./guards";
import { ValueObject } from "@common/valueObjects"

export class ValueObjectString extends ValueObject<string>{
    constructor(
        field: string,
        value: string,
        nullable = false
    ) {
        super(field,value);
        if (!value && !nullable) {
            throw new Error(`${this.field}: the value cannot be null`);
        }
        Guards.stringType(field,value)
        return;
    }



}