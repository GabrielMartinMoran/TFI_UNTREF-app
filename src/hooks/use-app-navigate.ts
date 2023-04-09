import { To, useNavigate } from 'react-router-native';
import { AppContext } from '../app-context';

export type AppNavigateState = {
    navigateTo: (to: To, toLocationTitle?: string) => void;
    navigateBack: () => void;
    isRoot: () => boolean;
};

const locationTitles: (string | undefined)[] = [];

export const useAppNavigate = (appContext: AppContext): AppNavigateState => {
    const navigate = useNavigate();

    const navigateTo = (to: To, toLocationTitle?: string) => {
        let _toLocationTitle = toLocationTitle;
        if (!_toLocationTitle && locationTitles.length > 0) {
            _toLocationTitle = locationTitles[locationTitles.length - 1];
        }
        locationTitles.push(_toLocationTitle);
        appContext.locationTitleChangeCallback(_toLocationTitle);
        navigate(to);
    };

    const navigateBack = () => {
        locationTitles.pop();
        let toLocationTitle = undefined;
        if (locationTitles.length > 0) {
            toLocationTitle = locationTitles[locationTitles.length - 1];
        }
        appContext.locationTitleChangeCallback(toLocationTitle);
        console.log(locationTitles);
        navigate(-1);
    };

    const isRoot = (): boolean => {
        return locationTitles.length == 0;
    };

    return {
        navigateTo,
        navigateBack,
        isRoot,
    };
};
