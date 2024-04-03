import { LangDataType, ConfigType, UpdateLocaleType, SetLocalesType } from '@types';
declare class I18n {
    allLangData: LangDataType;
    lang: string;
    defualtLang: string;
    langTag: string;
    defualtLangTag: string;
    themeColor: string;
    homePath: string;
    isVerifiyApi: boolean;
    isHint: boolean;
    constructor();
    init(config: ConfigType): void;
    getLocales(): any;
    getEnv(): "wechat" | "alipay" | "bytedance" | "baidu" | "qq" | "jd" | "browser" | undefined;
    getLanguagePackList(): string[];
    setLocales({ lang, isReload, path, query }: SetLocalesType): void;
    updateLocale({ locales, isReload, isAnalyticalData, mark, path, query, }: UpdateLocaleType): void;
    _formatLanguageTag(s: string): string;
}
export declare const i18n: I18n;
export declare const order: (staticS: string, dynamicS: string | number, s?: string) => string;
export declare const t: (id: string, dynamicS?: string | number, s?: string) => string;
export {};
