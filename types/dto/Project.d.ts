import { ProjectEntity } from '../entity';

import { DtoType } from './_utils';


export namespace Project {

  export interface Manage {
    /** Project Assignees */
    assignees: DtoType.Nullable<DtoType.Array<string>>;

    /** Project Budget Cost */
    budgetCost: DtoType.Nullable<number>;

    /** Project Budget Hours */
    budgetHours: DtoType.Nullable<number>;

    /** Project Billing Method */
    billingMethod: DtoType.Nullable<ProjectEntity.BillingMethod>;

    /** Project Code */
    code: string;

    /** Project Description */
    description: DtoType.Nullable<string>;

    /** Project Due Date */
    dueDate: DtoType.Nullable<number>;

    /** Set if project is billable */
    isBillable: boolean;

    /** Project Name */
    name: string;

    /** Project Manager Relationship */
    projectManager: string;

    /** Related Registries */
    registries: DtoType.Nullable<DtoType.Array<string>>;

    /** Project Start Date */
    startDate: number;
  }

}
