export interface CARD {
  alignment: string | null;
  logo: string | null;
  enableLogo: boolean | null;
  frontText: string | null;
  enableFrontText: boolean | null;
  backText: string | null;
  backgroundColor: string | null;
  backgroundImage: string | null;
  fontFamily: string | null;
}


export interface GEN_QR {
  accountNo: string;
  accountName: string;
  acqId: string;
  addInfo?: string;
  amount?: string;
  template: string;
}