<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts">
export default {
  name: "contractContent721",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";

import { downloadAllFiles } from "@/utils/fileDown";
import { erc721 } from "@openzeppelin/wizard";
const solContent = ref("");
let contarctName = ref("MyToken");
let contarctSymbol = ref("ETK");
let baseUrl = ref("");
let features = ref([]);
// access是否可以取消
const accessOptionsBol = ref(false);
const accessControlRadio = ref(null);
const upgradeabilityRadio = ref(null);
const voteOptionsRadio = ref(null);
const contarctLicense = ref("MIT");
const accessControl = ref("");
const contarctSecurityContact = ref("");
const upGradeability = ref("");
const featureCheck = ref({});
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
/* watch(features, (newV, oldV) => {
  console.log(newV, "nn");
  if (newV.indexOf("incremental") > -1 && newV.indexOf("mintable") == -1) {
    features.value.push("mintable");
  }
}); */
const solContentChange = () => {
  const contract = erc721.print({
    name: contarctName.value,
    baseUri: baseUrl.value,
    symbol: contarctSymbol.value,

    access: accessControlRadio.value ? accessControlRadio.value : false,
    info: {
      license: contarctLicense.value,
      securityContact: contarctSecurityContact.value,
    },
    mintable: features.value.includes("mintable"),
    incremental: features.value.includes("incremental"),
    pausable: features.value.includes("pausable"),
    burnable: features.value.includes("burnable"),
    enumerable: features.value.includes("enumerable"),
    uriStorage: features.value.includes("uriStorage"),

    votes: voteOptionsRadio.value ? voteOptionsRadio.value : false,
  });
  console.log(contract, "contract");

  solContent.value = contract;
};
// 文本相关的配置
const dispositionText = (e) => {
  console.log(e);
  /*   if (
    features.value.indexOf("incremental") > -1 &&
    features.value.indexOf("mintable") == -1
  ) {
    features.value.push("mintable");
  } */

  // 如果选中了mintablehuost或pausable 则需要选中accessOptions里面的选项
  if (
    features.value.includes("mintable") ||
    features.value.includes("pausable")
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

const voteChange = (e) => {
  if (e.target.checked && !voteOptionsRadio.value) {
    voteOptionsRadio.value = "blockNumber";
  }
  if (!e.target.checked && voteOptionsRadio.value) {
    voteOptionsRadio.value = "";
  }
  solContentChange();
};

const downLoad = () => {
  downloadAllFiles(contarctName.value, solContent.value);
};
</script>