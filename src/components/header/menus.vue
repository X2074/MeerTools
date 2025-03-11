<style scoped lang="scss">
.logo {
  width: 110px;
  height: 44px;
}

.menu-child {
  margin-top: 20px;
  padding: 16px;
  font-size: 16px;
  border: 1px solid #fff;
  border-radius: 8px;
  gap: 10px;
  color: #fff;
  font-weight: 400;
  // background: rgba(0, 0, 0, 0.1);
  // backdrop-filter: blur(4px);

  .m-link {
    color: #fff;
  }
}

.showBg {
  background: transparent;
  color: #fff;
  backdrop-filter: blur(50px);
}

.el-collapse {
  width: 100%;
  padding-left: 20px;
  border: 0;
  margin: 0 auto;

  .child-link {
    display: block;
    padding: 5px 0;

    a {
      color: #fff;
    }
  }
  .el-collapse-item {
    padding: 5px 0;

    :deep().el-collapse-item__header {
      background-color: transparent;
      color: #fff;
      font-size: 20px;
      border-bottom: none;

      .el-collapse-item__arrow {
        display: block;
        width: 12px;
        height: 12px;
        // color: #fff;
        background: url(/images/icons/arrow.svg) no-repeat;
        // background-size: contain;
        svg {
          display: none;
        }
        &.is-active {
          transform: rotateZ(180deg);
        }
      }
    }

    :deep(.el-collapse-item__wrap) {
      background-color: transparent;
      color: #fff;
      font-size: 18px;
      border-bottom: none;

      .el-collapse-item__content {
        color: inherit;
        padding-bottom: 0;

        .child-link {
          display: block;

          a {
            line-height: 42px;
            font-size: 18px;
            font-weight: 400;
            color: #fff;
            // &.active{
            //   color: #f00;
            // }
          }
        }

        :deep(.child-link) {
          display: block;
          line-height: 42px;
          font-size: 18px;
          font-weight: 400;

          a {
            color: #fff;
          }
        }
      }
    }
  }
}

.menu-item {
  width: 100%;
  flex: auto;
  border-right: 0;
  padding-bottom: 30px;
  padding: 0 26px;

  .scale-child {
    transform: scale(1, 1) !important;
  }

  a {
    color: #fff;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      color: #24ff24;
      border-bottom: 1px solid #24ff24;
    }
  }
}

.scale1 {
  transform: scale(1, 0) !important;
}
</style>
<template>
  <el-collapse v-model="activeName" accordion>
    <template v-for="(item, i) in menu" :key="i">
      <el-collapse-item :title="item.name" v-if="item.child">
        <menus :menu="item.child" class="slot-mm">
          <span class="child-link" v-for="(child, j) in item.child" :key="j">
            <a
              :href="child.path"
              @click="currentName = child.name"
              :class="currentName == child.name ? 'active' : ''"
              :target="item.target"
              >{{ child.name }}</a
            >
            <img src="/images/icons/arrow.svg" alt="" />
          </span>
        </menus>
      </el-collapse-item>
      <template v-else>
        <span class="child-link">
          <a
            :href="item.path"
            @click="currentName = item.name"
            :class="currentName == item.name ? 'active' : ''"
            :target="item.target"
            >{{ item.name }}</a
          >
        </span>
      </template>
    </template>
  </el-collapse>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { ElCollapse, ElCollapseItem } from "element-plus";
import { useRoute } from "vue-router";
import "element-plus/theme-chalk/index.css";
const props = defineProps(["menu"]);
const activeName = ref([""]);
const currentName = ref("");
const clickMenu = (name) => {
  //   showMenu.value = false;
  activeName.value = name;
  currentName.value = name;
  //   showBg.value = true; //这里控制 如果点击头部菜单就默认显示磨砂样式
};
</script>