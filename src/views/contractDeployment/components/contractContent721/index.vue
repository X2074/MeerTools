<style scoped lang="scss">
@import "../index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts">
export default {
    name: "contractContent721",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { Buffer } from "buffer";
import { REMIX_URL } from "@/config/constants/constant";
import { downloadAllFiles } from "@/utils/fileDown";
import { erc721 } from "@openzeppelin/wizard";
import { saveAs } from "file-saver";
import bus from "@/utils/bus.js";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
const solContent = ref("");
let contarctName = ref("MyToken");
let contarctSymbol = ref("ETK");
let baseUrl = ref("");
let features = ref([]);
const accessOptionsBol = ref(false);
const accessControlRadio = ref(null);
// 多选与单选的联动
const accessControlCheck = ref(false);
let votesCheck = ref(false);
const upgradeabilityRadio = ref(null);
const voteOptionsRadio = ref(null);
const contarctLicense = ref("MIT");
const accessControl = ref("");
const contarctSecurityContact = ref("");
const upGradeability = ref("");
const featureCheck = ref({
    mintable: false,
    incremental: false,
});
const featuresOpt1 = ref([
    {
        label: "Mintable",
        value: "mintable",
        tip: "Privileged accounts will be able to emit new tokens.",
    },
]);
const featuresOpt2 = ref([
    {
        label: "Auto Increment Ids",
        value: "incremental",
        tip: "New tokens will be automatically assigned an incremental id.",
    },
]);
const featuresOptions = ref([
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
        label: "Enumerable",
        value: "enumerable",
        tip: 'Allows on-chain enumeration of all tokens or those owned by an account. Increases gas cost of transfers.<a target="_blank" href="https://docs.openzeppelin.com/contracts/5.x/api/token/erc721#ERC721Enumerable">Read more.</a>',
    },
    {
        label: "URI Storage",
        value: "uriStorage",
        tip: "https://docs.openzeppelin.com/contracts/5.x/api/token/erc721#ERC721Enumerable.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/token/erc721#ERC721URIStorage'>Read more.</a>",
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
    console.log(erc721, "erc721");
    solContentChange();
});
const solContentChange = () => {
    console.log(featureCheck.value, "featureCheck.value");

    const contract = erc721.print({
        name: contarctName.value,
        baseUri: baseUrl.value,
        symbol: contarctSymbol.value,

        access: accessControlRadio.value ? accessControlRadio.value : false,
        info: {
            license: contarctLicense.value,
            securityContact: contarctSecurityContact.value,
        },
        mintable: featureCheck.value["mintable"],
        incremental: featureCheck.value["incremental"],
        pausable: features.value.includes("pausable"),
        burnable: features.value.includes("burnable"),
        enumerable: features.value.includes("enumerable"),
        uriStorage: features.value.includes("uriStorage"),

        votes: voteOptionsRadio.value ? voteOptionsRadio.value : false,
    });
    console.log(contract, "contract");

    solContent.value = contract;
    bus.emit("loadingIndex", "erc721");
};
// 文本相关的配置
const dispositionText = (e) => {
    if (
        features.value.indexOf("incremental") > -1 &&
        features.value.indexOf("mintable") == -1
    ) {
        features.value.push("mintable");
    }

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
    }
    if (!features.value || !features.value.length) {
        accessControlRadio.value = "";
        accessOptionsBol.value = false;
        accessControlCheck.value = false;
    }
    if (accessControlRadio.value) {
        accessControlCheck.value = true;
    }
    if (voteOptionsRadio.value) {
        votesCheck.value = true;
    }
    solContentChange();
};

// 文本相关的配置
const dispositionAccess = () => {
    accessControlCheck.value = true;
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
const mintableChange = () => {
    if (!featureCheck.value.mintable) {
        featureCheck.value.incremental = false;
    }
    solContentChange();
};
const incrementalChange = () => {
    if (featureCheck.value.incremental) {
        featureCheck.value.mintable = true;
    }
    solContentChange();
    console.log(featureCheck.value.incremental, "featureCheck.incremental");
};

// 复制
bus.on("ERC721copy", async (type) => {
    try {
        //复制
        await toClipboard(solContent.value);
        bus.emit("promptModalSuccess", "ERC721 Copy Successful !");
    } catch (e) {
        // Copy Failed
        bus.emit("promptModalErr", "ERC721 Copy Failed !");
    }
});
// 下载文件
bus.on("ERC721down", async (type) => {
    const blob = new Blob([solContent.value], { type: "text/plain" });
    saveAs(blob, contarctName.value + ".sol");
});
// 下载文件夹
bus.on("ERC721zip", async (type) => {
    downloadAllFiles(contarctName.value, solContent.value, type);
});
// 打开remix
bus.on("ERC721Remix", async (type) => {
    console.log(solContent.value, "solContent.value");
    let base64 = Buffer.from(solContent.value, "utf-8").toString("base64");
    console.log(base64, "base64");
    window.open(REMIX_URL + "/?#code=" + base64 + "&theme=Dark");
});
</script>