import { ValueObjectId, ValueObjectTimeStamp } from "@common/index";

type ChangedAttributes<T> = Partial<T> & {
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}



export class AggregateRoot<T> {
    protected _changedAttributes: ChangedAttributes<T> = {}

    private _id: ValueObjectId
    private _created_at?: ValueObjectTimeStamp
    private _updated_at?: ValueObjectTimeStamp | null
    private _deleted_at?: ValueObjectTimeStamp | null

    constructor(
        private recordId: string
    ) {
        this._id = new ValueObjectId('id', recordId)
    }

    get id() {
        return this._id
    }

    get changedAttributes() {
        return this._changedAttributes
    }

    flusChanges() {
        this._changedAttributes = {} as ChangedAttributes<T>;
    }

    update<T extends Object>(dto: T) {
        Object.entries(dto).forEach(([key, value]) => {
            if (!Object.keys(this).includes(key)) {
                throw new Error(`Invalid field: ${key}`);
            }

            const currentValue = typeof (this as any)[key]?.value === 'object'
                ? JSON.stringify((this as any)[key]?.value)
                : (this as any)[key]?.value;

            const newValue = typeof value === 'object' ? JSON.stringify(value) : value;

            if (currentValue !== newValue) (this as any)[key] = value;

        })
    }

    delete(dto: { deleted_at: Date }) {
        if (!dto.hasOwnProperty('deleted_at')) {
            throw new Error("deleted_at cannot be null.");
        }
        this.Deleted_at =  dto.deleted_at
    }

    get created_at() {
        return this._created_at?.value;
    }
    get updated_at() {
        return this._updated_at?.value;
    }
    get deleted_at() {
        return this._deleted_at?.value;
    }

    set Created_at(value: Date) {
        if (this.created_at === null || this.created_at === undefined) {
            this._created_at = new ValueObjectTimeStamp('created at', value);
        }
    }
    set Updated_at(value: Date) {
        this._updated_at = new ValueObjectTimeStamp('updated at', value, true);
        if (value !== null && value !== undefined) {
            this._changedAttributes.updated_at = this.updated_at.value;
        }
    }

    set Deleted_at(value: Date) {
        this._deleted_at = new ValueObjectTimeStamp('deleted at', value, true);
        if (value !== null && value !== undefined) {
            this._changedAttributes.deleted_at = this.deleted_at.value;
        }
    }
}