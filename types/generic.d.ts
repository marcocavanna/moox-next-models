import * as mongoose from 'mongoose';


export type {
  MongoDBAggregationInstruction
} from './miscellaneous/mongodb-aggregation';

export * from './miscellaneous/mongoose-development-types';


/* --------
 * Base Types & Interfaces
 * -------- */

export type AnyObject = { [key: string]: any };

export type Nullable<T> = T | null;


/**
 * @type APIResponse
 *
 * @description
 * Used to define object passed through
 * an API call. The result of this operation
 * is a Plain object, without function field
 */

type PrimitiveType = string | number | boolean;

/** Convert Original ObjectID into String */
type ObjectIDConversion<T> = T extends mongoose.Types.ObjectId
  ? string
  : T;

/** Deep Transform a Document object into a plain Object */
type DeepCreateObjectTransformer<T> = T extends PrimitiveType | PrimitiveType[]
  ? T
  : T extends mongoose.Types.DocumentArray<infer U>
    ? Array<DeepCreateObjectTransformer<U>>
    : T extends mongoose.Types.ObjectId
      ? string
      : T extends object
        ? {
          [V in keyof mongoose.NonFunctionProperties<mongoose.OmitReadonly<T>>]: T[V] extends object
            ? DeepCreateObjectTransformer<T[V]>
            : ObjectIDConversion<T[V]>
        }
        : ObjectIDConversion<T>;

/** Convert a Backend Object into an API Response */
export type APIResponse<T> = T extends Array<infer U>
  ? Array<DeepCreateObjectTransformer<U>>
  : DeepCreateObjectTransformer<T>;

export type Populated<Document extends mongoose.Document, Key extends keyof Document> = Omit<Document, Key> & {
  [Path in Key]: Exclude<Document[Path], EmptyVirtual | mongoose.Types.ObjectId | mongoose.Types.ObjectId[]>
};

export type AugmentedSchema<Schema> = {
  [Path in keyof Schema]: Schema[Path] extends Array<infer U>
    ? U extends (string | number | boolean | null | undefined)
      ? U[]
      : mongoose.Types.DocumentArray<U & mongoose.Types.Embedded>
    : Schema[Path]
};


/**
 * @type PopulableField
 *
 * @description
 * A Populable Field is a plain mongoose
 * Object ID field that could be populated
 * while performing mongoose query
 */
export type EmptyVirtual = undefined;

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
  : EmptyVirtual;

export type PopulableVirtualCollection<Document extends mongoose.Document,
  Key, PopulatedPath> = Key extends PopulatedPath
  ? mongoose.Types.DocumentArray<Document>
  : EmptyVirtual;


export type APINamespace =
  | 'projects'
  | 'registries'
  | 'registry-types'
  | 'roles'
  | 'teams'
  | 'types'
  | 'users';
