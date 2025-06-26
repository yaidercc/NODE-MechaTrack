import { AggregateRoot, ValueObjectId, ValueObjectString } from "@common/index";
import { User as UserInterface } from "../interfaces/user.interface"
import { ValueObjectEmail } from "./valueObjects/valueObjectsEmail";
import { ValueObjectPassword } from "./valueObjects/valueObjectPassword";
import { ValueObjectPhone } from "./valueObjects/valueObjectPhone";

export class User extends AggregateRoot<UserInterface> {

    private _name: ValueObjectString;
    private _last_name: ValueObjectString;
    private _email: ValueObjectEmail;
    private _password: ValueObjectPassword;
    private _phone: ValueObjectPhone;
    private _general_role_id: ValueObjectId;

    constructor(
        private userParams: UserInterface
    ) {
        super(userParams.id);
        this._name = new ValueObjectId("name", userParams.name)
        this._last_name = new ValueObjectId("last_name", userParams.last_name)
        this._email = new ValueObjectEmail(userParams.email)
        this._password = new ValueObjectPassword(userParams.password)
        this._phone = new ValueObjectPhone(userParams.password)
        this._general_role_id = new ValueObjectId("general_role_id", userParams.general_role_id)
    }

    static create(dto: UserInterface) {
        return new User(dto)
    }

    get name() {
        return this._name.value
    }


    get last_name() {
        return this._last_name.value
    }

    get email() {
        return this._email.value
    }


    get password() {
        return this._password.value
    }

    get phone() {
        return this._phone.value
    }


    get general_role_id() {
        return this._general_role_id.value
    }

    set name(value: string) {
        if (value !== this._name.value) {
            this._name = new ValueObjectString('name', value);
            this.changedAttributes.name = value;
        }
    }

    set last_name(value: string) {
        if (value !== this._last_name.value) {
            this._last_name = new ValueObjectString('last_name', value);
            this.changedAttributes.last_name = value;
        }
    }

    set password(value: string) {
        if (value !== this._password.value) {
            this._password = new ValueObjectPassword(value);
            this.changedAttributes.password = value;
        }
    }

    set general_role_id(value: string) {
        if (value !== this._general_role_id.value) {
            this._general_role_id = new ValueObjectId("general_role_id", value);
            this.changedAttributes.general_role_id = value;
        }
    }

    set phone(value: string) {
        if (value !== this._phone.value) {
            this._phone = new ValueObjectPhone(value);
            this.changedAttributes.phone = value;
        }
    }

    set email(value: string) {
        if (value !== this._email.value) {
            this._email = new ValueObjectEmail(value);
            this.changedAttributes.email = value;
        }
    }

}