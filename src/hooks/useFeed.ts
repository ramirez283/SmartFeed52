import { useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeed } from '../api/feedApi';

export const useFeed = () => {
  const query = useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: ({ pageParam }) => fetchFeed(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : undefined,
  });

  const posts = query.data?.pages.flatMap(p => p.posts) ?? [];

  useEffect(() => {
    if (posts.length > 0) {
      StorageService.savePosts(posts);
    }
  }, [posts]);

  const cachedPosts = StorageService.getPosts();
  const displayPosts = posts.length > 0 ? posts : cachedPosts;

  return {
    posts: displayPosts,
    isLoading: query.isLoading && displayPosts.length === 0,
    isError: query.isError && displayPosts.length === 0,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
};