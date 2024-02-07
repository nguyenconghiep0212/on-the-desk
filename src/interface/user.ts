export interface USER_INFO {
  id?: string;
  name: string; // req
  email?: string;
  isOwner?:boolean;
  description?: string;
  shortcut: string; // req
  job?: string;
  avatar?: string;
  contacts?: Contact[];
  backgrounds?: string[];
  package: Package; // req
}

interface Package {
  id: string; // req
  packageName?: string;
}

interface Contact {
  id: string;
  typeContact: string;
  nameContact: string;
  keyContact: string;
  infoDetail: string;
  templateId: string;
  linkIcon: string;
  backgroundColor: string;
  status: number;
} 

export interface USER_PACKAGE {
    id: string;
    packageId: string;
    key: string;
    config: PACKAGE_CONFIG;
    index: number;
   
} 

interface PACKAGE_CONFIG {
    alias: string ;
    data: any[]
}