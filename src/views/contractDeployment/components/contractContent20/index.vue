<style scoped lang="scss">
@import "../index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts">
export default {
    name: "contractContent20",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { downloadAllFiles } from "@/utils/fileDown";
import { Buffer } from "buffer";
import { REMIX_URL } from "@/config/constants/constant";
import { saveAs } from "file-saver";
import bus from "@/utils/bus.js";
import useClipboard from "vue-clipboard3";
import { erc20 } from "@openzeppelin/wizard";
const { toClipboard } = useClipboard();
const solContent = ref("");
let contarctName = ref("MyToken");
let contarctSymbol = ref("ETK");
let premint = ref("0");
let features = ref(["permit"]);
// 多选与单选的联动
const accessControlCheck = ref(false);
let votesCheck = ref(false);
const accessOptionsBol = ref(false);
const accessControlRadio: any = ref(null);
const voteOptionsRadio = ref(null);
const contarctLicense = ref("MIT");
const contarctSecurityContact = ref("");
const featuresOptions = ref([
    {
        label: "Mintable",
        value: "mintable",
        tip: "Privileged accounts will be able to create more supply.",
    },
    {
        label: "Burnable",
        value: "burnable",
        tip: 'Token holders will be able to destroy their tokens.<a href="https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20Burnable">Read more.</a>',
    },
    {
        label: "Pausable",
        value: "pausable",
        tip: 'Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.<a target="_blank" href="https://docs.openzeppelin.com/contracts/5.x/api/utils#Pausable">Read more.</a>',
    },
    {
        label: "Permit",
        value: "permit",
        tip: 'Without paying gas, token holders will be able to allow third parties to transfer from their account.<a target="_blank" href="https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20Permit">Read more.</a>',
    },
    {
        label: "Flash Minting",
        value: "flashminting",
        tip: "Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20FlashMint'>Read more.</a>",
    },
]);
const voteOptions = ref([
    {
        label: "Block Number",
        value: "blockNumber",
        tip: "Uses voting durations expressed as block numbers.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/governance#governor'>Read more.</a>",
    },
    {
        label: "Timestamp",
        value: "timestamp",
        tip: "Uses voting durations expressed as timestamps.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/governance#timestamp_based_governance'>Read more.</a>",
    },
]);
const accessOptions = ref([
    {
        label: "Ownable",
        value: "ownable",
        tip: "Simple mechanism with a single account authorized for all privileged actions.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable' >Read more.</a>",
    },
    {
        label: "Roles",
        value: "roles",
        tip: "Flexible mechanism with a separate role for each privileged action. A role can have many authorized accounts.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/access#AccessControl'>Read more.</a>",
    },
    {
        label: "Managed",
        value: "managed",
        tip: "Enables a central contract to define a policy that allows certain callers to access certain functions.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/access#AccessManaged'>Read more.</a>",
    },
]);
const upGradeabilityOptions = [
    {
        label: "Transparent",
        value: "Transparent",
        tip: "Uses more complex proxy with higher overhead, requires less changes in your contract. Can also be used with beacons.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/proxy#TransparentUpgradeableProxy'>Read more.</a>",
    },
    {
        label: "UUPS",
        value: "uups",
        tip: "Uses simpler proxy with less overhead, requires including extra code in your contract. Allows flexibility for authorizing upgrades.<a  target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/proxy#UUPSUpgradeable'>Read more.</a>",
    },
];

onMounted(() => {
    solContentChange();
});

const solContentChange = () => {
    const contract = erc20.print({
        access: accessControlRadio.value ? accessControlRadio.value : false,
        burnable: features.value.includes("burnable"),
        flashmint: features.value.includes("flashminting"),
        info: {
            license: contarctLicense.value,
            securityContact: contarctSecurityContact.value,
        },
        mintable: features.value.includes("mintable"),
        name: contarctName.value,
        pausable: features.value.includes("pausable"),
        permit: features.value.includes("permit"),
        premint: premint.value,
        symbol: contarctSymbol.value,
        votes: voteOptionsRadio.value ? voteOptionsRadio.value : false,
    });
    solContent.value = contract;
    bus.emit("loadingIndex", "erc20");
};
// 文本相关的配置
const dispositionText = () => {
    // 如果选中了mintablehuost或pausable 则需要选中accessOptions里面的选项
    if (
        features.value.includes("mintable") ||
        features.value.includes("pausable")
    ) {
        accessOptionsBol.value = true;
        accessControlCheck.value = true;
        if (!accessControlRadio.value) {
            accessControlRadio.value = "ownable";
        }
    } else {
        accessOptionsBol.value = false;
        accessControlRadio.value = "";
        accessOptionsBol.value = false;
        accessControlCheck.value = false;
    }
    if (voteOptionsRadio.value) {
        votesCheck.value = true;
    }
    solContentChange();
};
// access文本相关的配置
const dispositionAccess = () => {
    accessControlCheck.value = true;
    if (accessControlRadio.value) {
        accessControlCheck.value = true;
    }
    solContentChange();
};

const voteChange = (e) => {
    if (!votesCheck.value) {
        voteOptionsRadio.value = "";
    } else {
        if (!voteOptionsRadio.value) {
            voteOptionsRadio.value = "blockNumber";
        }
    }
    solContentChange();
};

const downLoad = () => {
    downloadAllFiles(contarctName.value, solContent.value);
};

// 复制
bus.on("ERC20copy", async (type) => {
    console.log(type, "typetype");
    try {
        //复制
        await toClipboard(solContent.value);
        bus.emit("promptModalSuccess", "ERC20 Copy Successful !");
    } catch (e) {
        // Copy Failed
        bus.emit("promptModalErr", "ERC20 Copy Failed !");
    }
});
// 下载文件
bus.on("ERC20down", async (type) => {
    const blob = new Blob([solContent.value], { type: "text/plain" });
    saveAs(blob, contarctName.value + ".sol");
});
// 下载文件夹
bus.on("ERC20zip", async (type) => {
    console.log(contarctName.value, "contarctName.value");
    downloadAllFiles(contarctName.value, solContent.value, type);
});
// 打开remix
bus.on("ERC20Remix", async (type) => {
    let base64 = Buffer.from(solContent.value, "utf-8").toString("base64");
    window.open(REMIX_URL + "/?#code=" + base64 + "&theme=Dark");
});
defineExpose({ solContentChange });
</script>