import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFeedStore } from '../store/feedStore';

export default function FavoritesScreen() {
  const likedPosts = useFeedStore((s) => s.likedPosts);

  const likedIds = Object.entries(likedPosts)
    .filter(([, liked]) => liked)
    .map(([id]) => id);

  if (likedIds.length === 0) {
    return (
      <View style={styles.center} accessible accessibilityLabel="Sin favoritos aun">
        <Text style={styles.empty}>Aun no tienes favoritos</Text>
        <Text style={styles.hint}>Desliza un post a la izquierda para guardarlo</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos ({likedIds.length})</Text>
      <FlatList
        data={likedIds}
        keyExtractor={(id) => id}
        renderItem={({ item }) => (
          <View style={styles.item} accessible accessibilityLabel={`Post favorito ${item}`}>
            <Text style={styles.itemText}>Post #{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  empty: { fontSize: 18, color: '#444', marginBottom: 8 },
  hint: { fontSize: 14, color: '#888' },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
  },
  itemText: { fontSize: 15, color: '#333' },
});
