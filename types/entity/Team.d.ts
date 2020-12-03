import * as mongoose from 'mongoose';

import { APIResponse, PopulableVirtualCollection } from '../generic';
import { RoleEntity } from './Role';


export namespace TeamEntity {

  /** Set of populable model path */
  export type PopulableFields = 'roles';

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
    extends Schema<PopulatedPath>, Methods, Virtuals<PopulatedPath>, mongoose.Document {
  }


  /**
   * The json interface type define the documents that will
   * be passed to client using API Endpoint response
   */
  export interface JSON<PopulatedPath extends PopulableFields = never>
    extends APIResponse<Schema<PopulatedPath> & Virtuals<PopulatedPath>> {
    _id: string;

    id: string;
  }


  /**
   * Define the Main Schema, describing all field
   * that will be controlled by user and by API
   * this fields will be saved on database
   */
  export interface Schema<PopulatedPath extends PopulableFields = never> {
    /** The Team Name */
    name: string;

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
    /** All roles related to Teams */
    roles: PopulableVirtualCollection<RoleEntity.Document, 'roles', PopulatedPath>
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
