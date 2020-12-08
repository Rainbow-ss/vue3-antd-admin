<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        name="custom-validation"
        ref="ruleForm"
        v-bind="layout"
        :model="account_form"
        :rules="rules_form"
        @finish="handleFinish"
      >
        <a-form-item name="username">
          <label>用户名</label>
          <a-input
            v-model:value="account_form.username"
            type="text"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item name="password">
          <label>密码</label>
          <a-input
            v-model:value="account_form.password"
            type="text"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item name="passwords">
          <label>确认密码</label>
          <a-input
            v-model:value="account_form.passwords"
            type="text"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item name="code">
          <label>验证码</label>
          <a-row :gutter="15">
            <a-col :span="14">
              <a-input
                :maxlength="6"
                v-model:value="account_form.code"
                type="text"
                autocomplete="off"
              />
            </a-col>
            <a-col :span="10">
              <a-button
                type="primary"
                block
                :loading="button_loading"
                :disabled="button_disabled"
                @click="getCode"
                >{{ button_text }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item></a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button type="primary" html-type="submit" block>重置密码</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/login" class="color-white">登录</router-link> |
        <router-link to="/register" class="color-white">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
//antdesign
import { message } from "ant-design-vue";
//导入验证类的方法
import {
  checkPhone,
  checkPassword as password,
  checkPasswords as passwords,
  checkCode as code
} from "@/utils/verification";
import { onMounted, reactive, toRefs } from "vue";
//导入局部组件
//import Captcha from "@/components/Captcha";
export default {
  name: "Register",
  //components: { Captcha },
  setup() {
    /** 校验用户名 */
    const checkUsername = async (rule, value) => {
      if (!value) {
        return Promise.reject("请输入用户名");
      } else if (!checkPhone(value)) {
        return Promise.reject("请输入11位数字的手机号");
      } else {
        return Promise.resolve();
      }
    };
    /** 校验密码 */
    const checkPassword = async (rule, value) => {
      const passwords = formConfig.account_form.passwords;
      if (!value) {
        return Promise.reject("请输入密码");
      } else if (!password(value)) {
        return Promise.reject("请输入6-20位数字+字母的密码");
      } else if (passwords && value && passwords !== value) {
        return Promise.reject("两次密码不一致");
      } else {
        return Promise.resolve();
      }
    };
    /** 校验确认密码 */
    const checkPasswords = async (rule, value) => {
      const passwordss = formConfig.account_form.passwords;
      if (!value) {
        return Promise.reject("请再次输入密码");
      } else if (!passwords(value)) {
        return Promise.reject("请输入6-20位数字+字母的密码");
      } else if (passwordss && value && passwordss !== value) {
        return Promise.reject("两次密码不一致");
      } else {
        return Promise.resolve();
      }
    };
    /** 校验验证码 */
    const checkCode = async (rule, value) => {
      if (!value) {
        return Promise.reject("请输入验证码");
      } else if (!code(value)) {
        return Promise.reject("请输入6位的数字+字母");
      } else {
        return Promise.resolve();
      }
    };
    const formConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 }
      },
      account_form: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules_form: {
        username: [
          {
            validator: checkUsername,
            trigger: "change"
          }
        ],
        password: [
          {
            validator: checkPassword,
            trigger: "change"
          }
        ],
        passwords: [
          {
            validator: checkPasswords,
            trigger: "change"
          }
        ],
        code: [
          {
            validator: checkCode,
            trigger: "change"
          }
        ]
      }
    });
    const dataItem = reactive({
      // 获取验证码按钮
      button_text: "获取验证码",
      button_loading: false,
      button_disabled: false,
      sec: 5,
      // 定时器
      timer: null
    });
    const form = toRefs(formConfig);
    const data = toRefs(dataItem);
    //提交表单
    const handleFinish = value => {
      console.log(value);
    };
    // 获取验证码
    const getCode = () => {
      // 用户名不存在的情况下
      if (!formConfig.account_form.username) {
        message.error({
          content: "用户名不能为空",
          onClose: () => {}
        });
        return false;
      }
      // 优先判断定时器是否存在，存在则先清除，清除后再开启
      //dataItem.timer && clearInterval(dataItem.timer);
      if (dataItem.timer) {
        clearInterval(dataItem.timer);
      }
      // 开启定时器
      dataItem.timer = setInterval(() => {
        const s = dataItem.sec--;
        dataItem.button_text = "${s}秒";
        if (s <= 0) {
          clearInterval(dataItem.timer);
          dataItem.button_text = "重新获取";
        }
      }, 1000);
    };
    onMounted(() => {});
    return {
      ...form,
      ...data,
      handleFinish,
      getCode
    };
  }
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>
