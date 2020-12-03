import * as mongoose from 'mongoose';

/* --------
 * Base Types & Interfaces
 * -------- */

export type AnyObject = { [key: string]: any };

/**
 * @type APIResponse
 *
 * @description
 * Used to define object passed through
 * an API call. The result of this operation
 * is a Plain object, without function field
 */
export type APIResponse<T> = {
  [K in keyof T]: T[K] extends (() => (void | any | Promise<any> | Promise<void> | mongoose.Document))
    ? never
    : T[K] extends mongoose.Types.ObjectId
      ? string
      : T[K] extends (object | mongoose.Document)
        ? APIResponse<T[K]>
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
