import { NetworkService } from './networkService';
import { useFeedStore } from '../store/feedStore';


const syncPendingLikes = async (attempt = 1): Promise<void> => {
    const { pendingLikes, clearPendingLikes } = useFeedStore.getState();

    if (pendingLikes.length === 0) return;

    console.log('Sincronizando likes pendientes:', pendingLikes);

    try {
        console.log('Sinconizando likes pendientes en el servidor...' + pendingLikes.length);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        clearPendingLikes();
        console.log('Likes pendientes sincronizados y almacenados localmente');
    } catch (error) {
        if (attempt >= 4) return console.error('Error al sincronizar likes pendientes después de varios intentos:', error);
        const delay = 1000 * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        await syncPendingLikes(attempt + 1);
    }
};

export const startSyncService = () => {
    const unsubscribe = NetworkService.onConnectivityChange(async (isConnected) => {
        if (isConnected) {
            console.log('Conexión restaurada. Iniciando sincronización de datos...');
            await syncPendingLikes();
        } else if (isConnected === false) {
            console.log('Conexión perdida. Sincronización de datos pausada.');
        }
    });

    return unsubscribe;
};