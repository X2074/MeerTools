<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { ethers } from "ethers";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import faucetContract from "@/contract/faucet.js";
import { JsonRpcProvider } from "@ethersproject/providers/lib/json-rpc-provider.js";
import bus from "@/utils/bus.js";
let sendSuccess = ref(false); //交易成功
let transactionHash = ref(""); //交易成功的hash
let faucetLoading = ref(true);
let current = ref(1);
const pKey = "53721201246f16a603f1926e26ebf6098ba2f190764d1c527c1259128e3f8af5";
let provider = ref(null);
let walletAddress = ref("");
let unMetaMask = ref(false);
let allEvents = ref(null);
onMounted(async () => {
    dayjs.extend(relativeTime);
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
            let providerRpc = new ethers.providers.JsonRpcProvider(
                "https://testnet-qng.rpc.qitmeer.io"
            );
            let wallet = new ethers.Wallet(pKey, providerRpc);
            console.log(wallet, "wallet.value");
            const contract = faucetContract(wallet);
            // 检查管理员账户余额
            // 获取账户地址
            const address = await wallet.getAddress();
            console.log(address, "address");
            // 查看账户余额
            providerRpc.getBalance(address).then((balance) => {
                console.log(ethers.utils.formatUnits(balance), "balance");
                // 检查manager账户余额，如果小于0.1，要提示增加手续费了
                if (parseFloat(ethers.utils.formatUnits(balance)) < 0.1) {
                    return;
                }
                // 检查水龙头余额
                providerRpc
                    .getBalance(contract.address)
                    .then(async (fcBalance) => {
                        if (
                            parseInt(ethers.utils.formatUnits(fcBalance)) <
                                100 ||
                            parseInt(ethers.utils.formatUnits(fcBalance)) < 1
                        ) {
                            await contract.senMail(
                                ethers.utils.formatUnits(fcBalance) + "Meer",
                                ethers.utils.formatUnits(fcBalance) + "Meer"
                            );
                        }
                        console.log(`Contract balance: ${fcBalance}`);
                    });
            });
            showList();
        } catch (err) {}
    } else {
        unMetaMask.value = true;
    }
});
const showList = async (pages?) => {
    faucetLoading.value = true;
    let eventName = "SendToken";
    let providerRpc = new ethers.providers.JsonRpcProvider(
        "https://testnet-qng.rpc.qitmeer.io"
    );
    const contract = faucetContract(providerRpc);
    contract
        .queryFilter(eventName)
        .then((res) => {
            let events = res.reverse();
            allEvents.value = events.map((item, index) => {
                return {
                    tracsactionHash: item.transactionHash,
                    address: item.args.receiver,
                    amount: item.args.amount / 1000000000000000000 + "MEER",
                    datetime: "",
                    id: item.args.receiver,
                    idx: index + 1,
                };
            });

            events.forEach((item, index) => {
                providerRpc.getBlock(item.blockNumber).then((info) => {
                    allEvents.value[index]["datetime"] = dayjs().to(
                        dayjs.unix(info.timestamp)
                    );
                });
            });
            if (pages) current.value = pages;
            faucetLoading.value = false;
        })
        .catch((err) => {
            faucetLoading.value = false;
        });
};

const sendMeer = async () => {
    faucetLoading.value = true;
    try {
        // 正则表达式用于验证以太坊地址
        const addressPattern = /^0x[a-fA-F0-9]{40}$/;
        let isValid = addressPattern.test(walletAddress.value);
        // 判断地址是否存在
        if (!isValid) {
            console.log("地址有误，请重新填写");
            bus.emit("promptModalErr", "地址有误，请重新填写");
            faucetLoading.value = false;
            return;
        }
        // 判断地址领取资格
        let providerRpc = new ethers.providers.JsonRpcProvider(
            "https://testnet-qng.rpc.qitmeer.io"
        );
        let wallet = new ethers.Wallet(pKey, providerRpc);
        const contract = faucetContract(wallet);
        console.log(contract, "contract");
        const requestTimes = await contract.requestedTimes(walletAddress.value);
        const lastCalled = await contract.lastCalled(walletAddress.value);
        const coolDownPeriod = await contract.coolDownPeriod();
        console.log("requestTimes", requestTimes);
        console.log("lastCalled", lastCalled);
        console.log("coolDownPeriod", coolDownPeriod);

        if (
            lastCalled.toNumber() + coolDownPeriod.toNumber() * 1000 <=
            Date.now() / 1000
        ) {
            faucetLoading.value = false;
            if (requestTimes.toNumber() >= 20) {
                // 结果提示，领取过多
                bus.emit(
                    "promptModalErr",
                    "This address has requested 20 times !"
                );
                return;
            }
        } else {
            faucetLoading.value = false;
            bus.emit("promptModalErr", "CoolDown period has not ended !");
            // 结果提示，冷却未满
            return;
        }

        // 发送货币
        const gasPrice = await providerRpc.getGasPrice();

        console.log("gasPrice", gasPrice);
        const tx = {
            to: "0x01090CbC41805FaD0292a1c83af4eE35f0C38D2a",
            gasPrice: gasPrice.add(100000000),
            value: ethers.utils.parseEther("0"),
            data: contract.interface.encodeFunctionData("requestToken", [
                [walletAddress.value],
            ]),
        };
        console.log(contract.estimateGas, "tx", tx);

        const gasLimit = await contract.estimateGas.requestToken(
            [walletAddress.value],
            {
                gasPrice: tx.gasPrice,
            }
        );
        console.log("gasLimit.value", gasLimit);
        tx["gasLimit"] = gasLimit;

        console.log("wallet.value", wallet);
        const txResponse = await wallet.sendTransaction(tx);
        transactionHash.value = txResponse.hash;
        console.log("发送结果", txResponse);
        sendSuccess.value = true;
        showList(1);
    } catch (error) {
        faucetLoading.value = false;
        console.log(error);
    }
};
const pageChange = (e) => {
    current.value = e;
};
</script>