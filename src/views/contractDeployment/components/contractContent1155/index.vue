<style scoped lang="scss">
@import "../index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts">
export default {
    name: "contractContent1155",
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Buffer } from "buffer";
import { REMIX_URL } from "@/config/constants/constant";
import { downloadAllFiles } from "@/utils/fileDown";
import { erc1155 } from "@openzeppelin/wizard";
import { saveAs } from "file-saver";
import bus from "@/utils/bus.js";
import useClipboard from "vue-clipboard3";
const solContent = ref("");
const { toClipboard } = useClipboard();
let contarctName = ref("MyToken");
let baseUrl = ref("");
let features = ref(["updatableURI"]);
// access是否可以取消
const accessOptionsBol = ref(false);
const accessControlRadio: any = ref("ownable");
// 控制access是否可以取消
const accessControlCheck = ref(true);
const upgradeabilityRadio = ref(null);
const contarctLicense = ref("MIT");
const accessControl = ref("");
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
        label: "Supply Tracking",
        value: "supplyTracking",
        tip: "Keeps track of total supply of tokens.",
    },
    {
        label: "Pausable",
        value: "pausable",
        tip: 'Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.<a target="_blank" href="https://docs.openzeppelin.com/contracts/5.x/api/utils#Pausable">Read more.</a>',
    },
    {
        label: "Updatable URI",
        value: "updatableURI",
        tip: "Privileged accounts will be able to set a new URI for all token types. Clients will replace any instance of {id} in the URI with the tokenId.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/token/erc1155#ERC1155-_setURI-string-'>Read more.</a>",
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
    const contract = erc1155.print({
        name: contarctName.value,
        uri: baseUrl.value,
        access: accessControlRadio.value ? accessControlRadio.value : false,
        info: {
            license: contarctLicense.value,
            securityContact: contarctSecurityContact.value,
        },
        mintable: features.value.includes("mintable"),
        burnable: features.value.includes("burnable"),
        supply: features.value.includes("supplyTracking"),
        pausable: features.value.includes("pausable"),
        updatableUri: features.value.includes("updatableURI"),
    });
    solContent.value = contract;
    bus.emit("loadingIndex", "erc1155");
};
// 文本相关的配置
const dispositionText = () => {
    // 如果选中了mintablehuost或pausable 则需要选中accessOptions里面的选项
    if (
        features.value.includes("mintable") ||
        features.value.includes("pausable") ||
        features.value.includes("updatableURI")
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
    solContentChange();
};
// access文本相关的配置
const dispositionAccess = () => {
    accessControlCheck.value = true;
    solContentChange();
};
// 复制
bus.on("ERC1155copy", async (type) => {
    try {
        //复制
        await toClipboard(solContent.value);
        bus.emit("promptModalSuccess", "ERC1155 Copy Successful !");
    } catch (e) {
        // Copy Failed
        bus.emit("promptModalErr", "ERC1155 Copy Failed !");
    }
});
// 下载文件
bus.on("ERC1155down", async (type) => {
    const blob = new Blob([solContent.value], { type: "text/plain" });
    saveAs(blob, contarctName.value + ".sol");
});
// 下载文件夹
bus.on("ERC1155zip", async (type) => {
    downloadAllFiles(contarctName.value, solContent.value, type);
});
// 打开remix
bus.on("ERC1155Remix", async (type) => {
    let base64 = Buffer.from(solContent.value, "utf-8").toString("base64");
    window.open(REMIX_URL + "/?#code=" + base64 + "&theme=Dark");
});
</script>