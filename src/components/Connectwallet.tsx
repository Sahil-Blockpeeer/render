import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";

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

const ConnectWallet = ({ onProviderChange }: any) => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
          onProviderChange(web3authProvider);

          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      }
    };

    if (!web3auth) {
      initWeb3Auth();
    }
  }, [web3auth, onProviderChange]);

  const login = async () => {
    if (web3auth) {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      onProviderChange(web3authProvider);

      setLoggedIn(true);
    }
  };

  const uiConsole = (message: any) => {
    console.log(message);
  };

  const getUserInfo = async () => {
    if (web3auth) {
      const user = await web3auth.getUserInfo();
      uiConsole(user);
    }
  };

  const logout = async () => {
    if (web3auth) {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      onProviderChange(null);
      uiConsole("logged out");
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider);

    const address = await web3.eth.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider);

    const address = (await web3.eth.getAccounts())[0];

    const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider);

    const fromAddress = (await web3.eth.getAccounts())[0];

    const originalMessage = "YOUR_MESSAGE";

    const signedMessage = await web3.eth.personal.sign(originalMessage, fromAddress, "test password!");
    uiConsole(signedMessage);
  };

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
};

export default ConnectWallet;

