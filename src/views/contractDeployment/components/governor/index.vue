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
import bus from "@/utils/bus.js";
import { downloadAllFiles } from "@/utils/fileDown";
import { governor } from "@openzeppelin/wizard";
const solContent = ref("");
const contarctName = ref("MyGovernor");
const delayDay = ref("1 day");
const periodWeek = ref("1 week");
const premint = ref("");
const quorumType = ref("percent");
const timeLockRadio = ref(null);
const votesRadio = ref("");
const contarctLicense = ref("MIT");
const proposalThreshold = ref("");
const tokenDecimals = ref("18");
const tokenDecimalsType = ref([]);
const tokenClockMode = ref("12");
const tokenClockModeRadio = ref("");
const proposalPercent = ref("4");
const proposalAbsolute = ref("");
const contarctSecurityContact = ref("");
const upGradeability = ref("");

onMounted(() => {
    console.log(governor, "governor");
    solContentChange();
});

const solContentChange = () => {
    const contract = governor.print({
        name: contarctName.value,
        delay: delayDay.value,
        period: periodWeek.value,

        votes: votesRadio.value,

        clockMode: tokenClockModeRadio.value,

        timelock: timeLockRadio.value ? timeLockRadio.value : false,

        blockTime: tokenClockMode.value * 1,

        decimals: tokenDecimals.value * 1,

        proposalThreshold: proposalThreshold.value,

        quorumMode: quorumType.value,
        quorumAbsolute:
            quorumType.value == "absolute" ? proposalAbsolute.value : "",
        quorumPercent:
            quorumType.value == "percent" ? proposalPercent.value * 1 : 0,

        storage: tokenDecimalsType.value.includes("storage"),
        settings: tokenDecimalsType.value.includes("updatableSettings"),

        access: false,
        info: {
            license: contarctLicense.value,
            securityContact: contarctSecurityContact.value,
        },
    });
    solContent.value = contract;
};
// 文本相关的配置
const dispositionText = () => {
    const regexDay = /^\d+\s+[day]+$/;
    const regexWeek = /^\d+\s+[week]+$/;
    const regex = /^\d+$/;
    console.log(delayDay.value, "delayDay.value");

    if (!regexDay.test(delayDay.value)) {
        bus.emit("promptModalErr", "格式有误001");
        return;
    }
    if (!regexWeek.test(periodWeek.value)) {
        bus.emit("promptModalErr", "格式有误02");
        return;
    }
    if (!regex.test(tokenDecimals.value) || !regex.test(tokenClockMode.value)) {
        bus.emit("promptModalErr", "格式有误");
        return;
    }
    if (proposalAbsolute.value && !regex.test(proposalAbsolute.value)) {
        bus.emit("promptModalErr", "格式有误");
        return;
    }
    if (proposalPercent.value && !regex.test(proposalPercent.value)) {
        bus.emit("promptModalErr", "格式有误");
        return;
    }
    solContentChange();
};
</script>