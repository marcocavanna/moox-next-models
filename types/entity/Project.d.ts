import * as mongoose from 'mongoose';

import {
  APIResponse,
  AugmentedSchema,
  PopulableCollection,
  PopulableField,
  PopulableVirtualCollection
} from '../generic';

import { RegistryEntity } from './Registry';
import { TaskEntity } from './Task';
import { TypeEntity } from './Type';
import { UserEntity } from './User';


export namespace ProjectEntity {

  /** Set of populable model path */
  export type PopulableFields = void | 'assignees' | 'projectManager' | 'registries' | 'tasks' | 'types';

  /** Project Billing Method */
  export type BillingMethod = 'hourly' | 'forfait';

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
    /** User Assigned to Project */
    assignees: PopulableCollection<UserEntity.Document, 'assignees', PopulatedPath>;

    /** The budget cost */
    budgetCost: number;

    /** The budget hours */
    budgetHours: number;

    /** The billing method */
    billingMethod: BillingMethod;

    /** Project Code */
    code: string;

    /** Free project description */
    description?: string;

    /** Project due date */
    dueDate?: number;

    /** Project hourly value */
    hourlyBillableValue: number;

    /** Check if this project has been archived */
    isArchived?: boolean;

    /** Set if project is billable */
    isBillable?: boolean;

    /** The project name */
    name: string;

    /** The project leader */
    projectManager?: PopulableField<UserEntity.Document, 'projectManager', PopulatedPath>;

    /** Related Registries */
    registries: PopulableCollection<RegistryEntity.Document, 'registries', PopulatedPath>;

    /** The project slug, created using name */
    slug?: string;

    /** Project start date */
    startDate: number;

    /** Related team */
    team: mongoose.Types.ObjectId;
  }


  /**
   * Describe all methods that each entity document have
   * and that could use once they are mapped into document
   */
  export interface Methods {
    /** Return the Document Slug */
    getSlug(): Promise<string>;
  }


  /**
   * Describe all virtuals field
   */
  export interface Virtuals<PopulatedPath extends PopulableFields = void> {
    /** All task related to project */
    tasks: PopulableVirtualCollection<TaskEntity.Document, 'tasks', PopulatedPath>;

    /** All task statues */
    taskStatues: PopulableVirtualCollection<TypeEntity.Document, 'types', PopulatedPath>;

    /** All task types */
    taskTypes: PopulableVirtualCollection<TypeEntity.Document, 'types', PopulatedPath>;

    /** All types related to project */
    types: PopulableVirtualCollection<TypeEntity.Document, 'types', PopulatedPath>;
  }


  /**
   * Describe all Statics method attached to
   * model class
   */
  export interface Statics {
  }

}
