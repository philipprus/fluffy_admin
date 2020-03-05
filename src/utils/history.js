import { createBrowserHistory } from "history";
const history = createBrowserHistory();
export default history;

export function goTo(route, state = {}) {
    history.replace(`/${route}`, state);
}

export function href(newLocation) {
    window.location.href = newLocation;
}