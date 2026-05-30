import React, { memo } from 'react';
import { View, Text, useWindowDimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Post } from '../api/feedApi';
import { useFeedStore } from '../store/feedStore';
import { NetworkService } from '../services/networkService';
import { postCardStyles as styles } from '../styles/postCard.styles';
import { ColorService } from '../services/colorService';

interface Props {
  post: Post;
}

export { CARD_BODY_HEIGHT, CARD_MARGIN } from '../styles/constants';
import { CARD_MARGIN } from '../styles/constants';

const ActionButton = ({
  iconName,
  label,
  onPress,
}: {
  iconName: React.ComponentProps<typeof Feather>['name'];
  label: string;
  onPress?: () => void;
}) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      accessible={true}
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.88); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      <Animated.View style={[styles.actionBtn, animStyle]}>
        <Feather name={iconName} size={22} color="#fff" />
        <Text style={styles.actionText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

const renderRightActions = () => (
  <View style={styles.actions}>
    <ActionButton iconName="send" label="Compartir" />
    <ActionButton iconName="bookmark" label="Favorito" />
  </View>
);

const PostCard = ({ post }: Props) => {
  const { width } = useWindowDimensions();
  const imageHeight = width * 0.6;
  const backgroundColor = ColorService.getAverageColor(post.imageUrl);

  const scale = useSharedValue(1);
  const likeScale = useSharedValue(1);

  const isLiked = useFeedStore(s => s.likedPosts[post.id.toString()] ?? false);
  const toggleLike = useFeedStore(s => s.toggleLike);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const handleLike = async () => {
    likeScale.value = withSequence(withSpring(1.4), withSpring(1));
    const isOnline = await NetworkService.isConnected();
    toggleLike(post.id.toString(), isOnline);
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
    >
      <Animated.View entering={FadeInDown.duration(600)} style={{ marginBottom: CARD_MARGIN }}>
        <Pressable
          accessible={true}
          accessibilityLabel={`Post: ${post.title}. ${post.likes} likes.`}
          accessibilityRole="button"
          accessibilityHint="Deslizar a la izquierda para más opciones."
          onPressIn={() => { scale.value = withSpring(0.97); }}
          onPressOut={() => { scale.value = withSpring(1); }}
        >
          <Animated.View style={[styles.card, pressStyle]}>
            <Image
              source={{ uri: post.imageUrl }}
              style={{ width, height: imageHeight }}
              contentFit="cover"
              transition={300}
              cachePolicy="disk"
            />
            <View style={[styles.body, { backgroundColor }]}>
              <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
              <Pressable
                accessible={true}
                accessibilityLabel={`${isLiked ? 'Quitar like' : 'Me gusta'}: ${post.likes} likes.`}
                accessibilityRole="button"
                onPress={handleLike} style={styles.likeBtn}>
                <Animated.Text style={[styles.likeText, likeAnimatedStyle]}>
                  {isLiked ? '❤️' : '🤍'} {post.likes}
                </Animated.Text>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Swipeable>
  );
};

export default memo(PostCard, (prev, next) =>
  prev.post.id === next.post.id && prev.post.likes === next.post.likes
);
