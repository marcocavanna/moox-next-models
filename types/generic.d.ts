import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';


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
export type JsonObject<T> = {
  [K in keyof T]: T[K] extends (() => (void | any | Promise<any> | Promise<void> | mongoose.Document))
    ? never
    : T[K] extends (mongoose.Types.ObjectId | mongodb.ObjectId)
      ? string
      : T[K] extends mongoose.Types.DocumentArray<infer P>
        ? JsonObject<P>[]
        : T[K] extends (object | mongoose.Document)
          ? JsonObject<Omit<T[K], keyof mongoose.Document>>
          : T[K]
};


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
