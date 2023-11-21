export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
  };

  export enum ACCOUNT_STATUS {
    APPROVED = 'approved',
    DENIED = 'disapproved',
    UNDER_REVIEW = 'under review',
    BANNED = 'banned',
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    HIBERNATED = 'hibernated',
    CLOSED = 'closed',
  }