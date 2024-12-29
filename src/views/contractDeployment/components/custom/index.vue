<style scoped lang="scss">
@import "../index.scss";
</style>
<template src="./index.html"></template>
<script lang="ts">
export default {
    name: "contractCustom",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { Buffer } from "buffer";
import { REMIX_URL } from "@/api/constant";
import { downloadAllFiles } from "@/utils/fileDown";
import { saveAs } from "file-saver";
import bus from "@/utils/bus.js";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();
const solContent = ref("");
import { custom } from "@openzeppelin/wizard";
let contarctName = ref("MyContract");
let features = ref("");
// access是否可以取消
const accessControlCheck = ref(false);
const accessOptionsBol = ref(false);
const accessControlRadio = ref(null);
const contarctLicense = ref("MIT");
const accessControl = ref("");
const contarctSecurityContact = ref("");
const featuresOptions = ref([
    {
        label: "Pausable",
        value: "pausable",
        tip: 'Privileged accounts will be able to pause the functionality marked as whenNotPaused. Useful for emergency response.<a target="_blank" href="https://docs.openzeppelin.com/contracts/5.x/api/utils#Pausable">Read more.</a>',
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

onMounted(() => {
    solContentChange();
});

const solContentChange = () => {
    const contract = custom.print({
        name: contarctName.value,
        access: accessControlRadio.value ? accessControlRadio.value : false,
        info: {
            license: contarctLicense.value,
            securityContact: contarctSecurityContact.value,
        },
        pausable: features.value.includes("pausable"),
    });
    solContent.value = contract;
    bus.emit("loadingIndex", "custom");
};
// 文本相关的配置
const dispositionText = () => {
    // 如果选中了mintablehuost或pausable 则需要选中accessOptions里面的选项
    if (features.value.includes("pausable")) {
        accessOptionsBol.value = true;
        if (!accessControlRadio.value) {
            accessControlRadio.value = "ownable";
        }
    } else {
        accessOptionsBol.value = false;
    }
    solContentChange();
};

// 文本相关的配置
const dispositionAccess = () => {
    accessControlCheck.value = true;
    solContentChange();
};

// 复制
bus.on("customcopy", async (type) => {
    try {
        //复制
        await toClipboard(solContent.value);
        bus.emit("promptModalSuccess", "ERC20复制成功");
    } catch (e) {
        //复制失败
        bus.emit("promptModalErr", "ERC20复制失败");
    }
});
// 下载文件
bus.on("customdown", async (type) => {
    const blob = new Blob([solContent.value], { type: "text/plain" });
    saveAs(blob, contarctName.value + ".sol");
});
// 下载文件夹
bus.on("customzip", async (type) => {
    downloadAllFiles(contarctName.value, solContent.value, type);
});
// 打开remix
bus.on("customRemix", async (type) => {
    let base64 = Buffer.from(solContent.value, "utf-8").toString("base64");
    window.open(REMIX_URL + "/?#code=" + base64 + "&theme=Dark");
});
</script>