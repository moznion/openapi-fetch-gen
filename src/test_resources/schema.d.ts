/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * List users
     * @description Retrieve all users with pagination.
     */
    get: operations["listUsers"];
    put?: never;
    /**
     * Create a new user
     * @description Register a new library user.
     */
    post: operations["createUser"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/{userId}": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique user identifier (UUID) */
        userId: components["parameters"]["userId"];
      };
      cookie?: never;
    };
    /**
     * Get user details
     * @description Retrieve detailed information for a specific user.
     */
    get: operations["getUserDetails"];
    /**
     * Replace user
     * @description Replace a user's entire record.
     */
    put: operations["replaceUser"];
    post?: never;
    /**
     * Delete user
     * @description Soft-delete a user record.
     */
    delete: operations["deleteUser"];
    options?: never;
    head?: never;
    /**
     * Update user fields
     * @description Partially update a user's information.
     */
    patch: operations["updateUserFields"];
    trace?: never;
  };
  "/users/{userId}/loans": {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique user identifier (UUID) */
        userId: components["parameters"]["userId"];
      };
      cookie?: never;
    };
    /**
     * List user loans
     * @description Retrieve current loans for a specific user.
     */
    get: operations["listUserLoans"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Search users
     * @description Search for users by multiple criteria.
     */
    post: operations["searchUsers"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/bulk": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Bulk user import
     * @description Upload a CSV file to register multiple users at once.
     */
    post: operations["_bulk-{User}.Imp/ort"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/users/bulk/{jobId}": {
    parameters: {
      query?: never;
      header: {
        /** @description Authorization Header */
        Authorization: string;
        /** @description Application version */
        "Application-Version": string;
        /** @description Identifier of something */
        "Something-Id": string;
      };
      path: {
        /** @description Bulk import job identifier */
        jobId: string;
      };
      cookie?: never;
    };
    /**
     * Get bulk job status
     * @description Retrieve the status of a bulk import job.
     */
    get: {
      parameters: {
        query?: never;
        header: {
          /** @description Authorization Header */
          Authorization: string;
          /** @description Application version */
          "Application-Version": string;
          /** @description Identifier of something */
          "Something-Id": string;
        };
        path: {
          /** @description Bulk import job identifier */
          jobId: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Bulk job status */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": components["schemas"]["BulkJobStatus"];
          };
        };
        400: components["responses"]["BadRequest"];
        401: components["responses"]["Unauthorized"];
        403: components["responses"]["Forbidden"];
        404: components["responses"]["NotFound"];
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    Error: {
      /** @description HTTP status code */
      code: number;
      /** @description Error message detailing the cause */
      message: string;
    };
    User: {
      /** Format: uuid */
      id: string;
      name: string;
      /** Format: email */
      email: string;
      /** @enum {string} */
      membershipType: "REGULAR" | "PREMIUM" | "STUDENT";
      /** Format: date-time */
      registeredAt: string;
      address?: components["schemas"]["Address"];
    };
    Address: {
      postalCode?: string;
      street: string;
      city: string;
      country: string;
    };
    UserCreate: {
      name: string;
      /** Format: email */
      email: string;
      /** @enum {string} */
      membershipType: "REGULAR" | "PREMIUM" | "STUDENT";
      address?: components["schemas"]["Address"];
    };
    UserUpdate: components["schemas"]["UserCreate"] & {
      /** Format: uuid */
      id: string;
    };
    /** @description Schema for partial updates – include only fields to change */
    UserPatch: {
      name?: string;
      /** Format: email */
      email?: string;
      /** @enum {string} */
      membershipType?: "REGULAR" | "PREMIUM" | "STUDENT";
      address?: components["schemas"]["Address"];
    };
    UserList: components["schemas"]["User"][];
    UserPage: {
      total: number;
      page: number;
      pageSize: number;
      items: components["schemas"]["UserList"];
    };
    Loan: {
      /** Format: uuid */
      loanId: string;
      book: components["schemas"]["Book"];
      /** Format: date-time */
      borrowedAt: string;
      /** Format: date-time */
      dueAt: string;
    };
    Book: {
      isbn: string;
      title: string;
      author: string;
    };
    BulkJobStatus: {
      jobId: string;
      /** @enum {string} */
      status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
      processed: number;
      total: number;
    };
    Client: {
      id?: string;
    };
    "schema-Something": {
      id?: string;
    };
  };
  responses: {
    /** @description Bad request due to invalid input */
    BadRequest: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Authentication required or failed */
    Unauthorized: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Insufficient permissions to access resource */
    Forbidden: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Resource not found */
    NotFound: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Conflict with current state of the resource */
    Conflict: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  parameters: {
    /** @description Page number (starting at 1) */
    page: number;
    /** @description Number of items per page */
    pageSize: number;
    /** @description Unique user identifier (UUID) */
    userId: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  listUsers: {
    parameters: {
      query?: {
        /** @description Page number (starting at 1) */
        page?: components["parameters"]["page"];
        /** @description Number of items per page */
        pageSize?: components["parameters"]["pageSize"];
        /** @description Filter by membership type */
        membershipType?: "REGULAR" | "PREMIUM" | "STUDENT";
      };
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description A paginated list of users */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserPage"];
        };
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
    };
  };
  createUser: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreate"];
      };
    };
    responses: {
      /** @description User created successfully */
      201: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      409: components["responses"]["Conflict"];
    };
  };
  getUserDetails: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique user identifier (UUID) */
        userId: components["parameters"]["userId"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description User details */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      404: components["responses"]["NotFound"];
    };
  };
  replaceUser: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique user identifier (UUID) */
        userId: components["parameters"]["userId"];
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserUpdate"];
      };
    };
    responses: {
      /** @description Updated user record */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      404: components["responses"]["NotFound"];
    };
  };
  deleteUser: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique user identifier (UUID) */
        userId: components["parameters"]["userId"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description User deleted (no content) */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      404: components["responses"]["NotFound"];
    };
  };
  updateUserFields: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique user identifier (UUID) */
        userId: components["parameters"]["userId"];
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserPatch"];
      };
    };
    responses: {
      /** @description Updated user record */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      404: components["responses"]["NotFound"];
    };
  };
  listUserLoans: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Unique user identifier (UUID) */
        userId: components["parameters"]["userId"];
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description List of loans */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Loan"][];
        };
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      404: components["responses"]["NotFound"];
    };
  };
  searchUsers: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          /** @description Partial match on user name */
          name?: string;
          /** Format: email */
          email?: string;
          /**
           * Format: date
           * @description Users who joined after this date
           */
          joinedAfter?: string;
          /** @enum {string} */
          membershipType?: "REGULAR" | "PREMIUM" | "STUDENT";
        };
      };
    };
    responses: {
      /** @description Matching users */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserList"];
        };
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
    };
  };
  "_bulk-{User}.Imp/ort": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          /**
           * Format: binary
           * @description CSV file (headers: name,email,membershipType,registeredAt)
           */
          file?: string;
        };
      };
    };
    responses: {
      /** @description Bulk import accepted */
      202: {
        headers: {
          /** @description URL to check bulk job status */
          Location?: string;
          [name: string]: unknown;
        };
        content?: never;
      };
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
    };
  };
}
