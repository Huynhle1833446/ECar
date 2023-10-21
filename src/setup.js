import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './app/store';


const Root = ({ }) => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <RootSiblingParent>
                    <App />
                </RootSiblingParent>
            </PaperProvider>
        </Provider>
    )
}
module.exports = Root;