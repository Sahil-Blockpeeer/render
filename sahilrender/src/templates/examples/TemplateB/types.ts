import { v2, v3 } from "@tradetrust-tt/tradetrust";

export type TemplateBSchemaV2 = v2.OpenAttestationDocument & TemplateB;

export type TemplateBSchemaV3 = v3.OpenAttestationDocument & {
  credentialSubject: TemplateB;
};



export type TemplateBSchema = TemplateBSchemaV2 | TemplateBSchemaV3;

export interface TemplateB {
  id?: string;
  date?: string;
  customerId?: string;
  terms?: string;
  billFrom?: CompanyInfo;
  billTo: BillingAddress;
  billableItems?: InvoiceItem[];
  subtotal?: string;
  tax?: string;
  taxTotal?: string;
  total?: string;
  links?: { self: { href: string } };
}

export interface CompanyInfo {
  name: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

export interface BillingAddress {
  name: string;
  company: CompanyInfo;
  email: string;
}

export interface InvoiceItem {
  description: string;
  quantity: string;
  unitPrice: string;
  amount: string;
}
