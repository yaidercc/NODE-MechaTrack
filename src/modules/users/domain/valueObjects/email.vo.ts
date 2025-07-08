import { Guards, ValueObjectString,  } from "@common/index";

export class ValueObjectEmail extends ValueObjectString {
    constructor(value: string, nullable = false) {
        super("email", value);
        if (!value && !nullable) {
            throw new Error(`${this.field}: the value cannot be null.`);
        }
        Guards.validateEmail(value);
    }
    get value(): string {
        return super.value;
    }
}