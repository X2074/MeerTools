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
    mintableimport,
    Rolesimport,
    Managedimport,
    permintimport,
    FlashMintimport,
} from "./demoCode/import.js";
import { accessListify } from "ethers/lib/utils.js";
// 合约的名称
let contarctName = ref("MyToken");
// 合约的Symbol
let contarctSymbol = ref("MTK");
// 铸币参数
let mintDecimals = ref(`{}`);
const solContent = ref("");
let premint = ref(0);

let mintableBol = ref(false);
let BurnableBol = ref(false);
let PausableBol = ref(false);
let PermitBol = ref(false);
let FlashMintingBol = ref(false);
// 左侧选择引入的数据
let mintable = ref(``);
let Burnable = ref("");
let Pausable = ref(``);
let permintImport = ref(``);
let FlashMint = ref(``);
//引入mintable，下面的数据开发时候清空，以watch监听为主
let mintableFn = ref("");
let mintableContentFn = ref(``);
let mintableFnContent = ref(`    constructor()`);
// 引入mintable、Pausable，下面数据开发时候清空
let mintableFnPausableCon = ref(``);
//引入Burnable，下面的数据开发时候清空，以watch监听为主
let ERCBurnable = ref(``);
//引入Pausable，下面的数据开发时候清空，以watch监听为主
let ERCPausable = ref(`, ERC20Pausable`);
let ERCPausableContent = ref(``);
//引入permint，下面的数据开发时候清空，以watch监听为主
let ERCPermint = ref(``);
// access control选项
let accessControlOwnableBol = ref(false);
let accessControlRolesBol = ref(false);
let accessControlManagedBol = ref(false);
let OwnableImport = ref(``);
let ERCPausableRoles = ref(`, AccessControl`);
let GrantPausableRoles = ref(``);
let RolesImport = ref(``);
let ManagedImport = ref(``);
onMounted(() => {
    updateSolContent();
});
watch(
    () => premint.value,
    (newV) => {
        if (!newV) {
            mintDecimals.value = "{}";
        } else {
            mintDecimals.value = `{
        _mint(msg.sender, ${newV} * 10 ** decimals())
    }`;
            updateSolContent();
        }
        console.log(mintDecimals.value, "mintDecimals.value");
    }
);
const updateSolContent = () => {
    solContent.value = `${exportTitleH1}MIT
${exportTitleH2}
${exportTitleH3}

${exportImport}${RolesImport.value}${ManagedImport.value}${mintable.value}${Burnable.value}${Pausable.value}${permintImport.value}
${FlashMint.value}
contract ${contarctName.value} is ERC20${mintableFn.value}${ERCBurnable.value}${ERCPausable.value}${ERCPausableRoles.value} {
${mintableFnContent.value}    ERC20("${contarctName.value}", "${contarctSymbol.value}")${mintableFnPausableCon.value}${ERCPermint.value}${mintDecimals.value}
${mintableContentFn.value}
${ERCPausableContent.value}
}
    `;
};
// 是否显示全部
watch(
    () => mintableBol.value,
    (newV) => {
        if (newV) {
            mintable.value = "";
            mintableFnPausableCon.value = "";
            mintableFn.value = "";
            mintableContentFn.value = "";
            mintableFnContent.value = "";
        } else {
            mintable.value = mintableimport;
            mintableFn.value = ", AccessManaged";
            mintableFnPausableCon.value = `
        Ownable(initialOwner)
    `;
            ManagedImport.value = Managedimport;
            mintableContentFn.value = mintableExportFn;
            mintableFnContent.value = `    constructor(address initialOwner)
    `;
            updateSolContent();
        }
    }
);
watch(
    () => BurnableBol.value,
    (newV) => {
        if (!newV) {
            Burnable.value = "";
            ERCBurnable.value = "";
        } else {
            Burnable.value = Burnableimport;
            ERCBurnable.value = `, ERC20Burnable`;
        }
        updateSolContent();
    }
    // { immediate: true }
);
watch(
    () => PermitBol.value,
    (newV) => {
        if (!newV) {
            permintImport.value = "";
        } else {
            permintImport.value = permintimport;
        }
        updateSolContent();
    }
);
watch(
    () => FlashMintingBol.value,
    (newV) => {
        if (!newV) {
            FlashMint.value = "";
        } else {
            FlashMint.value = FlashMintimport;
        }
        updateSolContent();
    }
    // { immediate: true }
);
watch(
    () => PausableBol.value,
    (newV) => {
        if (!newV) {
            Pausable.value = "";
            mintableFnContent.value = "";
            ERCBurnable.value = "";
            mintableFnPausableCon.value = ``;
            ERCPausableContent.value = ``;
        } else {
            Pausable.value = Pausableimport;
            mintableFnContent.value = `    constructor(address initialOwner)
    `;
            mintableFnPausableCon.value = `
        Ownable(initialOwner)
    `;
            ERCBurnable.value = `, ERC20Burnable`;
        }

        updateSolContent();
    }
    // { immediate: true }
);

watch(
    () => accessControlOwnableBol.value,
    (newV) => {
        if (newV) {
            ERCPausableContent.value = ownableSol;
            mintableFnPausableCon.value = ``;
            ManagedImport.value = ``;
            RolesImport.value = ``;
        }
    }
);
watch(
    () => accessControlRolesBol.value,
    (newV) => {
        if (newV) {
            ERCPausableContent.value = rolesSol;
            mintableFnPausableCon.value = ``;
            ERCPermint.value = ``;
            mintDecimals.value = rolesSolGrant;
            mintableFnContent.value = rolesSolFn;
            RolesImport.value = Rolesimport;
            ManagedImport.value = ``;
        }
    }
);
watch(
    () => accessControlManagedBol.value,
    (newV) => {
        if (!newV) {
            mintableFnPausableCon.value = `
    AccessManaged(initialAuthority)
    `;
            ERCPermint.value = ``;
            ERCPausableContent.value = managedSol;
            ManagedImport.value = Managedimport;

            RolesImport.value = ``;
            RolesImport.value = ``;
        }
    },
    { immediate: true }
);
</script>