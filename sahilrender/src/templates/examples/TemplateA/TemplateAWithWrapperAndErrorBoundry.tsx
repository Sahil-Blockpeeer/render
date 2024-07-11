import { TemplateProps } from "@tradetrust-tt/decentralized-renderer-react-components";
import React, { FunctionComponent } from "react";
import { Wrapper } from "../../../core/Wrapper";
import { getDocumentData } from "../../../utils";
import { TemplateADocument, TemplateASchema } from "./types";

const Content = (document: TemplateADocument): JSX.Element => {
  return (
    <div className="border-black border p-2">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-2">col1</th>
            <th className="border border-black p-2">col2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">{document.data1}</td>
            <td className="border border-black p-2">{document.data2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const TemplateAWithWrapperAndErrorBoundry: FunctionComponent<
  TemplateProps<TemplateASchema>
> = ({ document }) => {
  const documentData = getDocumentData(document) as TemplateADocument;
  return (
    <>
      <Wrapper data-testid="bill-of-lading-template">
        <div className="mb-8">{Content(documentData)}</div>
      </Wrapper>
    </>
  );
};
