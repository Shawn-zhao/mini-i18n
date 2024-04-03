import { LangDataType, StringToObjectType } from 'types';
declare class AnalyticalData {
    newData: LangDataType;
    constructor();
    analyticalData(data: any, mark: string): object;
    stringToObject({ key, value, mark }: StringToObjectType): object;
}
export declare const dealData: AnalyticalData;
export declare const getValue: (locales: object, arr: string[]) => string;
export {};
