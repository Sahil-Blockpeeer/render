import { TemplateAWithQRCode } from "./TemplateAWithQRCode";
import { TemplateAWithWaterMark } from "./TemplateAWithWaterMark";
import { TemplateAWithWrapperAndErrorBoundry } from "./TemplateAWithWrapperAndErrorBoundry";

export const TemplateATemplates = [
  {
    id: "template-a-with-qr",
    label: "Template with QR Code",
    template: TemplateAWithQRCode,
  },
  {
    id: "template-a-with-wrapper-and-error-boundry",
    label: "Template with Wrapper and Error Boundry",
    template: TemplateAWithWrapperAndErrorBoundry,
  },
  {
    id: "template-a-with-watermark",
    label: "With water mark",
    template: TemplateAWithWaterMark,
  },
];
