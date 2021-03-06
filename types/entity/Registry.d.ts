import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, PopulableField, PopulableVirtualCollection } from '../generic';

import { RegistryTypeEntity } from './RegistryType';


export namespace RegistryEntity {

  /** The set of the populable path */
  export type PopulableFields = void | 'children' | 'parent' | 'type' | 'related';

  /**
   * The Reference interface will be used to
   * define each phone/mail/web registry reference
   */
  export interface Reference {
    /** Reference is favorite */
    isFavorite: boolean;

    /** Reference Label */
    label?: string;

    /** The reference value */
    value: string;
  }

  export type ReferenceType = 'address' | 'email' | 'phone' | 'web';

  /**
   * The Address interface will be used to
   * define each single registry address
   */
  export interface Address {
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

  export type Typology = 'individual' | 'company';


  /**
   * The Model is used to create a new Entity
   * keep in mind that the created entity will not be
   * saved on Database unless the .save() function will be called
   */
  export interface Model<PopulatedPath extends PopulableFields = void>
    extends Statics, mongoose.Model<Document<PopulatedPath>> {
  }


  /**
   * The document is the remapped entity received from database
   * this document will have virtuals and methods defined
   * into entity schema
   */
  export interface Document<PopulatedPath extends PopulableFields = void>
    extends AugmentedSchema<Schema<PopulatedPath>>,
      Methods,
      AugmentedSchema<Virtuals<PopulatedPath>>,
      mongoose.Document {
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export type JSON<PopulatedPath extends PopulableFields = void> = APIResponse<AugmentedSchema<Schema<PopulatedPath>>
    & AugmentedSchema<Virtuals<PopulatedPath>>>
    & {
    _id: string;
    id: string;
  };


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema<PopulatedPath extends PopulableFields = void> {
    /** Address List */
    addresses: Address[];

    /** The company Claim */
    companyPayoff?: string | null;

    /** The company name */
    companyName?: string | null;

    /** Emails List */
    emails: Reference[];

    /** Non registry company firstName */
    firstName?: string | null;

    /** The registry fiscalCode */
    fiscalCode?: string | null;

    /** Non registry company lastName */
    lastName?: string | null;

    /** The Parent Registry */
    parent?: PopulableField<Document, 'parent', PopulatedPath> | null

    /** Phones List */
    phones: Reference[];

    /** Related Team */
    team: mongoose.Types.ObjectId;

    /** Registry Type */
    type: PopulableField<RegistryTypeEntity.Document, 'type', PopulatedPath> | null;

    /** Registry Typology */
    typology: Typology;

    /** The Registry VAT Number */
    vatNumber?: string | null;

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
  export interface Virtuals<PopulatedPath extends PopulableFields = void> {
    /** Registry display name */
    displayName: string;

    /** Registry display sub name */
    displaySubName: string | null;

    /** Children Registries */
    children: PopulableVirtualCollection<RegistryEntity.Document, 'children', PopulatedPath>

    /** Registry Initials */
    initials: string;

    /** Check if registry is Company */
    isCompany: boolean;

    /** Primary Fiscal */
    primaryFiscal: string | null;

    /** The primary email */
    primaryEmail: Reference | null;

    /** The primary phone */
    primaryPhone: Reference | null;

    /** Related Registries */
    related: PopulableVirtualCollection<RegistryEntity.Document, 'related', PopulatedPath>

    /** Secondary Fiscal */
    secondaryFiscal: string | null;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
