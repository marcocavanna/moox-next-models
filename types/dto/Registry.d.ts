import { DtoType } from './_utils';

import { RegistryEntity } from '../entity';


export namespace Registry {

  export interface Manage {
    /** Registry Type */
    type: DtoType.Nullable<string>,

    /** The registry Typology */
    typology: RegistryEntity.Typology;

    /** Registry Detail for Individual Typology */
    firstName: DtoType.Nullable<string>,

    /** Registry Detail for Individual Typology */
    lastName: DtoType.Nullable<string>,

    /** Registry Detail for Company Typology */
    companyName: DtoType.Nullable<string>,

    /** Registry Detail for Company Typology */
    companyPayoff: DtoType.Nullable<string>,

    /** Financial Detail */
    parent: DtoType.Nullable<string>,

    /** Financial Detail */
    fiscalCode: DtoType.Nullable<string>,

    /** Financial Detail */
    vatNumber: DtoType.Nullable<string>,

    /** Email Value */
    emails: DtoType.Nullable<DtoType.Array<{ isFavorite: boolean, value: DtoType.Nullable<string> }>>,

    /** Phone Value */
    phones: DtoType.Nullable<DtoType.Array<{ isFavorite: boolean, value: DtoType.Nullable<string> }>>,
  }

  export interface ManageReference {
    /** The Label */
    label: DtoType.Nullable<string>;

    /** The reference Value */
    value: string;
  }
}
