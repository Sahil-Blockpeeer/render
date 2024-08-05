import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TradeTrustToken__factory } from "@govtechsg/token-registry/contracts";
import './check.css';
import { wrapDocument } from '@govtechsg/open-attestation';
import ConnectWallet from '../components/Connectwallet';
import { ethers } from "ethers";
import { issueTransferableDocument } from '../services/Registry';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

interface FormData {
  DrawerCompany_Name: string;
  DrawerCompany_Number: string;
  DrawerJurisdiction: string;
  DrawerEmail: string;
  DrawerDns: string;
  DraweeCompany_Name: string;
  DraweeCompany_Number: string;
  DraweeJurisdiction: string;
  DraweeEmail: string;
  DraweeDns: string;
  paymentDueDate: string;
  amountDue: string;
  amountDueinwords: string;
  BankName: string;
  AccountNumber: string;
  SWIFT_OR_IBAN: string;
  SignedName: string;
  Position: string;
}

const clientId = "BNEAH9GETWmwIRnBtzixLhf0cKgsPNSuZPShE344tueVdLCekCwyHvc9tfsTUbs2d4aEvN3FUo7YZxknar3eog0";

const chainConfig = {
  chainId: "0x33",
  rpcTarget: "https://rpc.apothem.network",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "XDC Testnet",
  blockExplorerUrl: "https://explorer.apothem.network/",
  ticker: "XDC",
  tickerName: "XDC Apothem",
  logo: "https://images.toruswallet.io/eth.svg",
};

