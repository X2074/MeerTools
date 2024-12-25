<template>
    <div class="modal-content" v-if="props.modelValue" @click.self="closeClick">
        <div class="status-modal">
            <div class="modal-header flex">
                <p>{{ props.title || "Prompt" }}</p>
                <img
                    class="close-icon"
                    @click.self="closeClick"
                    src="/images/create/closeM.png"
                    alt=""
                />
            </div>
            <!-- 默认插槽 -->
            <slot></slot>
            <!-- 底部是确认、取消按钮 -->
            <div v-if="footer == 'whether'" class="footer-btn flex mt-35">
                <p @click="closeClick" class="close">
                    {{ props.closeText || "Close" }}
                </p>
                <p @click="confirmClick" class="confirm">
                    {{ props.confirmText || "Confirm" }}
                </p>
            </div>
            <!-- 底部只有一个按钮 -->
            <div v-if="footer == 'default'" class="footer-btn flex mt-35">
                <p @click="confirmClick" class="confirm">
                    {{ props.confirmText || "Confirm" }}
                </p>
            </div>
            <!-- 自定义底部 -->
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import bus from "@/utils/bus.js";
/*
*modelValue:关闭，开启
*footer:底部按钮类型，没有不显示
    whether:确认、取消
    default：确认
*closeText:取消按钮文案，没有显示默认
*confirmText:确认、默认按钮文案，没有显示默认
*/
const props = defineProps([
    "modelValue",
    "footer",
    "closeText",
    "confirmText",
    "title",
]);
// 显式定义子组件调用父组件事件
const emit = defineEmits<{
    (e: "close", data: any): void;
}>();
// 调用父组件的关闭、取消方法
const closeClick = () => {
    emit("close", false);
};
// 调用父组件的确认、默认方法
const confirmClick = () => {
    emit("confirm", false);
};
</script>
    