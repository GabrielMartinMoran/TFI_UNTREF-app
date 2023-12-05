import { PixelRatio } from 'react-native';
import { isMobile } from './platform-checker';

const REM_TO_PIXEL_FACTOR = 7;
const REMS_UNIT = 'rem';
const PIXELS_UNIT = 'px';

const INVALID_MOBILE_KEYS = ['cursor'];

export const remToPixels = (rem: number): number => {
    return rem * REM_TO_PIXEL_FACTOR;
};

export const pixelsToDp = (pixels: number): number => {
    return PixelRatio.get() * pixels;
};

const normalizeValue = (value: any): any => {
    if (typeof value === 'string') {
        if (value.endsWith(PIXELS_UNIT)) {
            const pixels = parseInt(value.substring(0, value.length - PIXELS_UNIT.length));
            return pixelsToDp(pixels);
        }
        if (value.endsWith(REMS_UNIT)) {
            const rems = parseFloat(value.substring(0, value.length - REMS_UNIT.length));
            const pixels = remToPixels(rems);
            return pixelsToDp(pixels);
        }
        if (!isNaN(parseFloat(value))) {
            if (value.includes('.')) {
                return parseFloat(value);
            }
            return parseInt(value);
        }
    }
    return value;
};

const buildStyle = (props: any): any => {
    let adjustedProps: any = {};
    for (const key of Object.keys(props)) {
        let value = props[key];
        let keyOverriden = false;
        if (isMobile()) {
            if (Boolean(INVALID_MOBILE_KEYS.find((x) => x === key))) continue;
            /*if (Boolean(['marginTop', 'marginBottom', 'marginLeft', 'marginRight'].find((x) => x === key))) {
                keyOverriden = true;
                if (!('margin' in adjustedProps)) adjustedProps['margin'] = normalizeValue(value);
            } else if (Boolean(['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'].find((x) => x === key))) {
                keyOverriden = true;
                if (!('padding' in adjustedProps)) adjustedProps['padding'] = normalizeValue(value);
            } else {
                value = normalizeValue(value);
            }*/
            value = normalizeValue(value);
        }
        if (!keyOverriden) adjustedProps[key] = value;
    }
    return adjustedProps;
};

export const parseStyle = (web: any, mobileOverride: any = {}): any => {
    const builtStyle = buildStyle(web);
    if (isMobile()) {
        return { ...builtStyle, ...buildStyle(mobileOverride) };
    }
    return builtStyle;
};
