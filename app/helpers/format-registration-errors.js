import { helper } from '@ember/component/helper';
export function formatRegistrationErrors(error) {
  let errMsg = (error[0].detail.detail || error[0].detail);
  if (errMsg.includes("_")) {
    return errMsg.replace("_", " ").toLocaleLowerCase();
  } else {
    return errMsg.toLocaleLowerCase()
  }
}

export default helper(formatRegistrationErrors);