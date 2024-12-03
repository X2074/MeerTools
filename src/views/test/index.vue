<style scoped lang="scss">
.highlight {
    width: 929px;
    height: 1200px;
    border-radius: 8px;
    background: rgba(25, 26, 28, 1);
    backdrop-filter: blur(40px);
    overflow: hidden;
    overflow: auto;
}
</style>
<template>
    <div class="test">
        <div class="highlight">
            <highlightjs autodetect :code="solContent"></highlightjs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { erc20 } from "@openzeppelin/wizard";
const contract = erc20.print({
    name: "ExampleToken",
    symbol: "ETK",
    burnable: true,
    premint: "1000000",
    mintable: true,
    transparent: true,
    pausable: true,
    roles: true,
});

let solContent = ref("");

onMounted(() => {
    solContent.value = contract;
    console.log(contract, "contract", erc20);
});
</script>