export interface GALLERY {
  customerShortcut: string; // req
  galleryShortcut: string; // req
  customerName: string; // req
  galleryName: string; // req
  galleryThumb?: string;
  galleryImageCount: number; // req
  customerAvatar?: any;
  topics: string[]; // req
}
export interface UPDATE_GALLERY {
  id?: string;
  customerId?: string;
  customerName?: string;
  index?: number;
  name: string;
  data?: GALLERY_DATA[];
  thumb: string;
  topics: string[];
  shortcut: string;
  extended?: boolean;
}

interface GALLERY_DATA {
  name: string;
  ref: string;
  caption: string;
  index: number;
  dimension: string;
  sizeOnDisk: number;
}

export interface GALLERY_CUSTOMER {
  customerShortcut: string;
  galleryShortcut: string;
  customerName: string;
  galleryName: string;
  galleryThumb: string;
  topPictures:PICTURE[];
  extended?: boolean;
}

interface PICTURE {
  name:string;
  ref:string;
  caption:string;
  index:number;
  dimension:string;
  sizeOnDisk:number;
}
 