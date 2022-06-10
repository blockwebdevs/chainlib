require('./bootstrap');
require('alpinejs');

import Vue from 'vue';
import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

// Initializing contract
async function initContract() {
    const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');

    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

    const near = await nearAPI.connect({keyStore, ...nearConfig});

    const walletConnection = new nearAPI.WalletConnection(near);

    let currentUser;
    if (walletConnection.getAccountId()) {
        currentUser = {
            accountId: walletConnection.getAccountId(),
            balance: (await walletConnection.account().state()).amount,
        };
    }

    const contract = await new nearAPI.Contract(
        walletConnection.account(),
        nearConfig.contractName,
        {
            viewMethods: ['getMessages'],
            changeMethods: ['addMessage'],
            sender: walletConnection.getAccountId(),
        }
    );

    return {contract, currentUser, nearConfig, walletConnection};
}

Vue.prototype.$lang = document.documentElement.getAttribute('lang');

Vue.component('near-log-in', require('./components/near/NearLogIn').default);
Vue.component('search', require('./components/Search').default);

window.nearInitPromise = initContract().then(
    ({contract, currentUser, nearConfig, walletConnection}) => {
        Vue.prototype.$contract = contract;
        Vue.prototype.$currentUser = currentUser;
        Vue.prototype.$nearConfig = nearConfig;
        Vue.prototype.$walletConnection = walletConnection;

        const app = new Vue({
            el: '#cover-mob'
        });
    }
);


