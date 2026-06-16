export type AuthMode = "login" | "register";

export interface AuthFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  agreeToTerms: boolean;
}

export interface AuthScreenProps {
  mode: AuthMode;
}

export interface SocialButton {
  label: string;
  iconSrc: string;
  iconAlt: string;
}
