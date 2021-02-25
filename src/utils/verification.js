/**
 * 手机号验证
 * @param {*} value
 */
export function checkPhone(value) {
  let regPhone = /^1[3456789]\d{9}$/;
  return regPhone.test(value);
}
/**
 * 密码验证：6-20数字+英文
 * @param {*} value
 */
export function checkPassword(value) {
  let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return regPassword.test(value);
}
/**
 * 确认密码验证
 * @param {*} value
 */
export function checkPasswords(value) {
  let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return regPassword.test(value);
}
/**
 * 验证码验证
 * @param {*} value
 */
export function checkCode(value) {
  let regCode = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6}$/;
  return regCode.test(value);
}
