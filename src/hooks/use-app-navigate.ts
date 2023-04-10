import { To, useNavigate } from 'react-router-native';
import { AppContext } from '../app-context';
import { Route, BuildRouteParams } from '../models/route';

export type AppNavigateState = {
    navigateTo: ({}: NavigateToParams) => void;
    navigateBack: () => void;
    isRoot: () => boolean;
};

export type NavigateToParams = {
    route: Route;
    params?: BuildRouteParams;
    overriddenTitle?: string;
};

const locationTitles: (string | undefined)[] = [];

export const useAppNavigate = (appContext: AppContext): AppNavigateState => {
    const navigate = useNavigate();

    const navigateTo = ({ route, params = {}, overriddenTitle = undefined }: NavigateToParams) => {
        const path = route.buildPath(params);
        let _toLocationTitle = overriddenTitle !== undefined ? overriddenTitle : route.title;
        if (!_toLocationTitle && locationTitles.length > 0) {
            _toLocationTitle = locationTitles[locationTitles.length - 1];
        }
        locationTitles.push(_toLocationTitle!);
        appContext.locationTitleChangeCallback(_toLocationTitle!);
        navigate(path);
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
