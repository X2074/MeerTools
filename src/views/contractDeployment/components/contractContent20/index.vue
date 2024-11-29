<style scoped lang="scss">
@import "./index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import {
    ownableSol,
    rolesSol,
    managedSol,
    rolesSolGrant,
    rolesSolFn,
} from "./demoCode/accessControl.js";
import { pause, unpause, update } from "./demoCode/pausable.js";
import {
    exportTitleH1,
    exportTitleH2,
    exportTitleH3,
    exportImport,
} from "./demoCode/exportCode.js";
import { mintableExportFn } from "./demoCode/mintTable.js";
import {
    Pausableimport,
    Burnableimport,
    ownerimport,
    Rolesimport,
    Managedimport,
    permintimport,
    FlashMintimport,
} from "./demoCode/import.js";
import { accessListify } from "ethers/lib/utils.js";
const solContent = ref("");
let constructorName = ref(``);
// 合约的名称
let contarctName = ref("MyToken");
// 合约的Symbol
let contarctSymbol = ref("MTK");
let license = ref("");
// 铸币参数
let mintDecimals = ref(`{}`);
let premint = ref(0);
// features选项卡部分
let features = ref([]);
// ACCESS CONTROL选项卡部分
let accessControl = ref(false);
let accessControlFn = ref("");
let accessControlRadio = ref("");
let accessControlConstructorFn = ref("");

// 左侧选择引入的数据
let accessControlImport = ref(``);
let BurnableImport = ref("");
let PausableImport = ref(``);
let permintImport = ref(``);
let RolesImport = ref("");
let ManagedImport = ref("");

// mintable
let mintable = ref("");
let mintableConstructorFn = ref(``);
let mintbaleByte = ref(``);
// Pausable
let pausablePause = ref(``);
let pausableUnpause = ref(``);
let pausableUpdate = ref(``);
let pausableConstructorFn = ref(``);
let pausableName = ref(``);
let pausableByte = ref(``);
// Burnable
let burnableContract = ref(``);
// upgradeability
let upgradeability = ref(``);
let upgradeabilityRadio = ref(``);

onMounted(() => {
    updateSolContent();
});
watch(
    () => premint.value,
    (newV) => {
        mintDecimals.value = newV
            ? `
    {
        _mint(msg.sender, ${newV} * 10 ** decimals())
    }`
            : "{}";
        updateSolContent();
    }
);
watch(
    () => contarctSymbol.value,
    (newV) => {
        updateSolContent();
    }
);
watch(
    () => contarctName.value,
    (newV) => {
        updateSolContent();
    }
);
const updateSolContent = () => {
    solContent.value = `${exportTitleH1}${license.value || `MIT`}
${exportTitleH2}
${exportTitleH3}

${exportImport}${RolesImport.value}
${ManagedImport.value}${accessControlImport.value}
${BurnableImport.value}
${PausableImport.value}
${permintImport.value}

contract ${contarctName.value} is ERC20 ${accessControlFn.value}${
        burnableContract.value
    }${pausableName.value} {
${mintbaleByte.value}
${pausableByte.value}


${accessControlConstructorFn.value}
${mintableConstructorFn.value}
${pausableConstructorFn.value}

${mintable.value}

${pausablePause.value}
${pausableUnpause.value}
${pausableUpdate.value}
`;
};
// 是否显示全部
watch(
    () => features.value,
    (newV) => {
        if (!features.value.includes("mintable")) {
            ManagedImport.value = ``;
            mintable.value = "";
            mintableConstructorFn.value = ``;
        } else {
            // 选择mint后ACCESS CONTROL必选一项
            if (!accessControlRadio.value) {
                accessControlRadio.value = "ownable";
                accessControlFn.value = ", Ownable";
                accessControlImport.value = ownerimport;
            }
            mintableConstructorFn.value = ``;
            mintable.value = mintableExportFn;
            if (accessControlRadio.value == "roles") {
                mintableConstructorFn.value = `_grantRole(MINTER_ROLE, minter)`;
                mintbaleByte.value = `bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");`;
            } else {
                mintableConstructorFn.value = ``;
                mintbaleByte.value = ``;
            }
        }
        if (!features.value.includes("pausable")) {
            pausablePause.value = ``;
            pausableUnpause.value = ``;
            pausableUpdate.value = ``;
            pausableName.value = ``;
            pausableConstructorFn.value = ``;
        } else {
            pausableName.value = `, ERC20Pausable`;
            // 选择pausable后ACCESS CONTROL必选一项
            if (accessControlRadio.value == "roles") {
                pausableConstructorFn.value = `_grantRole(PAUSER_ROLE, pauser);`;
                pausableByte.value = `bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");`;
            } else {
                pausableConstructorFn.value = ``;
                pausableByte.value = ``;
            }
            pausablePause.value = pause;
            pausableUnpause.value = unpause;
            pausableUpdate.value = update;
        }
        if (!features.value.includes("burnable")) {
            BurnableImport.value = ``;
            burnableContract.value = ``;
        } else {
            BurnableImport.value = Burnableimport;
            burnableContract.value = `, ERC20Burnable`;
        }
        updateSolContent();
    }
);
// ACCESS CONTROL 单选框部分
watch(
    () => accessControlRadio.value,
    (newV) => {
        if (newV == "ownable") {
            accessControlFn.value = ", Ownable";
            accessControlImport.value = ownerimport;
            // constructor中引入的方法
            accessControlConstructorFn.value = `Ownable(initialOwner)`;
        }
        if (newV == "roles") {
            accessControlFn.value = ", AccessControl";
            accessControlImport.value = Rolesimport;
            accessControlConstructorFn.value = `
            _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);`;
            if (features.value.includes("mintable")) {
                mintableConstructorFn.value = `_grantRole(MINTER_ROLE, minter)`;
                mintbaleByte.value = `bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");`;
            } else {
                mintableConstructorFn.value = ``;
                mintbaleByte.value = ``;
            }
            if (features.value.includes("pausable")) {
                pausableConstructorFn.value = `_grantRole(PAUSER_ROLE, pauser);`;
                pausableByte.value = `bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");`;
            } else {
                pausableConstructorFn.value = ``;
                pausableByte.value = ``;
            }
        } else {
            mintableConstructorFn.value = ``;
            mintbaleByte.value = ``;
            pausableConstructorFn.value = ``;
            pausableByte.value = ``;
        }
        if (newV == "managed") {
            accessControlFn.value = ", AccessManaged";
            accessControlImport.value = Managedimport;
            accessControlConstructorFn.value = `AccessManaged(initialAuthority)`;
        }
        updateSolContent();
    }
);
// upgradeability单选部分
watch(
    () => upgradeabilityRadio.value,
    (newV) => {}
);
</script>