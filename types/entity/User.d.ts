import * as mongoose from 'mongoose';

import { JsonObject, PopulableField, PopulableVirtualField } from '../generic';
import { RoleEntity } from './Role';
import { TeamEntity } from './Team';


export namespace UserEntity {

  /** The set of the populable path */
  export type PopulableFields = 'teams.role' | 'teams.team';

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
    extends Schema<PopulatedPath>, Methods, Virtuals<PopulatedPath>, mongoose.Document {
    _id: mongoose.Types.ObjectId;

    id: string;
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export interface JSON<PopulatedPath extends PopulableFields = void>
    extends JsonObject<Schema<PopulatedPath> & Virtuals<PopulatedPath>> {
    _id: string;

    id: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema<PopulatedPath extends PopulableFields = void> {
    /** The user current team */
    currentTeamId: mongoose.Types.ObjectId;

    /** The user Email */
    email: string;

    /** Verified Email Checker */
    emailVerified?: boolean;

    /** The identity Id */
    identityId: string;

    /** The user Name */
    name: string;

    /** Photo URL Location */
    photoURL?: string;

    /** User settings and Preferences */
    preferences?: Preferences.Schema;

    /** User Team */
    teams: {
      role: PopulableField<RoleEntity.Document, 'teams.role', PopulatedPath>,
      team: PopulableField<TeamEntity.Document, 'teams.team', PopulatedPath>
    }[];

    /** The User Surname */
    surname?: string;
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
    /** User Complete Name */
    completeName: string;

    /** The current user role in team */
    currentRole: PopulableVirtualField<RoleEntity.Document, 'teams.role', PopulatedPath>

    /** The user current team */
    currentTeam: PopulableVirtualField<TeamEntity.Document, 'teams.team', PopulatedPath>

    /** User Initials */
    initials: string;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {

  }

  export namespace Preferences {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    export interface Schema {
      /** Currency Preferences */
      currency: Currency.Schema;

      /** The Date Format */
      dateFormat: string;

      /** The Time Format */
      timeFormat: string;
    }

    export namespace Currency {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      export interface Schema {
        /** Number of Decimals */
        decimalsCount: number;

        /** Decimals Separator Char */
        decimalsSeparator: string;

        /** Currency Format */
        format: string;

        /** Currency Symbol */
        symbol: string;

        /** Thousands Separator Char */
        thousandsSeparator: string;
      }
    }
  }

}
