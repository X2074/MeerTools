<style scoped lang="scss">
@import "../index.scss";
.title1 {
    display: block !important;
}
.seconds-radio {
    justify-content: center;
    .seconds {
        width: 100px !important;
        height: 30px !important;
    }
}
</style>
<template src="./index.html"></template>
<script lang="ts">
export default {
    name: "contractGovernor",
};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Buffer } from "buffer";
import { REMIX_URL } from "@/config/constants/constant";
import bus from "@/utils/bus.js";
import { saveAs } from "file-saver";
import useClipboard from "vue-clipboard3";
import { governor } from "@openzeppelin/wizard";
const { toClipboard } = useClipboard();
const solContent = ref("");
const contarctName = ref("MyGovernor");
const delayDay = ref("1 day");
const periodWeek = ref("1 week");
const quorumType: any = ref("percent");
const timeLockRadio: any = ref("openzeppelin");
const votesRadio: any = ref("erc20votes");
const contarctLicense = ref("MIT");
const proposalThreshold = ref("1");
const tokenDecimals: any = ref("18");
const tokenDecimalsType = ref(["updatableSettings"]);
const tokenClockMode: any = ref("12");
const tokenClockModeRadio: any = ref("blocknumber");
const proposalPercent: any = ref("4");
const proposalAbsolute = ref("");
const contarctSecurityContact = ref("");
// timelock联动
let timelockCheck = ref(true);

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
    bus.emit("loadingIndex", "governor");
};
// 文本相关的配置
const dispositionText = () => {
    const regexDay = /^\d+\s+[day]+$/;
    const regexWeek = /^\d+\s+[week]+$/;
    const regex = /^\d+$/;
    console.log(delayDay.value, "delayDay.value");

    if (!regexDay.test(delayDay.value)) {
        bus.emit("promptModalErr", "Format Error !001");
        return;
    }
    if (!regexWeek.test(periodWeek.value)) {
        bus.emit("promptModalErr", "Format Error !02");
        return;
    }
    if (!regex.test(tokenDecimals.value) || !regex.test(tokenClockMode.value)) {
        bus.emit("promptModalErr", "Format Error !03");
        return;
    }
    if (proposalAbsolute.value && !regex.test(proposalAbsolute.value)) {
        bus.emit("promptModalErr", "Format Error !04");
        return;
    }
    if (proposalPercent.value && !regex.test(proposalPercent.value)) {
        bus.emit("promptModalErr", "Format Error !05");
        return;
    }
    solContentChange();
};

const dispositionRadio = () => {
    timelockCheck.value = true;
    solContentChange();
};

// 复制
bus.on("governorcopy", async (type) => {
    try {
        //复制
        await toClipboard(solContent.value);
        bus.emit("promptModalSuccess", "Governor Copy Successful !");
    } catch (e) {
        // Copy Failed
        bus.emit("promptModalErr", "Governor Copy Failed !");
    }
});
// 下载文件
bus.on("governordown", async (type) => {
    const blob = new Blob([solContent.value], { type: "text/plain" });
    saveAs(blob, contarctName.value + ".sol");
});
// 打开remix
bus.on("governorRemix", async (type) => {
    let base64 = Buffer.from(solContent.value, "utf-8").toString("base64");
    window.open(REMIX_URL + "/?#code=" + base64 + "&theme=Dark");
});
</script>