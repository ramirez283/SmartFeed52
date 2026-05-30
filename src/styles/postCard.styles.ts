import { StyleSheet } from 'react-native';
import { CARD_MARGIN } from './constants';

export const postCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  body: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
  },
  likeBtn: {
    alignItems: 'center',
    padding: 4,
  },
  likeText: {
    fontSize: 16,
    color: '#555',
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 14,
    marginBottom: CARD_MARGIN,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: '#1C1C1E',
    minWidth: 125,
  },
  shareBtn: {},
  favoriteBtn: {},
  actionIcon: {
    fontSize: 16,
    color: '#fff',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.2,
  },
});
