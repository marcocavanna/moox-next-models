import * as mongoose from 'mongoose';

import { JsonObject, PopulableCollection } from '../generic';
import { RoleEntity } from './Role';


export namespace TeamEntity {

  /** Set of populable model path */
  export type PopulableFields = 'roles';


  /**
   * The Model is used to create a new Entity
   * keep in mind that the created entity will not be
   * saved on Database unless the .save() function will be called
   */
  export interface Model<PopulatedPath extends PopulableFields = never>
    extends Statics, mongoose.Model<Document<PopulatedPath>> {
  }


  /**
   * The document is the remapped entity received from database
   * this document will have virtuals and methods defined
   * into entity schema
   */
  export interface Document<PopulatedPath extends PopulableFields = never>
    extends Schema<PopulatedPath>, Methods, Virtuals<PopulatedPath>, mongoose.Document {
    _id: mongoose.Types.ObjectId;

    id: string;
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
    /** The default role, used on User Creation */
    defaultRole: mongoose.Types.ObjectId;

    /** The Team Name */
    name: string;

    /** All roles related to Teams */
    roles: PopulableCollection<RoleEntity.Document, 'roles', PopulatedPath>

    /** The team slug */
    slug?: string;
  }


  /**
   * Describe all methods that each entity document have
   * and that could use once they are mapped into document
   */
  export interface Methods {
    /**
     * Get a safe, unique and usable slug for a team
     * if team slug is already defined, return itself
     */
    getSlug(): Promise<string>;
  }


  /**
   * Describe all virtuals field
   */
  export interface Virtuals<PopulatedPath extends PopulableFields = never> {
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
