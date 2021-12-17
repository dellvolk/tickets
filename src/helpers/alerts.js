import toastr from "toastr";

toastr.options = {
  "debug": false,
  "positionClass": "toast-top-right mt-10",
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 5000,
  "extendedTimeOut": 1000
};

export const showErrorMessage = (text) => {
  if (typeof text !== "string") text = text.response.data
  if (!text) text = "Щось пішло не так. Спробуйте пізніше!"
  toastr.error(text);
};

export const showSuccessMessage = text => {
  toastr.success(text);
};

export const showInfoMessage = text => {
  if (typeof text !== "string") text = text.response.data
  if (!text) text = "Щось пішло не так. Спробуйте пізніше!"
  toastr.info(text);
};
