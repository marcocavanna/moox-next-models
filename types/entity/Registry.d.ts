import * as mongoose from 'mongoose';

import { APIResponse, PopulableField } from '../generic';
import { TeamEntity } from './Team';


export namespace RegistryEntity {

  /** The set of the populable path */
  export type PopulableFields = 'team';

  /**
   * The Reference interface will be used to
   * define each phone/mail/web registry reference
   */
  export interface Reference {

  }

  /**
   * The Address interface will be used to
   * define each single registry address
   */
  export interface Address {
    _id: string;

    city?: string;

    country?: string;

    emails: Reference[];

    isRegisteredOffice?: boolean;

    isShipmentOffice?: boolean;

    phones: Reference[];

    state?: string;

    street?: string;

    webs: Reference[];

    zipCode?: string;
  }

  /**
   * The Model is used to create a new Entity
   * keep in mind that the created entity will not be
   * saved on Database unless the .save() function will be called
   */
  export interface Model extends Statics, mongoose.Model<Document> {
  }


  /**
   * The document is the remapped entity received from database
   * this document will have virtuals and methods defined
   * into entity schema
   */
  export interface Document<PopulatedPath extends PopulableFields = never>
    extends Schema<PopulatedPath>, Methods, Virtuals, mongoose.Document {
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export interface JSON<PopulatedPath extends PopulableFields = never>
    extends APIResponse<Schema<PopulatedPath> & Virtuals> {
    _id: string;

    id: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema<PopulatedPath extends PopulableFields = never> {
    /** The registry fiscalCode */
    fiscalCode?: string;

    /** Registry head office */
    headOffice?: Address;

    /** Get or Set if Registry is an Active Customer */
    isActiveCustomer: boolean;

    /** Get or Set if Registry is an Active Supplier */
    isActiveSupplier: boolean;

    /** Get or Set if Registry is a Customer */
    isCustomer: boolean;

    /** Get or Set if Registry is a Supplier */
    isSupplier: boolean;

    /** The Registry Name */
    name: string;

    /** The Registry SubName */
    subName?: string;

    /** Related Team */
    team: PopulableField<TeamEntity.Document, 'team', PopulatedPath>

    /** The Registry VAT Number */
    vatNumber?: string;
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
  export interface Virtuals {
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