const Checkpage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    DrawerCompany_Name: '',
    DrawerCompany_Number: '',
    DrawerJurisdiction: '',
    DrawerEmail: '',
    DrawerDns: '',
    DraweeCompany_Name: '',
    DraweeCompany_Number: '',
    DraweeJurisdiction: '',
    DraweeEmail: '',
    DraweeDns: '',
    paymentDueDate: '',
    amountDue: '',
    amountDueinwords: '',
    BankName: '',
    AccountNumber: '',
    SWIFT_OR_IBAN: '',
    SignedName: '',
    Position: '',
  });

  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [wrappedDocument, setWrappedDocument] = useState<any | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSignerChange = (newSigner: ethers.Signer | null) => {
    console.log("new signer ", newSigner);
    setSigner(newSigner);
  };

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
        });

        setWeb3auth(web3authInstance);

        await web3authInstance.initModal();

        if (web3authInstance.connected) {
          const web3authProvider = web3authInstance.provider;
          setProvider(web3authProvider);

          const ethersProvider = new ethers.providers.Web3Provider(web3authProvider as any);
          const signer = ethersProvider.getSigner();
          console.log("signer ", signer);
          setSigner(signer);
        }
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      }
    };

    if (!web3auth) {
      initWeb3Auth();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tokenRegistryAddress = "0x2d46c8EfA1afBC41b4fFc901428E2f782A81C50B";
    const owner = "0xb0a25BE24A5724Cc176DdE32A1bEE53B4b92191b";
    const holder = "0xb0a25BE24A5724Cc176DdE32A1bEE53B4b92191b";

    const document: any = {
      $template: {
        type: "v2.TemplateType.EmbeddedRenderer",
        name: "BILL_OF_LADING",
        url: "http://localhost:5173",
      },
      issuers: [
        {
          name: "Sahil",
          tokenRegistry: "0x2d46c8EfA1afBC41b4fFc901428E2f782A81C50B",
          identityProof: {
            type: "v2.IdentityProofType.DNSTxt",
            location: "sahil.blockpeer.finance",
          },
        },
      ],
      DrawerCompany_Name: formData.DrawerCompany_Name,
      DrawerCompany_Number: formData.DrawerCompany_Number,
      DrawerJurisdiction: formData.DrawerJurisdiction,
      DrawerEmail: formData.DrawerEmail,
      DrawerDns: formData.DrawerDns,
      DraweeCompany_Name: formData.DraweeCompany_Name,
      DraweeCompany_Number: formData.DraweeCompany_Number,
      DraweeJurisdiction: formData.DraweeJurisdiction,
      DraweeEmail: formData.DraweeEmail,
      DraweeDns: formData.DraweeDns,
      paymentDueDate: formData.paymentDueDate,
      amountDue: formData.amountDue,
      amountDueinwords: formData.amountDueinwords,
      BankName: formData.BankName,
      AccountNumber: formData.AccountNumber,
      SWIFT_OR_IBAN: formData.SWIFT_OR_IBAN,
      SignedName: formData.SignedName,
      Position: formData.Position,
    };

    const wrappedDocument = wrapDocument(document);
    console.log("wrapped document ", wrappedDocument);
    setWrappedDocument(wrappedDocument);

    if (!signer) {
      console.error("Signer not initialized");
      return;
    }

    const merkleRoot: string = wrappedDocument.signature.targetHash;
    const tokenId = `0x${merkleRoot}`;

    try {
      const tx = await issueTransferableDocument({
        wrappedDocument,
        tokenRegistryAddress,
        merkelRoot: tokenId,
        signer,
        beneficiaryAddress: owner,
        holderAddress: holder,
      });

      setTransactionHash(tx.transactionHash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const handleDownload = () => {
    if (wrappedDocument) {
      const dataString = JSON.stringify(wrappedDocument, null, 2);
      const blob = new Blob([dataString], { type: "application/json" });

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";

      const downloadUrl = window.URL.createObjectURL(blob);
      a.href = downloadUrl;
      a.download = `wrappedDocument.tt`;
      a.click();

      window.URL.revokeObjectURL(downloadUrl);
      a.remove();
    }
  };

  // return (
  // <div className="form-container">
  //   <form onSubmit={handleSubmit}>
  //   <h3>Payer Details</h3>
  //     <div>
  //       <label>Drawer Company Name:</label>
  //       <input
  //         type="text"
  //         name="DrawerCompany_Name"
  //         value={formData.DrawerCompany_Name}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawer Company Number/LEI:</label>
  //       <input
  //         type="text"
  //         name="DrawerCompany_Number"
  //         value={formData.DrawerCompany_Number}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawer Jurisdiction:</label>
  //       <input
  //         type="text"
  //         name="DrawerJurisdiction"
  //         value={formData.DrawerJurisdiction}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawer Email:</label>
  //       <input
  //         type="email"
  //         name="DrawerEmail"
  //         value={formData.DrawerEmail}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawer DNS:</label>
  //       <input
  //         type="text"
  //         name="DrawerDns"
  //         value={formData.DrawerDns}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <h3>Receiver Details</h3>
  //     <div>
  //       <label>Drawee Company Name:</label>
  //       <input
  //         type="text"
  //         name="DraweeCompany_Name"
  //         value={formData.DraweeCompany_Name}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawee Company Number/LEI:</label>
  //       <input
  //         type="text"
  //         name="DraweeCompany_Number"
  //         value={formData.DraweeCompany_Number}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawee Jurisdiction:</label>
  //       <input
  //         type="text"
  //         name="DraweeJurisdiction"
  //         value={formData.DraweeJurisdiction}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawee Email:</label>
  //       <input
  //         type="email"
  //         name="DraweeEmail"
  //         value={formData.DraweeEmail}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Drawee DNS:</label>
  //       <input
  //         type="text"
  //         name="DraweeDns"
  //         value={formData.DraweeDns}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <h3>Payment Details</h3>
  //     <div>
  //       <label>Payment Due Date:</label>
  //       <input
  //         type="datetime-local"
  //         name="paymentDueDate"
  //         value={formData.paymentDueDate}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Amount Due:</label>
  //       <input
  //         type="number"
  //         name="amountDue"
  //         value={formData.amountDue}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     {/* <div>
  //       <label>Amount Due (in words):</label>
  //       <input
  //         type="text"
  //         name="amountDueinwords"
  //         value={formData.amountDueinwords}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div> */}
  //     <div>
  //       <label>Bank Name:</label>
  //       <input
  //         type="text"
  //         name="BankName"
  //         value={formData.BankName}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Account Number:</label>
  //       <input
  //         type="text"
  //         name="AccountNumber"
  //         value={formData.AccountNumber}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>SWIFT/IBAN:</label>
  //       <input
  //         type="text"
  //         name="SWIFT_OR_IBAN"
  //         value={formData.SWIFT_OR_IBAN}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Signed Name:</label>
  //       <input
  //         type="text"
  //         name="SignedName"
  //         value={formData.SignedName}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label>Position:</label>
  //       <input
  //         type="text"
  //         name="Position"
  //         value={formData.Position}
  //         onChange={handleChange}
  //         required
  //       />
  //     </div>
  //     <div className="text-center">
  //       <p>I promise to pay the amount on the due date</p>
  //       <button type="submit">Create</button>
  //     </div>
  //   </form>
  //   {wrappedDocument && (
  //     <div style={{ marginTop: "20px" }}>
  //       <button
  //         onClick={handleDownload}
  //         style={{
  //           padding: "10px 20px",
  //           fontSize: "16px",
  //           cursor: "pointer",
  //           backgroundColor: "#4CAF50",
  //           color: "white",
  //           border: "none",
  //           borderRadius: "5px",
  //         }}
  //       >
  //         Download Wrapped Document
  //       </button>
  //       <div>
  //         <p>Transaction Hash: {transactionHash}</p>
  //         <p>Blockchain Network: {chainConfig.displayName}</p>
  //       </div>
  //     </div>
  //   )}
  // </div>

  

  // );
};

export default Checkpage;
