import * as mongoose from 'mongoose';

import { APIResponse, AugmentedSchema, PopulableCollection, PopulableField } from '../generic';

import { TeamEntity } from './Team';
import { UserEntity } from './User';


export namespace TaskEntity {

  /** Set of populable model path */
  export type PopulableFields = 'assignees' | 'team' | 'watchers';

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
    /** Task additional watchers */
    additionalWatchers: PopulableCollection<UserEntity.Document, 'watchers', PopulatedPath>;

    /** Assigned Users */
    assignees: PopulableCollection<UserEntity.Document, 'assignees', PopulatedPath>;

    /** Task Description */
    description: Description;

    /** Task Due Date */
    dueDate: number;

    /** Task is marked as Urgent */
    isUrgent: boolean;

    /** Task subtask */
    subtasks: Subtasks;

    /** Related Team */
    team: PopulableField<TeamEntity.Document, 'team', PopulatedPath>;

    /** Task Title */
    title: string;
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
    /** All tasks watchers */
    watchers: PopulableCollection<UserEntity.Document, 'watchers', PopulatedPath>;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }


  /**
   * Description is a reach object, to save
   * edit and creation date
   */
  export interface Description {
    /** Created on timestamp */
    createdOn: number;

    /** Edited on timestamp */
    editedOn: number;

    /** A small preview */
    preview: string;

    /** The text */
    text: string;
  }


  /**
   * SubTask is a small checklist item
   */
  export type Subtasks = mongoose.Types.DocumentArray<mongoose.Types.Embedded & Subtask>;

  export interface Subtask {
    /** Subtask creation timestamp */
    createdOn: number;

    /** Subtask Description */
    description: string;

    /** Subtask edited timestamp */
    editedOn: number;

    /** Is resolved check */
    isResolved: boolean;

    /** Resolved timestamp */
    resolvedOn: number;
  }
}
