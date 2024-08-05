import React, { useState } from 'react';
import { ethers } from 'ethers';
import { deployTokenRegistry } from '../services/Registry';
import ConnectWallet from '../components/Connectwallet';

// Define the type for the chain state
type Chain = {
  chainId: number;
} | null;

const ConfigPage = () => {
  const [provider, setProvider] = useState<ethers.providers.ExternalProvider | null>(null);
  const [registryAddress, setRegistryAddress] = useState<string>('');
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [currentChain, setCurrentChain] = useState<Chain>(null);

  const handleTokenRegistryClick = async () => {
    if (!provider) {
      console.error("Provider not initialized");
      return;
    }

    const registryName = "My Token Registry";
    const registrySymbol = "MTR";
    const titleEscrowFactoryAddress = "0xce28778bE6cF32ef3Ccbc09910258DF592F3b6F1";

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    
    try {
      setIsDeploying(true);
      const address = await deployTokenRegistry(
        registryName,
        registrySymbol,
        titleEscrowFactoryAddress,
        signer
      );
      setRegistryAddress(address);
      console.log("Deployed Token Registry Address:", address);

      const network = await ethersProvider.getNetwork();
      setCurrentChain({ chainId: network.chainId });
    } catch (error) {
      console.error("Error deploying token registry:", error);
    } finally {
      setIsDeploying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div>
      <ConnectWallet onProviderChange={setProvider} /> 
      <h2>Config Page</h2>
      <p>This is the Config page.</p>
      {registryAddress ? (
        <div>
          <p>Deployed Token Registry Address: {registryAddress}</p>
          <div className="text-start card border-2 border-solid border-black p-10 w-2/3">
            Add this TXT record in your DNS config:
            <p className="overflow-x-scroll text-sm mt-2">
              
              "\"openatts net=apothem netId=51 addr={registryAddress}\""
            </p>
            <button
              onClick={() => copyToClipboard(
                `"\\"openatts net=apothem netId=51 addr=${registryAddress}\\""`
              )}
              className="btn btn-sm w-1/4"
            >
              Copy
            </button>
          </div>
          <div>
            <input type="search" />
            <br /><br /><br />
            <button>Search button</button>
          </div>
        </div>
      ) : (
        <button onClick={handleTokenRegistryClick} disabled={isDeploying}>
          {isDeploying ? "Deploying..." : "Token Registry"}
        </button>
      )}
    </div>
  );
};

export default ConfigPage;
