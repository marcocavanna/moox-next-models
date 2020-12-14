import * as mongoose from 'mongoose';


/* --------
 * Base Types & Interfaces
 * -------- */

export type AnyObject = { [key: string]: any };

/**
 * @type JsonObject
 *
 * @description
 * Used to define object passed through
 * an API call. The result of this operation
 * is a Plain object, without function field
 */
export type JsonArray<T> = T extends ArrayLike<infer U>
  ? T extends mongoose.Types.DocumentArray<U>
    ? JsonSubDocument<U>[]
    : JsonObject<U>[]
  : never;

export type JsonObject<T> = {
  [K in keyof T]: T[K] extends (string | number | boolean)
    ? T[K]
    : T[K] extends ArrayLike<any>
      ? JsonArray<T[K]>
      : T[K] extends (mongoose.MongooseDocument | {})
        ? JsonObject<T[K]>
        : T[K] extends mongoose.Types.ObjectId
          ? string
          : T[K]
};

export type JsonSubDocument<T> = JsonObject<T & { _id: string, id: string }>;


/**
 * @type PopulableField
 *
 * @description
 * A Populable Field is a plain mongoose
 * Object ID field that could be populated
 * while performing mongoose query
 */
export type PopulableField<Document extends mongoose.Document,
  Key,
  PopulatedPath> = Key extends PopulatedPath
  ? Document
  : mongoose.Types.ObjectId;

export type PopulableCollection<Document extends mongoose.Document,
  Key, PopulatedPath> = Key extends PopulatedPath
  ? mongoose.Types.DocumentArray<Document>
  : mongoose.Types.ObjectId[];

export type PopulableVirtualField<Document extends mongoose.Document,
  Key,
  PopulatedPath> = Key extends PopulatedPath
  ? Document
  : undefined;

export type PopulableVirtualCollection<Document extends mongoose.Document,
  Key, PopulatedPath> = Key extends PopulatedPath
  ? mongoose.Types.DocumentArray<Document>
  : undefined;
