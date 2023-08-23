export interface IUserModel {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: string[];
  requiredActions: string[];
  notBefore: 0;
  access: Access;
  groups: IGroupModel[];
  sessions: ISessions[];
}

export interface IGroupModel {
  id: string;
  name: string;
  path: string;
  subGroups: string;
}

export interface ISessions {
  id: string;
  username: string;
  userId: string;
  ipAddress: string;
  start: number;
  lastAccess: number;
  rememberMe: boolean;
}

export interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: true;
}

export interface CreateUserRequestModel {
  email: string;
  enabled: boolean;
  groupName: string;
  password: string;
}

export interface UpdateUserRequestModel {
  enabled: boolean;
  groupName?: string;
  password?: string;
}

export interface UpdateUserRequestParams extends UpdateUserRequestModel {
  id: string;
}

export interface CreateUserResponseModel {
  isSuccess: boolean;
}

export interface UpdateUserResponseModel extends CreateUserResponseModel {
  user: IUserModel;
}

export interface UserInfo {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  realm_access: RealmAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  groupsMembership: string[];
  given_name: string;
  family_name: string;
  email: string;
  Object: undefined;
}

export interface RealmAccess {
  roles: string[];
}

export interface ChangePasswordResponse {
  isSuccess: boolean;
}

export interface ChangePasswordRequest {
  newPassword: string;
  oldPassword: string;
}
