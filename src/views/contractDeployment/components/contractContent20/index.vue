<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";

const solContent = ref("");
import { erc20 } from "@openzeppelin/wizard";
let contarctName = ref("ExampleToken");
let contarctSymbol = ref("ETK");
let premint = ref("");
let features = ref("");
// let contarctName = ref("");
// let contarctName = ref("");
const accessControlRadio = ref("");
const upgradeabilityRadio = ref("");
const accessControl = ref("");
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
]);
const voteOptions = ref([
  {
    label: "Block Number",
    value: "BlockNumber",
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
  //   solContentChange();
});

const solContentChange = () => {
  // const contract = erc20.print({
  //     name: contarctName.value, // 代币名称
  //     symbol: contarctSymbol.value, // 代币符号
  //     premint: premint.value + "", //初始供应量

  //     mintable: features.value.includes("mintable"), // 允许铸造
  //     burnable: features.value.includes("burnable"), // 不允许销毁
  //     pausable: features.value.includes("pausable"), //
  //     permit: features.value.includes("permit"), //
  //     flashmint: features.value.includes("flashmint"), //

  //     // access : 'ownable', 'roles', 'managed'
  //     access: "roles",
  //     votes: "timestamp",
  //     // upgradeable: "uups",
  //     info: {
  //         license: "aaaa", //执照
  //         securityContact: "ssss", //联系方式
  //     },
  // });
  console.log("contract", erc20.defaults);
  const contract = erc20.print({
    ...{
      access: false,
      burnable: false,
      flashmint: false,
      info: { license: "MIT" },
      mintable: false,
      name: "MyToken",
      pausable: false,
      permit: true,
      premint: "0",
      symbol: "MTK",
    },
    upgradeable: "uups",
  });
  solContent.value = contract;
  console.log(contract, "contract", erc20.defaults);
};
</script>