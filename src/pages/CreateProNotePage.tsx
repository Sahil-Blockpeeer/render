// import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// import { TradeTrustToken__factory } from "@govtechsg/token-registry/contracts";
// import './CreateProNotePage.css';
// import { wrapDocument } from '@govtechsg/open-attestation';
// import ConnectWallet from '../components/Connectwallet';
// import { ethers } from "ethers";
// import { issueTransferableDocument } from '../services/Registry';
// import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
// import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
// import { Web3Auth } from '@web3auth/modal';

// interface FormData {
//   lenderName: string;
//   lenderAddress: string;
//   amountDue: number | '';
//   paymentDueDate: string;
// }
// const clientId = "BNEAH9GETWmwIRnBtzixLhf0cKgsPNSuZPShE344tueVdLCekCwyHvc9tfsTUbs2d4aEvN3FUo7YZxknar3eog0";

// const chainConfig = {
//   chainId: "0x33",
//   rpcTarget: "https://rpc.apothem.network",
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   displayName: "XDC Testnet",
//   blockExplorerUrl: "https://explorer.apothem.network/",
//   ticker: "XDC",
//   tickerName: "XDC Apothem",
//   logo: "https://images.toruswallet.io/eth.svg",
// };

// const CreateProNotePage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     lenderName: '',
//     lenderAddress: '',
//     amountDue: '',
//     paymentDueDate: ''
//   });
//   const [signer, setSigner] = useState<ethers.Signer | null>(null);
//   const [provider, setProvider] = useState<IProvider | null>(null);
//   const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [wrappedDocument, setWrappedDocument] = useState<any | null>(null);

//   const handleSignerChange = (newSigner: ethers.Signer | null) => {
//     console.log("new signer ", newSigner);
//     setSigner(newSigner);
//   };

//   useEffect(() => {
//     const initWeb3Auth = async () => {
//       try {
//         const privateKeyProvider = new EthereumPrivateKeyProvider({
//           config: { chainConfig },
//         });

//         const web3authInstance = new Web3Auth({
//           clientId,
//           web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
//           privateKeyProvider,
//         });

//         setWeb3auth(web3authInstance);

//         await web3authInstance.initModal();

//         if (web3authInstance.connected) {
//           const web3authProvider = web3authInstance.provider;
//           setProvider(web3authProvider);

//           const ethersProvider = new ethers.providers.Web3Provider(web3authProvider as any);
//           const signer = ethersProvider.getSigner();
//           console.log("signer ", signer);
//           setSigner(signer);
//         }
//       } catch (error) {
//         console.error("Web3Auth initialization error:", error);
//       }
//     };

//     if (!web3auth) {
//       initWeb3Auth();
//     }
//   }, []);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'amountDue' ? Number(value) : value
//     });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const tokenRegistryAddress = '0xB67DDa54D00D9C8099C8f7bF8bB57Bc41b4453D6';
//     const owner = "0xb0a25BE24A5724Cc176DdE32A1bEE53B4b92191b";
//     const holder = "0xb0a25BE24A5724Cc176DdE32A1bEE53B4b92191b";

//     const document:any = {
//       name: "PROMISSORY_NOTE_123",
//       $template: {
//         name: "PRO_NOTE_TEMPLATE",
//         type: "EMBEDDED_RENDERER",
//         url: "https://localhost:3000/renderer"
//       },
//       issuers: [
//         {
//           name: "DEMO STORE",
//           tokenRegistry: tokenRegistryAddress,
//           identityProof: {
//             type: "DNS-TXT",
//             location: "tradetrust.io"
//           }
//         }
//       ],
//       recipient: {
//         name: "John Doe"
//       },
//       promissoryNote: {
//         lenderName: formData.lenderName,
//         lenderAddress: formData.lenderAddress,
//         amountDue: formData.amountDue as number,
//         paymentDueDate: formData.paymentDueDate
//       }
//     };

//     const wrappedDocument = wrapDocument(document);
//     console.log("wrapped document ", wrappedDocument);
//     setWrappedDocument(wrappedDocument);

//     if (!signer) {
//       console.error("Signer not initialized");
//       return;
//     }

//     const merkleRoot: string = wrappedDocument.signature.targetHash;
//     const tokenId = `0x${merkleRoot}`;

//     const address = await issueTransferableDocument({
//       wrappedDocument,
//       tokenRegistryAddress,
//       merkelRoot: tokenId,
//       signer,
//       beneficiaryAddress: owner,
//       holderAddress: holder,
//     });

//     console.log("address ", address);
//   };

//   const handleDownload = () => {
//     if (wrappedDocument) {
//       const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wrappedDocument));
//       const downloadAnchorNode = document.createElement('a');
//       downloadAnchorNode.setAttribute("href", dataStr);
//       downloadAnchorNode.setAttribute("download", "wrappedDocument.tt");
//       document.body.appendChild(downloadAnchorNode);
//       downloadAnchorNode.click();
//       downloadAnchorNode.remove();
//     }
//   };

//   return (
//     <div className="form-container">
//       {/* <ConnectWallet onSignerChange={handleSignerChange} /> */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Lender Name:</label>
//           <input
//             type="text"
//             name="lenderName"
//             value={formData.lenderName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Lender Address:</label>
//           <input
//             type="text"
//             name="lenderAddress"
//             value={formData.lenderAddress}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Amount Due:</label>
//           <input
//             type="number"
//             name="amountDue"
//             value={formData.amountDue}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Payment Due Date:</label>
//           <input
//             type="datetime-local"
//             name="paymentDueDate"
//             value={formData.paymentDueDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <h3>I promise to pay amount on due date</h3>
//         <button type="submit">Create</button>
//       </form>
//       {/* {wrappedDocument && (
//         <button onClick={handleDownload} style={}>Download Wrapped Document</button>
//       )} */}

