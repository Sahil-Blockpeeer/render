import { TemplateProps } from "@tradetrust-tt/decentralized-renderer-react-components";
import React, { FunctionComponent } from "react";
import { DocumentQrCode } from "../../../core/DocumentQrCode";
import { getDocumentData } from "../../../utils";
import { TemplateADocument, TemplateASchema } from "./types";

const Content = (document: TemplateADocument): JSX.Element => {
  return (
    <div className="border-black border p-2">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-2">Promissary Note</th>
            {/* <th className="border border-black p-2">col2</th> */}
            {/* <th>sahil</th> */}
          </tr>

        </thead>
        <tbody>
          
          <tr>
            <td className="border border-black p-2">{document.lenderName}</td>
            <td className="border border-black p-2">{document.lenderAddress}</td>
            <td className="border border-black p-2">{document.amountDue}</td>
            <td className="border border-black p-2">{document.paymentDueDate}</td>
            
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};




export const TemplateAWithQRCode: FunctionComponent<TemplateProps<TemplateASchema>> = ({ document }) => {
  const documentData = getDocumentData(document) as TemplateADocument;
  const qrCodeUrl = documentData?.links?.self.href;
  return (
    <>
      <div className="mb-8">{Content(documentData)}</div>
      {qrCodeUrl && <DocumentQrCode url={qrCodeUrl} />}
    </>
  );
};