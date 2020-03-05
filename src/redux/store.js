import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers/reducers";
import logger from "redux-logger";


const initStore = () => {
    const middleware = process.env.NODE_ENV === 'production' ? applyMiddleware() : applyMiddleware(logger);
    const store = createStore(
        reducers,
        middleware
    );

    return store;
};

export default initStore;