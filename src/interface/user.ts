export interface USER_INFO {
  id: string;
  name: string;
  email: string;
  description: string;
  shortcut: string;
  job: string;
  avatar: string;
  contacts: Contact[];
  backgrounds: string[];
  package: Package;
}

interface Package {
  id: string;
  packageName: string;
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