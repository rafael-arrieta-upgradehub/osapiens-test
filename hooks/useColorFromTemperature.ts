
export const getColorForTemperature = (temperature: number, opacity: number = 1): string => {
    const minTemp = 0;
    const maxTemp = 35;
    const clampedTemp = Math.max(minTemp, Math.min(maxTemp, temperature));
    const ratio = (clampedTemp - minTemp) / (maxTemp - minTemp);
    const red = Math.round(255 * ratio);
    const blue = Math.round(255 * (1 - ratio));
    return `rgba(${red}, 0, ${blue}, ${opacity})`;
};
