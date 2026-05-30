import React, { useCallback } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useFeed } from '../hooks/useFeed';
import PostCard, { CARD_BODY_HEIGHT, CARD_MARGIN } from '../components/PostCard';
import { Post } from '../api/feedApi';

export default function FeedScreen() {
  const { width } = useWindowDimensions();
  const ITEM_HEIGHT = width * 0.6 + CARD_BODY_HEIGHT + CARD_MARGIN;

  const {
    posts,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useFeed();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(({ item }: { item: Post }) => (
    <PostCard post={item} />
  ), []);

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" testID="loading" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Algo salió mal 😢</Text>
        <Pressable onPress={() => refetch()} style={styles.retryBtn}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay posts aún</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      // --- Optimizaciones obligatorias del PDF ---
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}   // libera memoria de items fuera de pantalla
      windowSize={5}                 // renderiza 2 pantallas arriba y abajo
      initialNumToRender={5}         // solo renderiza 5 al inicio
      maxToRenderPerBatch={5}        // cuántos renderiza por batch al scrollear
      // --- Paginación ---
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}    // dispara cuando queda 50% de lista por ver
      // --- Pull to refresh (paso 4) ---
      onRefresh={refetch}
      refreshing={isLoading}
      // --- Footer de carga ---
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator style={{ padding: 16 }} /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, marginBottom: 12 },
  retryBtn: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: '600' },
});