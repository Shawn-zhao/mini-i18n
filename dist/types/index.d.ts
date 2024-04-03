interface ConfigType {
    locales: LangDataType;
    defualtLang?: string;
    lang?: string;
    themeColor?: string;
    isVerifiyApi?: boolean;
    isHint?: boolean;
    homePath: string;
}
interface LangDataType {
    [propName: string]: {
        [propName: string]: {
            [propName: string]: string;
        };
    };
}
interface RegionType {
    [propName: string]: string;
}
interface UpdateLocaleType {
    locales: LangDataType;
    isReload?: boolean;
    isAnalyticalData?: boolean;
    mark?: string;
    path?: string;
    query?: {
        [propName: string]: string;
    };
}
interface StringToObjectType {
    key: string;
    value: string;
    mark: string;
}
interface SetLocalesType {
    lang: string;
    isReload: boolean;
    path?: string;
    query?: {
        [propName: string]: string;
    };
}
interface ReloadOptionsType {
    path: string;
    query: {
        [propName: string]: string;
    };
}
export { ConfigType, LangDataType, RegionType, StringToObjectType, UpdateLocaleType, SetLocalesType, ReloadOptionsType };
