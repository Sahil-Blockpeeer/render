import React, { FunctionComponent } from "react";
import { TemplateBWithSelectiveRedaction } from "./TemplateBWithSelectiveRedaction";
import { TemplateBSampleV2 } from "./sampleV2";

export default {
  title: "TemplateB",
  component: TemplateBWithSelectiveRedaction,
  parameters: {
    componentSubtitle: "Sample Template B",
  },
};

export const TemplateWithSelectiveRedaction: FunctionComponent = () => {
  return (
    <TemplateBWithSelectiveRedaction
      document={TemplateBSampleV2}
      handleObfuscation={() => {}}
    />
  );
};
