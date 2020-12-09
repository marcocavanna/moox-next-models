import * as mongoose from 'mongoose';

import { JsonObject, PopulableField, PopulableVirtualCollection } from '../generic';
import { TeamEntity } from './Team';


export namespace RegistryEntity {

  /** The set of the populable path */
  export type PopulableFields = 'team' | 'related';

  /**
   * The Reference interface will be used to
   * define each phone/mail/web registry reference
   */
  export interface Reference {
    /** The reference id */
    _id: mongoose.Types.ObjectId;

    /** Reference is favorite */
    isFavorite: boolean;

    /** Reference Label */
    label: string;

    /** The reference value */
    value: string;
  }

  /**
   * The Address interface will be used to
   * define each single registry address
   */
  export interface Address {
    _id: mongoose.Types.ObjectId;

    city?: string;

    country?: string;

    emails: Reference[];

    isFavorite: boolean;

    isHeadQuarter: boolean;

    isRegisteredOffice: boolean;

    isShipmentOffice: boolean;

    label: string;

    phones: Reference[];

    state?: string;

    street?: string;

    webs: Reference[];

    zipCode?: string;
  }

  /**
   * Registry could have several Type
   */
  export type Type = 'individual' | 'company';

  /**
   * The Model is used to create a new Entity
   * keep in mind that the created entity will not be
   * saved on Database unless the .save() function will be called
   */
  export interface Model<PopulatedPath extends PopulableFields = never>
    extends Statics, mongoose.Model<Document<PopulatedPath>> {
    _id: mongoose.Types.ObjectId;

    id: string;
  }


  /**
   * The document is the remapped entity received from database
   * this document will have virtuals and methods defined
   * into entity schema
   */
  export interface Document<PopulatedPath extends PopulableFields = never>
    extends Schema<PopulatedPath>, Methods, Virtuals<PopulatedPath>, mongoose.Document {
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export interface JSON<PopulatedPath extends PopulableFields = never>
    extends JsonObject<Schema<PopulatedPath> & Virtuals<PopulatedPath>> {
    _id: string;

    id: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema<PopulatedPath extends PopulableFields = never> {
    /** Address List */
    addresses: Address[];

    /** The company name */
    companyName?: string;

    /** Emails List */
    emails: Reference[];

    /** Non registry company firstName */
    firstName?: string;

    /** The registry fiscalCode */
    fiscalCode?: string;

    /** Get or Set if Registry is a Customer */
    isCustomer: boolean;

    /** Get or Set if Registry is a Supplier */
    isSupplier: boolean;

    /** Non registry company lastName */
    lastName?: string;

    /** The Parent Registry */
    parent?: PopulableField<Document, 'parent', PopulatedPath>

    /** Phones List */
    phones: Reference[];

    /** Related Team */
    team: PopulableField<TeamEntity.Document, 'team', PopulatedPath>

    /** Registry Type */
    type: Type;

    /** The Registry VAT Number */
    vatNumber?: string;

    /** Webs and Social References */
    webs: Reference[];
  }


  /**
   * Describe all methods that each entity document have
   * and that could use once they are mapped into document
   */
  export interface Methods {
  }


  /**
   * Describe all virtuals field
   */
  export interface Virtuals<PopulatedPath extends PopulableFields = never> {
    /** Related Contacts */
    related?: PopulableVirtualCollection<Document, 'related', PopulatedPath>
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