//       {wrappedDocument && (
//         <button
//           onClick={handleDownload}
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             fontSize: "16px",
//             cursor: "pointer",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             textAlign: "center",
//           }}
//         >
//           Download Wrapped Document
//         </button>
//       )}
//     </div>
//   );
// };

// export default CreateProNotePage;


import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TradeTrustToken__factory } from "@govtechsg/token-registry/contracts";
import './CreateProNotePage.css';
import { v2, wrapDocuments } from "@govtechsg/open-attestation"
import { wrapDocument } from '@govtechsg/open-attestation';
import ConnectWallet from '../components/Connectwallet';
import { ethers } from "ethers";
import { issueTransferableDocument } from '../services/Registry';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';

interface FormData {
  lenderName: string;
  lenderAddress: string;
  amountDue: number | '';
  paymentDueDate: string;
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

const CreateProNotePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    lenderName: '',
    lenderAddress: '',
    amountDue: '',
    paymentDueDate: ''
  });
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [wrappedDocument, setWrappedDocument] = useState<any | null>(null);

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
      [name]: name === 'amountDue' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // const tokenRegistryAddress = '0x02140E72CC720c4fdB0220daeE5670775729b2EC';
    const tokenRegistryAddress = "0x2d46c8EfA1afBC41b4fFc901428E2f782A81C50B";
    const owner = "0xb0a25BE24A5724Cc176DdE32A1bEE53B4b92191b";
    const holder = "0xb0a25BE24A5724Cc176DdE32A1bEE53B4b92191b";

    const document: any = {



      //   name: "PROMISSORY_NOTE_123",
      //   $template: {
      //     name: "PRO_NOTE_TEMPLATE",
      //     type: "EMBEDDED_RENDERER",
      //     url: "http://localhost:3001"
      //   },
      //   issuers: [
      //     {
      //       name: "Sahil",
      //       tokenRegistry: tokenRegistryAddress,
      //       identityProof: {
      //         type: "DNS-TXT",
      //         location: "sahil.blockpeer.finance"
      //       }
      //     }
      //   ],
      //   recipient: {
      //     name: "John Doe"
      //   },
      //   // promissoryNote: {
      //     lenderName: formData.lenderName,
      //     lenderAddress: formData.lenderAddress,
      //     amountDue: formData.amountDue as number,
      //     paymentDueDate: formData.paymentDueDate
      //   // }
      // }

      
        id: "SERIAL_NUMBER_123",
        $template: {
          name: "COC",
          type: "EMBEDDED_RENDERER",
          
          // url: "https://6690c7d8bd7c20c673422d2b--transcendent-choux-824eff.netlify.app/",  
          url: "http://localhost:3000",
        },
        issuers: [
          {
            name: "Sahil",
            tokenRegistry: tokenRegistryAddress,
            identityProof: {
              type: "DNS-TXT",
              location: "sahil.blockpeer.finance",
              // location: "pretty-lime-squid.sandbox.fyntech.io", 
            },
          },
        ],
        recipient: {
          name: "John Doe",
          lenderAddress: formData.lenderAddress,
          lenderName : formData.lenderName,
          amountDue : formData.amountDue,
          paymentDueDate : formData.paymentDueDate
        }
      } 


    const wrappedDocument = wrapDocument(document);
    console.log("wrapped document ", wrappedDocument);
    setWrappedDocument(wrappedDocument);

    if (!signer) {
      console.error("Signer not initialized");
      return;
    }

    const merkleRoot: string = wrappedDocument.signature.targetHash;
    const tokenId = `0x${merkleRoot}`;

    const address = await issueTransferableDocument({
      wrappedDocument,
      tokenRegistryAddress,
      merkelRoot: tokenId,
      signer,
      beneficiaryAddress: owner,
      holderAddress: holder,
    });

    console.log("address ", address);
  };

  const handleDownload = () => {
    if (wrappedDocument) {
      const dataString = JSON.stringify(wrappedDocument, null, 2);
      const blob = new Blob([dataString], { type: "application/json" });


      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";


      const downloadUrl = window.URL.createObjectURL(blob);
      a.href = downloadUrl;
      a.download = `wrappedSahilDocument.tt`;
      a.click();


      window.URL.revokeObjectURL(downloadUrl);
      a.remove();
    }
  };

  return (
    <div className="form-container">
      {/* <ConnectWallet onSignerChange={handleSignerChange} /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Lender Name:</label>
          <input
            type="text"
            name="lenderName"
            value={formData.lenderName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lender Address:</label>
          <input
            type="text"
            name="lenderAddress"
            value={formData.lenderAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount Due:</label>
          <input
            type="number"
            name="amountDue"
            value={formData.amountDue}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Due Date:</label>
          <input
            type="datetime-local"
            name="paymentDueDate"
            value={formData.paymentDueDate}
            onChange={handleChange}
            required
          />
        </div>
        <h3>I promise to pay amount on due date</h3>
        <button type="submit">Create</button>
      </form>
      {/* {wrappedDocument && (
        <button onClick={handleDownload} style={}>Download Wrapped Document</button>
      )} */}

      {wrappedDocument && (
        <button
          onClick={handleDownload}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          Download Wrapped Document
        </button>
      )}
    </div>
  );
};

export default CreateProNotePage;
