export interface USER_INFO {
  id?: string;
  name: string; // req
  email?: string;
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
  platformKey: string;
  platformName: string;
  contactValue: string;
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