import { Guards, ValueObjectString } from "../../../../common";

export class ValueObjectPassword extends ValueObjectString {
    constructor(value: string) {
        super("password", value);
        Guards.validatePassword(value);
    }
    get value(): string {
        return super.value;
    }
}