import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigateRef) {
    _navigator = navigateRef;
}


function navigate(route, params) {
    console.log(`Navigating from navigation service to ${route}`);
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName: route,
            params: params,
        })
    )
};

export default {
    navigate,
    setTopLevelNavigator
}