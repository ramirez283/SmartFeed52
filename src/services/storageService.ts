import { MMKV } from "react-native-mmkv";
import { Post } from "../api/feedApi";

const storage = new MMKV();
const POST_KEY = "cached_posts";

export const StorageService = {
    savePosts: (posts: Post[]) => {
        storage.set(POST_KEY, JSON.stringify(posts));
    },

    getPosts: (): Post[] => {
        const postsString = storage.getString(POST_KEY);
        return postsString ? JSON.parse(postsString) : [];
    },

    clearPosts: () => {
        storage.delete(POST_KEY);
    }
};