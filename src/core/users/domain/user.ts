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
        this._name = new ValueObjectString("name", userParams.name)
        this._last_name = new ValueObjectString("last_name", userParams.last_name)
        this._email = new ValueObjectEmail(userParams.email)
        this._password = new ValueObjectPassword(userParams.password)
        this._phone = new ValueObjectPhone(userParams.phone)
        this._general_role_id = new ValueObjectId("general_role_id", userParams.general_role_id)
        this.setCreated_at = userParams.created_at
        this.setUpdated_at = userParams.updated_at ?? null
        this.setDeleted_at = userParams.deleted_at ?? null
    }



    static create(dto: UserInterface) {
        return new User(dto)
    }

    get id() {
        return super.id
    }

    get name(): ValueObjectString {
        return this._name
    }


    get last_name(): ValueObjectString {
        return this._last_name
    }

    get email(): ValueObjectEmail {
        return this._email
    }


    get password(): ValueObjectPassword {
        return this._password
    }

    get phone(): ValueObjectPhone {
        return this._phone
    }

    get created_at(){
        return super.created_at
    }
    get updated_at() {
        return super.updated_at
    }
    get deleted_at() {
        return super.deleted_at
    }


    get general_role_id(): ValueObjectId {
        return this._general_role_id
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

