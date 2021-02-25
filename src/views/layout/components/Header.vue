<template>
  <div id="header">
    <div class="collapsed-button" @click="collapsedButton">
      <svg-icon iconName="collapsed" className="collapsed-svg"></svg-icon>
    </div>
    <div class="header-menu">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <img src="../../../assets/images/user-img.png" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <div class="menu-item">
                <svg-icon
                  iconName="user"
                  className="header-menu-svg"
                ></svg-icon>
                13269777822
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1">
              <div class="menu-item">
                <svg-icon
                  iconName="lang"
                  className="header-menu-svg"
                ></svg-icon>
                <span>中文</span>
                <span>英文</span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <div class="menu-item">
                <svg-icon
                  iconName="exit"
                  className="header-menu-svg"
                ></svg-icon>
                退出
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from "vue";
export default {
  name: "Header",
  setup() {
    const { emit } = getCurrentInstance();
    const collapsedButton = () => {
      emit("collapsed");
    };
    return {
      collapsedButton
    };
  }
};
</script>
<style lang="scss">
#header {
  padding: 0 20px;
  position: relative;
}
.header-menu {
  position: absolute;
  right: 20px;
  top: 10px;
}
.header-menu .ant-dropdown-link {
  display: inline-block;
}
.ant-dropdown .ant-dropdown-content .ant-dropdown-menu-item .menu-item {
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
}
.ant-dropdown .ant-dropdown-content .ant-dropdown-menu-item .menu-item span {
  margin-right: 5px;
}
.collapsed-button {
  cursor: pointer;
  font-size: 20px;
}
</style>
