import { TemplateRegistry } from "@tradetrust-tt/decentralized-renderer-react-components";
import { TemplateATemplates } from "./examples/TemplateA";
import { TemplateBTemplates } from "./examples/TemplateB";

export const registry: TemplateRegistry<any> = {
  TEMPLATE_A: TemplateATemplates,
  TEMPLATE_B: TemplateBTemplates,
  };