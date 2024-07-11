import { OpenAttestationDocument, utils } from "@tradetrust-tt/tradetrust";

/**
 * This function is necessary to extract the document data from the data. It makes decentralized renderer templates compatible with both v2 and v3 document version.
 * @param {OpenAttestationDocument} document - The document itself.
 * @returns {document} The extracted data from the document.
 */
export const getDocumentData = (document: OpenAttestationDocument): any => {
  if (utils.isRawV3Document(document)) {
    return document.credentialSubject;
  } else {
    return document;
  }
};
