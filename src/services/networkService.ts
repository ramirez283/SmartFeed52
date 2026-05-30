import NetInfo from '@react-native-community/netinfo';

export const NetworkService = {

    isConnected: async (): Promise<boolean> => {
        const state = await NetInfo.fetch();
        return state.isConnected ?? false;
    },

    onConnectivityChange: (callback: (isConnected: boolean) => void) => {
        const unsubscribe = NetInfo.addEventListener(state => {
            callback(state.isConnected ?? false);
        });

        return unsubscribe;
    }
};