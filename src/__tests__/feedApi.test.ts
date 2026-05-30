import { fetchFeed } from '../api/feedApi';

describe('fetchFeed', () => {
  it('retorna la estructura correcta de paginacion', async () => {
    const result = await fetchFeed(1);

    expect(result.page).toBe(1);
    expect(result.posts).toHaveLength(10);
    expect(typeof result.hasNextPage).toBe('boolean');
  });

  it('los posts tienen las propiedades requeridas', async () => {
    const result = await fetchFeed(1);
    const post = result.posts[0];

    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('imageUrl');
    expect(post).toHaveProperty('likes');
    expect(post).toHaveProperty('createdAt');
  });

  it('hasNextPage es false en la ultima pagina', async () => {
    const result = await fetchFeed(10);
    expect(result.hasNextPage).toBe(false);
  });
});
