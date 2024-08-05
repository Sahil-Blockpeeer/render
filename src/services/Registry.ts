import { ethers } from "ethers";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/2.0/types";
import { TradeTrustToken__factory } from "@govtechsg/token-registry/contracts";

export const deployTokenRegistry = async (
  registryName: string,
  registrySymbol: string,
  titleEscrowFactoryAddress: string,
  signer: ethers.Signer
) => {
  const factory = new TradeTrustToken__factory(signer);
  const tokenRegistry = await factory.deploy(
    registryName,
    registrySymbol,
    titleEscrowFactoryAddress
  );
  
  await tokenRegistry.deployTransaction.wait();  // Wait for deployment to be mined
  console.log("Token Registry deployed at:", tokenRegistry.address);
  
  return tokenRegistry.address;
};

export const issueTransferableDocument = async ({
  wrappedDocument,
  tokenRegistryAddress,
  merkelRoot,
  signer,
  beneficiaryAddress,
  holderAddress,
}: {
  wrappedDocument: WrappedDocument;
  tokenRegistryAddress: string;
  merkelRoot : string
  signer: ethers.Signer;
  beneficiaryAddress: string;
  holderAddress: string;
}) => {
  console.log("in the documentss");
  
  
  const connectedRegistry = TradeTrustToken__factory.connect(
    tokenRegistryAddress,
    signer
  );
  console.log("connected the registry" , merkelRoot);
  
  let receipt;
  try{
    
    receipt = await connectedRegistry.mint(
      beneficiaryAddress,
      holderAddress,
      merkelRoot
    );
  }catch (error){
    console.log("error ", error);
  }
  console.log("after the receipt");
  
  console.log(`Transaction receipt:, ${JSON.stringify(receipt)}`);
  
  return receipt;
};
