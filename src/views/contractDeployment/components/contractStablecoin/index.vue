<style scoped lang="scss">
@import "../index.scss";
.title1 {
    display: block !important;
}
</style>
<template src="./index.html"></template>
<script lang="ts">
export default {
    name: "contractStablecoin",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { Buffer } from "buffer";
import { REMIX_URL } from "@/api/constant";
import { saveAs } from "file-saver";
import bus from "@/utils/bus.js";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
const solContent = ref("");
import { stablecoin } from "@openzeppelin/wizard";
let contarctName = ref("MyStablecoin");
let contarctSymbol = ref("MST");
let features = ref("");
// access是否可以取消
const accessOptionsBol = ref(false);
// 多选与单选的联动
let limotationCheck = ref(false);
let votesCheck = ref(false);
let accessCheck = ref(false);

let premint = ref("");
const accessControlRadio = ref(null);
let voteOptionsRadio = ref("");
const limitationsRadio = ref(null);
const contarctLicense = ref("MIT");
const accessControl = ref("");
const contarctSecurityContact = ref("");
const upGradeability = ref("");
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
        value: "flashmint",
        tip: "Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20FlashMint'>Read more.</a>",
    },
    {
        label: "Custodian",
        value: "custodian",
        tip: "Authorized accounts can freeze and unfreeze accounts for regulatory or security purposes.",
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
const limitationsOptions = [
    {
        label: "Allowlist",
        value: "allowlist",
        tip: "Allows a list of addresses to transfer tokens.",
    },
    {
        label: "Blocklist",
        value: "blocklist",
        tip: "Blocks a list of addresses from transferring tokens.",
    },
];

onMounted(() => {
    solContentChange();
});

const solContentChange = () => {
    const contract = stablecoin.print({
        name: contarctName.value,
        symbol: contarctSymbol.value,
        premint: premint.value,
        access: accessControlRadio.value ? accessControlRadio.value : false,
        limitations: limitationsRadio.value ? limitationsRadio.value : false,
        info: {
            license: contarctLicense.value,
            securityContact: contarctSecurityContact.value,
        },

        mintable: features.value.includes("mintable"),
        burnable: features.value.includes("burnable"),
        pausable: features.value.includes("pausable"),
        permit: features.value.includes("permit"),
        flashmint: features.value.includes("flashmint"),
        custodian: features.value.includes("custodian"),
    });
    solContent.value = contract;
    bus.emit("loadingIndex", "stablecoin");
};
// 文本相关的配置
const dispositionText = () => {
    // 如果选中了mintablehuost或pausable 则需要选中accessOptions里面的选项
    if (
        features.value.includes("mintable") ||
        features.value.includes("pausable") ||
        features.value.includes("custodian") ||
        limitationsRadio.value
    ) {
        accessOptionsBol.value = true;
        accessCheck.value = true;
        if (!accessControlRadio.value) {
            accessControlRadio.value = "ownable";
        }
    } else {
        accessOptionsBol.value = false;
    }
    if (voteOptionsRadio.value) {
        votesCheck.value = true;
    }
    if (accessControlRadio.value) {
        accessCheck.value = true;
    }
    solContentChange();
};
const limotationChange = () => {
    if (!limotationCheck.value) {
        limitationsRadio.value = "";
        if (
            !features.value.includes("mintable") &&
            !features.value.includes("pausable") &&
            !features.value.includes("custodian")
        ) {
            accessOptionsBol.value = false;
            accessCheck.value = false;
            accessControlRadio.value = "";
        }
    } else {
        accessOptionsBol.value = true;
        accessCheck.value = true;
        if (!accessControlRadio.value) {
            accessControlRadio.value = "ownable";
        }
        if (!limitationsRadio.value) {
            limitationsRadio.value = "allowlist";
        }
    }
    solContentChange();
};
const voteChange = () => {
    if (!votesCheck.value) {
        voteOptionsRadio.value = "";
    } else {
        if (!voteOptionsRadio.value) {
            voteOptionsRadio.value = "blockNumber";
        }
    }
    solContentChange();
};
// 复制
bus.on("stablecoincopy", async (type) => {
    try {
        //复制
        await toClipboard(solContent.value);
        bus.emit("promptModalSuccess", "Stablecoin复制成功");
    } catch (e) {
        //复制失败
        bus.emit("promptModalErr", "Stablecoin复制失败");
    }
});
// 下载文件
bus.on("stablecoindown", async (type) => {
    const blob = new Blob([solContent.value], { type: "text/plain" });
    saveAs(blob, contarctName.value + ".sol");
});
// 打开remix
bus.on("stablecoinRemix", async (type) => {
    let base64 = Buffer.from(solContent.value, "utf-8").toString("base64");
    window.open(REMIX_URL + "/?#code=" + base64 + "&theme=Dark");
});
</script>