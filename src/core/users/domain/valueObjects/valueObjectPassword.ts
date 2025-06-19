import { Guards, ValueObjectString } from "@common/index";

export class ValueObjectPassword extends ValueObjectString {
    constructor(value: string) {
        super("password", value);
        Guards.validatePassword(value);
    }
}