import {
  UserEntity,
  RegistryEntity,
  RegistryTypeEntity,
  TeamEntity, RoleEntity
} from './entity';


export namespace APIResponse {

  /* --------
   * Auth Specific Responses
   * -------- */
  export namespace Auth {

    // ----
    // API Response Object
    // ----
    export interface Login<UserDataType = User> {
      userData: UserDataType,

      refreshToken: RefreshToken,

      accessToken: AccessGrant
    }

    export interface AccessGrant {
      token: AccessToken;

      email: string;

      expiresAt: number;

      roles: string[];
    }


    /** Tokens used to make API Call */
    export type RefreshToken = string;

    export type AccessToken = string;


    /** User Data */
    export type User = UserEntity.JSON<'teams.role' | 'teams.team'>;
  }


  /* --------
   * Registries Responses
   * -------- */
  export namespace Registries {

    export type Single<PopulatedPath extends RegistryEntity.PopulableFields = never> =
      RegistryEntity.JSON<PopulatedPath>;

    export type List<PopulatedPath extends RegistryEntity.PopulableFields = never> = Single<PopulatedPath>[];

  }


  /* --------
   * Registry Types Responses
   * -------- */
  export namespace RegistryTypes {

    export type Single<PopulatedPath extends RegistryTypeEntity.PopulableFields = never> = RegistryTypeEntity.JSON<PopulatedPath>;

    export type List<PopulatedPath extends RegistryTypeEntity.PopulableFields = never> = Single<PopulatedPath>[];

  }


  /* --------
   * Roles Response
   * -------- */
  export namespace Roles {

    export type Single<PopulatedPath extends RoleEntity.PopulableFields = never> = RoleEntity.JSON<PopulatedPath>;

    export type List<PopulatedPath extends RoleEntity.PopulableFields = never> = Single<PopulatedPath>[];

  }


  /* --------
   * Team Response
   * -------- */
  export namespace Team {

    export type Single<PopulatedPath extends TeamEntity.PopulableFields = never> = TeamEntity.JSON<PopulatedPath>;

    export type List<PopulatedPath extends TeamEntity.PopulableFields = never> = Single<PopulatedPath>[];

  }


  /* --------
   * Users Response
   * -------- */
  export namespace User {

    export type Single<PopulatedPath extends UserEntity.PopulableFields = never> = UserEntity.JSON<PopulatedPath>;

    export type List<PopulatedPath extends UserEntity.PopulableFields = never> = Single<PopulatedPath>[];

  }

}
