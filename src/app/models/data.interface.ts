export interface Data {
  quotes: Quote[];
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
}

export interface Quote {
  listingKey: string;
  fields: Fields;
  links: Link[];
}

export interface Fields {
  LVAL_NORM: FieldData;
  CLOSE_ADJ_NORM: FieldData;
  NC2_NORM: FieldData;
  NC2_PR_NORM: FieldData;
  PY_CLOSE: FieldData;
  TUR: FieldData;
  VOL: FieldData;
  YTD_PR_NORM: FieldData;
}

export interface FieldData {
  d: Date;
  dly: number;
  gen: number;
  v: number;
  z: number;
}
