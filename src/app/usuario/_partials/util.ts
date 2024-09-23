import { RegisterData } from "../registrar/_partials/util";
import { DwellingData2 } from "../vivienda/_partials/utils";

/**
 * Represents the data structure for a user, including registration and dwelling information.
 */
export interface UserData extends RegisterData, DwellingData2 {
  id: string;
  images: string[];
  selfie: string;
}

/**
 * Metadata information for paginated responses.
 */
export interface Metadata {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Structure of the response containing user data and pagination metadata.
 */
export interface UserResponse {
  users: UserData[];
  metadata: Metadata;
}
