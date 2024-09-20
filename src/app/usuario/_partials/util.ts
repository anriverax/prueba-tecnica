import { RegisterData } from "../registrar/_partials/util";
import { DwellingData2 } from "../vivienda/_partials/utils";

export interface UserData extends RegisterData, DwellingData2 {
  id: string;
  images: string[];
  selfie: string;
}

export interface Metadata {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UserResponse {
  users: UserData[];
  metadata: Metadata;
}
