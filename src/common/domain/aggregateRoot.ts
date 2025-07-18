import { ValueObjectId, ValueObjectTimeStamp } from "../valueObjects";

type ChangedAttributes = {
  [key: string]: any;
  created_at?: ValueObjectTimeStamp | null;
  updated_at?: ValueObjectTimeStamp | null;
  deleted_at?: ValueObjectTimeStamp | null;
};

export abstract class AggregateRoot {
  protected _changedAttributes: ChangedAttributes = {};

  private _id: ValueObjectId;
  private _created_at: ValueObjectTimeStamp | null = null;
  private _updated_at: ValueObjectTimeStamp | null = null;
  private _deleted_at: ValueObjectTimeStamp | null = null;

  constructor(id: string) {
    this._id = new ValueObjectId("id", id);
  }

  get id(): ValueObjectId {
    return this._id;
  }

  get created_at(): ValueObjectTimeStamp | null {
    return this._created_at;
  }

  get updated_at(): ValueObjectTimeStamp | null {
    return this._updated_at;
  }

  get deleted_at(): ValueObjectTimeStamp | null {
    return this._deleted_at;
  }

  get changedAttributes(): ChangedAttributes {
    return this._changedAttributes;
  }

  public flushChanges(): void {
    this._changedAttributes = {};
  }

  public update(dto: Record<string, any>): void {
    for (const [key, value] of Object.entries(dto)) {
      const property = (this as any)[key];

      if (property === undefined) {
        throw new Error(`Invalid field: ${key}`);
      }

      const currentValue = typeof property?.value === 'object'
        ? JSON.stringify(property.value)
        : property?.value;

      const newValue = typeof value === 'object'
        ? JSON.stringify(value)
        : value;
      if (currentValue !== newValue) {
        (this as any)[key] = value;
        this._changedAttributes[key] = value;
      }

    }
  }

  public delete(dto: { deleted_at: string }): void {
    this.update(dto)
  }

  protected set created_at(value: string) {
    if (!this._created_at) {
      this._created_at = new ValueObjectTimeStamp("created_at", value);
    }
  }

  protected set updated_at(value: string | null) {
    this._updated_at = new ValueObjectTimeStamp("updated_at", value, true);

    if (value) {
      this._changedAttributes.updated_at = this.updated_at;
    }
  }

  protected set deleted_at(value: string | null) {
    
    if (value === null || value === undefined) {
        this._deleted_at = null;
        return;
    }

    this._deleted_at = new ValueObjectTimeStamp("deleted_at", value, true);
    if (value) {
        this._changedAttributes.deleted_at = this._deleted_at;
    }
}
}
