import { Guards, ValueObjectString } from "@common/index";

export class ValueObjectEmail extends ValueObjectString {
    constructor(value: string) {
        super("email", value);
        Guards.validateEmail(value);
    }
}