import React, { FunctionComponent } from "react";
import { TemplateAWithQRCode } from "./TemplateAWithQRCode";
import { TemplateASampleV2 } from "./sampleV2";
import { TemplateAWithWaterMark } from "./TemplateAWithWaterMark";
import { TemplateAWithWrapperAndErrorBoundry } from "./TemplateAWithWrapperAndErrorBoundry";

export default {
  title: "TemplateA",
  component: TemplateAWithQRCode,
  parameters: {
    componentSubtitle: "Sample Template A",
  },
};

export const TemplateWithQRCode: FunctionComponent = () => {
  return <TemplateAWithQRCode document={TemplateASampleV2} handleObfuscation={() => {}} />;
};

export const TemplateWithWrapperAndErrorBoundry: FunctionComponent = ()=> {
  return <TemplateAWithWrapperAndErrorBoundry document={TemplateASampleV2} handleObfuscation={() => {}} />;
}

export const TemplateWithWaterMark: FunctionComponent = ()=> {
  return <TemplateAWithWaterMark document={TemplateASampleV2} handleObfuscation={() => {}} />;
}
