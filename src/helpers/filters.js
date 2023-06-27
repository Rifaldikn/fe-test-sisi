import moment from "moment";

export const toFilterDate = (value, toFormat, fromFormat) => {
  return moment(value, fromFormat).format(toFormat);
};
