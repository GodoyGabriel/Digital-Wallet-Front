import { alertTypes } from '../types/Types';

export const alertType = (type: alertTypes) => {
  const objectType = {
    danger: "alert-danger",
    success: "alert-success",
    warning: "alert-warning",
    primary: "alert-primary",
  }
  return type !== "" ? objectType[type] : "";
};
