import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, PopulableField } from '../generic';
import { TeamEntity } from './Team';


export namespace RoleEntity {

  /** Set of populable model path */
  export type PopulableFields = void | 'team';

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
    /** Check or set if this role is Team Owner Role */
    isOwner: boolean;

    /** Role Name */
    name: string;

    /** Role rank */
    rank: number;

    /** Related team entity */
    team: PopulableField<TeamEntity.Document, 'team', PopulatedPath>;

    /** Role Working Hour */
    workingHours: mongoose.Types.Subdocument & WorkingHours;
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
    totalWeekHours: number;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }


  /**
   * Single Working Hour object per Roles
   */
  export interface WorkingHours {
    monday: number;

    thursday: number;

    wednesday: number;

    tuesday: number;

    friday: number;

    saturday: number;

    sunday: number;
  }
}
