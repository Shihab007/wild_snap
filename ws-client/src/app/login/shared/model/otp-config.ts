export class OtpConfig {
    inputStyles?: {[key: string]: any};
    containerStyles?: {[key: string]: any};
    allowKeyCodes?: string[];
    length: number;
    allowNumbersOnly?: boolean;
    inputClass?: string;
    containerClass?: string;
    isPasswordInput?: boolean;
    disableAutoFocus?: boolean;
    placeholder?: string;
    letterCase?: 'Upper'| 'Lower';
}