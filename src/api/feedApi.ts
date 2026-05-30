
const latencyAPI = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (Math.random() < 0.1) {
        throw new Error('Simulated API error');
    }
};

export interface Post {
    id: number;
    title: string;
    imageUrl: string;
    likes: number;
    createdAt: string;
}

export interface feedPagination {
    page: number;
    posts: Post[];
    hasNextPage: boolean;
}

const POSTS_PER_PAGE = 10;

export const fetchFeed = async (page: number): Promise<feedPagination> => {
    await latencyAPI();

    const posts: Post[] = Array.from({ length: POSTS_PER_PAGE }, (_, index) => {
        const id = (page - 1) * POSTS_PER_PAGE + index + 1;
        return {
            id,
            title: `Titulo ${id}`,
            imageUrl: `https://picsum.photos/seed/${id}/300/200`,
            likes: Math.floor(Math.random() * 100),
            createdAt: new Date().toISOString(),
        };
    });

    return {
        page,
        posts,
        hasNextPage: page < 10,
    };
}