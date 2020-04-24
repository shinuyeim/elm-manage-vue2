export function formValidatePhone(rule, value, callback) {
  if (!value) {
    return callback(new Error("手机号不能为空"));
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的手机号"));
    }
  }
}

export function formValidatePassword(rule, value, callback) {
  if (!value) {
    return callback(new Error("不能为空"));
  } else {
    const reg = /^(\w){6,16}$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("只能由6-16位字母、数字、下划线组成"));
    }
  }
}

export function formValidateUsername(rule, value, callback) {
  if (!value) {
    return callback(new Error("不能为空"));
  } else {
    const reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("只能输入5-20个以字母开头，可带数字、下划线的字符"));
    }
  }
}

