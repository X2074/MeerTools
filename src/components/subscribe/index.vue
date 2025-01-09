<style lang="scss" scoped>
.subscribe {
    width: 378px;
    height: 48px;
    line-height: 48px;

    border: 1px solid rgba(60, 60, 60, 1);
    font-size: 16px;
    border-radius: 8px;
    padding: 0 16px;
    background: rgba(255, 255, 255, 0.05);

    > input {
        width: 0;
        flex: 1;
        height: 100%;
        background: transparent;
        border: 0;
    }

    > span {
        font-size: 16px;
        font-weight: 700;
        color: rgba(172, 255, 67, 1);
    }
}
.modal-content {
    .img-close {
        width: 20px;
        position: absolute;
        top: 10px;
        right: 24px;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
    .status-modal {
        p {
            text-align: center;
        }
    }
}
</style>
<template>
    <div class="subscribe flex-center flex-between">
        <input
            type="text"
            v-model="subData"
            placeholder="Enter email address"
        />
        <span @click="subscribeEmail">Subscribe</span>
    </div>

    <dialogModal v-model="subShow" @close="subShow = false" title="Tips">
        <p class="mt-25 pl-25 pr-25" v-html="emailMsg"></p>
    </dialogModal>

    <!--   <div class="modal-content" v-if="subShow" @click.self="subShow = false">
    <div class="status-modal">
      <img
        class="img-close"
        src="/images/icons/close.svg"
        @click="subShow = false"
      />
      <img
        v-if="!success"
        src="/images/icons/warn.svg"
        alt=""
        class="mx-auto"
      />
      <img v-else src="/images/icons/successfully.svg" alt="" class="mx-auto" />
      <p class="mt-40" v-html="emailMsg"></p>
    </div>
  </div> -->
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import router from "@/router";
import * as api from "@/api/sys.js";
// import i18n from "@/i18n";
/* import { useI18n } from "vue-i18n";
const { locale } = useI18n();  */
const language = ref("en");
// watch(locale, (newV) => {
//   language.value = newV;
// });
const subData = ref("");
const subShow = ref(false);
const rules = {
    email: [
        //邮箱
        {
            required: true,
            pattern: new RegExp(
                "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$"
            ),
            message: "Incorrect email format",
        },
    ],
};
const emailRegex =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const emailMsg = ref("");
const success = ref(false);
const subscribeEmail = async () => {
    if (!emailRegex.test(subData.value)) {
        subShow.value = true; //显示格式错误
        emailMsg.value = "Incorrect email format";
        return;
    }
    let param = {
        email: subData.value,
    };
    let res = api
        .subscribeEmail(param)
        .then((res) => {
            console.log(res);
            subShow.value = true;
            let m = {
                zh: "新增邮件订阅成功",
                en: "Adding an Email Subscription.",
            };
            if (!res) {
                emailMsg.value = m[language.value];
                success.value = true;
            } else {
                emailMsg.value = res;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>