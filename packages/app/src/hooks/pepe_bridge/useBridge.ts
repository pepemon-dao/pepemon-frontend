import {useCallback, useContext, useEffect, useState} from "react";
import {BigNumber} from "../../pepemon";
import {Goerli, PepemonChain} from "../../utils/providers";
import {PepemonProviderContext} from "../../contexts";
import {getBalance, getNativeBalance} from "../../utils";
import {getPpdexAddress} from "../../pepemon/utils";
import {Layer, useBridgeContracts} from "./useBridgeContracts";
import {MessageStatus} from "@eth-optimism/sdk";

// import {crossChainMessenger} from "../utils/bridgeContract";

interface BridgeBalance {
    nativeBalance: BigNumber;
    ppblzBalance: BigNumber;
    ppdexBalance: BigNumber;
    isActivate: boolean;
}

interface BridgeBalances {
    Layer1: BridgeBalance
    Layer2: BridgeBalance
    depositFunds: (amount: BigNumber) => void
    withdrawFunds: (amount: BigNumber) => void
}

export const useBridge = (): BridgeBalances => {
    const [pepemon] = useContext(PepemonProviderContext);

    const [layer1NativeBalance, setLayer1NativeBalance] = useState(new BigNumber(0))
    const [layer2NativeBalance, setLayer2NativeBalance] = useState(new BigNumber(0))
    const [layer1PpdexBalance, setLayer1PpdexBalance] = useState(new BigNumber(0))
    const [layer2PpdexBalance, setLayer2PpdexBalance] = useState(new BigNumber(0))
    const [layer1PpblzBalance, setLayer1PpblzBalance] = useState(new BigNumber(0))
    const [layer2PpblzBalance, setLayer2PpblzBalance] = useState(new BigNumber(0))
    const {messenger, activeLayer} = useBridgeContracts()

    const {account} = pepemon;

    useEffect(() => {
        const fetchBalance = async () => {
            getNativeBalance(Goerli, account).then(balance => {
                setLayer1NativeBalance(new BigNumber(balance))
            })
            getNativeBalance(PepemonChain, account).then(balance => {
                setLayer2NativeBalance(new BigNumber(balance))
            })

            getBalance(Goerli, getPpdexAddress(), account).then(balance => {
                setLayer1PpdexBalance(new BigNumber(balance))
            })

        }

        fetchBalance()
    }, [account]);

    const depositFunds = useCallback(async (amount: BigNumber) => {
        if (!messenger || activeLayer !== Layer.Layer1) {
            return
        }

        const response = await messenger.depositETH(amount.toString())

        await messenger.waitForMessageStatus(response.hash, MessageStatus.RELAYED)
    }, [messenger])

    const withdrawFunds = useCallback(async (amount: BigNumber) => {
        if (!messenger || activeLayer !== Layer.Layer2) {

            return
        }
        console.log(amount.toString())
        const time = Date.now()

        const response = await messenger.withdrawETH(amount.toString())

        console.log(response)
        const reply = await response.wait().catch((e) => {
            return
        })

        console.log(`Waited for ${Date.now() - time}ms`)

        await messenger.waitForMessageStatus(response.hash, MessageStatus.IN_CHALLENGE_PERIOD)
        console.log("waited2")
        await messenger.waitForMessageStatus(response.hash, MessageStatus.READY_FOR_RELAY)
        console.log("waited3")
        await messenger.finalizeMessage(response)
        console.log("finalized")
        await messenger.waitForMessageStatus(response, MessageStatus.RELAYED)

    }, [messenger])

    return {
        Layer1: {
            nativeBalance: layer1NativeBalance,
            ppblzBalance: new BigNumber(0),
            ppdexBalance: layer1PpdexBalance,
            isActivate: activeLayer === Layer.Layer1
        },
        Layer2: {
            nativeBalance: layer2NativeBalance,
            ppblzBalance: new BigNumber(0),
            ppdexBalance: new BigNumber(0),
            isActivate: activeLayer === Layer.Layer2
        },
        depositFunds: depositFunds,
        withdrawFunds: withdrawFunds
    }
}
