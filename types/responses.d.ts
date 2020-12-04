import { UserEntity } from './entity';


export namespace APIResponse {

  export namespace Auth {

    // ----
    // API Response Object
    // ----
    export interface Login<UserDataType = User> {
      userData: UserDataType,

      refreshToken: RefreshToken,

      accessToken: {
        expiresIn: number,
        token: AccessToken
      }
    }


    /** Tokens used to make API Call */
    export type RefreshToken = string;

    export type AccessToken = string;


    /** User Data */
    export type User = UserEntity.JSON<'teams.role' | 'teams.team'>;
  }

}
