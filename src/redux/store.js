import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import reducer from './reducer';

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['isAuthenticated', 'profile', 'user']
    },
    reducer
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// store.subscribe(() => {
//     console.log('************************State*****************************\n', store.getState().isAuthenticated);
// });
