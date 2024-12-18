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
import { ref, onMounted, watch, computed } from "vue";

import { downloadAllFiles } from "@/utils/fileDown";
const solContent = ref("");
import { stablecoin } from "@openzeppelin/wizard";
let contarctName = ref("MyStablecoin");
let contarctSymbol = ref("MST");
let features = ref("");
// access是否可以取消
const accessOptionsBol = ref(false);
let premint = ref("");
const accessControlRadio = ref(null);
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
        value: "flashminting",
        tip: "Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20FlashMint'>Read more.</a>",
    },
    {
        label: "Custodian",
        value: "custodian",
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
const limitationsOptions = [
    {
        label: "Allowlist",
        value: "allowlist",
        tip: "Uses more complex proxy with higher overhead, requires less changes in your contract. Can also be used with beacons.<a target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/proxy#TransparentUpgradeableProxy'>Read more.</a>",
    },
    {
        label: "Blocklist",
        value: "blocklist",
        tip: "Uses simpler proxy with less overhead, requires including extra code in your contract. Allows flexibility for authorizing upgrades.<a  target='_blank' href='https://docs.openzeppelin.com/contracts/5.x/api/proxy#UUPSUpgradeable'>Read more.</a>",
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
};
// 文本相关的配置
const dispositionText = () => {
    // 如果选中了mintablehuost或pausable 则需要选中accessOptions里面的选项
    if (
        features.value.includes("mintable") ||
        features.value.includes("pausable") ||
        features.value.includes("custodian")
    ) {
        accessOptionsBol.value = true;
        if (!accessControlRadio.value) {
            accessControlRadio.value = "ownable";
        }
    } else {
        accessOptionsBol.value = false;
    }
    solContentChange();
};
</script>