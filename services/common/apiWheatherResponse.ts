export interface ApiWheatherResponse {
    time: Date;
    temperature: number;
    wind: number;
}
export function isApiWheatherResponse(obj: any): obj is ApiWheatherResponse {
    return (
        obj &&
        obj.time instanceof Date &&
        typeof obj.temperature === 'number' &&
        typeof obj.wind === 'number'
    );
}
