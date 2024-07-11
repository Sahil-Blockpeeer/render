import { v2 } from "@tradetrust-tt/tradetrust";
import { TemplateAV2 } from "./types";

export const TemplateASampleV2: TemplateAV2 = {
  $template: {
    type: v2.TemplateType.EmbeddedRenderer,
    name: "PRO_NOTE_TEMPLATE",
    url: "http://localhost:5173",
  },
  issuers: [
    {
      name: "Sahil",
      tokenRegistry: "0x2d46c8EfA1afBC41b4fFc901428E2f782A81C50B",
      identityProof: {
        type: v2.IdentityProofType.DNSTxt,
        location: "sahil.blockpeer.finance",
      },
    },
  ],
  
  lenderName: "abc",
  paymentDueDate: " 7/10/2024, 08:54pm",
  amountDue: "20",
  lenderAddress: "0xb0a25BE24A5724Cc176DdE32A1bEE53B4b92191b",
  
};
