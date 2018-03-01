import { helper } from '@ember/component/helper';
export function sessionObjectFormatter(sessionObject) {
  return JSON.stringify(sessionObject);
}

export default helper(sessionObjectFormatter);