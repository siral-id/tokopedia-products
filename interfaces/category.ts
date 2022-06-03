/*
 *
 * CATEGORy
 * **/

export interface ITokopediaCategoryDetail {
  id: string;
  name: string;
  title: string;
  breadcrumbURL: string;
}

export interface ITokopediaCategory {
  detail: ITokopediaCategoryDetail[];
}
