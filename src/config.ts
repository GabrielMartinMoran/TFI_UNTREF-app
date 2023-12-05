export const CONFIG = {
    API_URI: 'http://192.168.0.9:5000/api',
    DEVICE_API_URI: 'http://192.168.0.9:5001/api',
    TIME_RANGES: {
        '5_MINUTES': {
            minutes: 5,
            display: '5 m',
        },
        '30_MINUTES': {
            minutes: 30,
            display: '30 m',
        },
        '1_HOUR': {
            minutes: 60,
            display: '1 h',
        },
        '1_DAY': {
            minutes: 60 * 24,
            display: '1 d',
        },
        '15_DAYS': {
            minutes: 60 * 24 * 15,
            display: '15 d',
        },
        '30_DAYS': {
            minutes: 60 * 24 * 30,
            display: '30 d',
        },
    },
    STYLES: {
        DRAWER_WIDTH: '220px',
    },
    SNACKBAR_VISIBLE_TIME: 2000,
    DEFAULT_LOCATION_NAME: 'Resúmen general',
};
