import { v2, v3 } from "@tradetrust-tt/tradetrust";

export type TemplateAV2 = v2.OpenAttestationDocument & TemplateADocument;
export type TemplateAV3 = v3.OpenAttestationDocument & {
  credentialSubject: TemplateADocument;
};

export type TemplateASchema = TemplateAV2 | TemplateAV3;

export interface TemplateADocument {
  lenderName:String;
  paymentDueDate: string;
  amountDue: string;
  lenderAddress:string;
  
  
  links?: {
    self: {
      href: string;
    };
  };
}
