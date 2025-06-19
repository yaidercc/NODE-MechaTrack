import { ValueObjectId, ValueObjectTimeStamp } from "@common/index";

type ChangedAttributes<T> = Partial<T> & {
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
}



export class AggregateRoot<T> {
    protected changedAttributes: ChangedAttributes<T> = {}

    private id: ValueObjectId
    private created_at?: ValueObjectTimeStamp
    private updated_at?: ValueObjectTimeStamp | null
    private deleted_at?: ValueObjectTimeStamp | null

    constructor(
        private recordId: string
    ) {
        this.id = new ValueObjectId('id', recordId)
    }

    get Id() {
        return this.id
    }

    get ChangedAttributes() {
        return this.changedAttributes
    }

    flusChanges() {
        this.changedAttributes = {} as ChangedAttributes<T>;
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

    get Created_at() {
        return this.created_at?.value;
    }
    get Updated_at() {
        return this.updated_at?.value;
    }
    get Deleted_at() {
        return this.deleted_at?.value;
    }

    set Created_at(value: Date) {
        if (this.created_at === null || this.created_at === undefined) {
            this.created_at = new ValueObjectTimeStamp('created at', value);
        }
    }
    set Updated_at(value: Date) {
        this.updated_at = new ValueObjectTimeStamp('updated at', value, true);
        if (value !== null && value !== undefined) {
            this.changedAttributes.updated_at = this.updated_at.value;
        }
    }

    set Deleted_at(value: Date) {
        this.deleted_at = new ValueObjectTimeStamp('deleted at', value, true);
        if (value !== null && value !== undefined) {
            this.changedAttributes.deleted_at = this.deleted_at.value;
        }
    }
}