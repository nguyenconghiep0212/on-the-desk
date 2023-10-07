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


export interface GALLERY_CUSTOMER {
  customerShortcut: string;
  galleryShortcut: string;
  customerName: string;
  galleryName: string;
  galleryThumb: string;
  topPictures:PICTURE[]
}

interface PICTURE {
  name:string;
  ref:string;
  caption:string;
  index:number;
  dimension:string;
  sizeOnDisk:number;
}
 