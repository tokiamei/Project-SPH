import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from 'vee-validate/dist/locale/zh_CN' 

Vue.use(VeeValidate);

// 提示信息，第一个参数表示使用中文
VeeValidate.Validator.localize("zh_CN", {
	messages: {
		...zh_CN.messages,
		is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
	},
	attributes: {
		// 给校验的 field 属性名映射中文名称
		phone: "手机号",
		code: "验证码",
		password: "密码",
		password1: "确认密码",
		agree: "协议",
	},
});

// 自定义校验规则
// 复选框勾选
VeeValidate.Validator.extend('tongyi', {
  validate: value => {
  return value
},
getMessage: field => field + '必须同意'
})
