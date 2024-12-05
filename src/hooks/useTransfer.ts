import { Token } from "@/config/constants/types";
import { config } from '../wagmi'
// import { useTransfer } from "@/hooks/useContract";
import { accAdd, accGt, accGte, accMul, parseAmount } from "@/utils/format";
// import { useERC20 } from "./useContract";
import { isEth } from "@/utils/isEth";
import { getBalance, simulateContract, writeContract, getPublicClient, getAccount } from '@wagmi/core'
export const useBalance = async (token: Token, address: string) => {
    const account = getAccount(config)
    console.log(account, "account", address);
    // const { library, chainId } = useActiveWeb3React();
    // const [nativeBalance, setBalance] = useState<string>("0");
    // const [tokenBalance, setTokenBalance] = useState<string>("0");
    // const ERC20Contract = useERC20(token.address);

    // const getBalance = async () => {
    if (!address) {
        return;
    }
    // 获取账户余额
    const balance = await getBalance(config, { address: address });

    if (isEth(token, account.chainId)) {
        console.log(balance, "balance01");
        const tokenBalance = balance;
    } else {
        console.log(balance, "balance02");
        // const tokenBalance = await ERC20Contract.balanceOf(address);
    }
    // };
};
