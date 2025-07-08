import { Guards, ValueObjectString } from "@common/index";

export class ValueObjectPhone extends ValueObjectString {
    constructor(value: string) {
        super("email", value);
        Guards.validatePhone(value);
    }

     get value(): string {
    return super.value;
  }
}