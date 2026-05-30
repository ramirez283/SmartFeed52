import { useFeedStore } from '../store/feedStore';

describe('feedStore - cola offline', () => {
  beforeEach(() => {
    useFeedStore.setState({
      likedPosts: {},
      pendingLikes: [],
    });
  });

  it('agrega like cuando esta online', () => {
    useFeedStore.getState().toggleLike('1', true);
    const { likedPosts, pendingLikes } = useFeedStore.getState();

    expect(likedPosts['1']).toBe(true);
    expect(pendingLikes).toHaveLength(0);
  });

  it('encola el like cuando esta offline', () => {
    useFeedStore.getState().toggleLike('1', false);
    const { likedPosts, pendingLikes } = useFeedStore.getState();

    expect(likedPosts['1']).toBe(true);
    expect(pendingLikes).toHaveLength(1);
    expect(pendingLikes[0].action).toBe('like');
  });

  it('clearPendingLikes vacia la cola', () => {
    useFeedStore.getState().toggleLike('1', false);
    useFeedStore.getState().clearPendingLikes();

    expect(useFeedStore.getState().pendingLikes).toHaveLength(0);
  });
});
