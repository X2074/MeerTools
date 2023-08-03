import Footer from "./components/Footer/index";
import Web3ReactManager from "./components/Web3ReactManager/index";
import { NetworkContextName } from "../config";
import { Web3Provider } from "@ethersproject/providers";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";

import Header from "./components/Header/index";

import Home from "./Home";
// import SolHome from "../view/SolHome";
// import MulHome from "../view/MulHome";
// import {useState} from "react";
// import Button from "@mui/material/Button";


export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 15000;
    return library;
}
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function TransferTool() {
    // const [ isSwitch, setIsSwitch ] = useState(false);

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                    <Header></Header>
                    <Web3ReactManager>

                        <Home />
                        
                    </Web3ReactManager>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
}

export default TransferTool;
