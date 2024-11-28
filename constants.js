export const DB_NAME = "amzon";

export const TOKEN_ACCESS_KEY = "prajapatijainam";
export const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
  SELLER:"SELLER"
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const PaymentProvidersEnum = {
  PAYPAL: "PAYPAL",
  ROZAR_PAY: "ROZAR_PAY",
};
export const AvailablePaymentProviders=Object.values(PaymentProvidersEnum);