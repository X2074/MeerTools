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

onMounted(() => {
    solContentChange();
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