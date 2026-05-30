import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'feed-store' });

const mmkvStorage = createJSONStorage(() => ({
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.delete(name),
}));

export interface PendingLikeAction {
  postId: string;
  action: 'like' | 'unlike';
  timestamp: number;
}

interface FeedStore {
  likedPosts: Record<string, boolean>;
  pendingLikes: PendingLikeAction[];
  toggleLike: (postId: string, isOnline: boolean) => void;
  applyPendingLike: (action: PendingLikeAction) => void;
  clearPendingLikes: () => void;
}

export const useFeedStore = create<FeedStore>()(
  persist(
    (set, get) => ({
      likedPosts: {},
      pendingLikes: [],

      toggleLike: (postId, isOnline) => {
        const current = get().likedPosts[postId] ?? false;
        const action: 'like' | 'unlike' = current ? 'unlike' : 'like';

        set((state) => ({
          likedPosts: { ...state.likedPosts, [postId]: !current },
          // Si no hay red, encolar para sincronizar despues
          pendingLikes: isOnline
            ? state.pendingLikes
            : [...state.pendingLikes, { postId, action, timestamp: Date.now() }],
        }));
      },

      applyPendingLike: ({ postId, action }) => {
        set((state) => ({
          likedPosts: {
            ...state.likedPosts,
            [postId]: action === 'like',
          },
        }));
      },

      clearPendingLikes: () => set({ pendingLikes: [] }),
    }),
    {
      name: 'feed-store',
      storage: mmkvStorage,
    }
  )
);
