# SmartFeed — TODO List

## Estado actual

### Ya implementado
- [x] Mock API con latencia 500ms y 10% de errores aleatorios
- [x] `useFeed` con React Query infinite query + control de concurrencia
- [x] `FlatList` optimizado (`getItemLayout`, `removeClippedSubviews`, `windowSize`, `initialNumToRender`)
- [x] `PostCard` con `React.memo` y comparacion profunda controlada
- [x] `expo-image` con `cachePolicy="disk"` (cache de imagenes en disco)
- [x] Estados loading / error / empty / retry
- [x] Pull-to-refresh

### Librerias instaladas listas para usar
- `zustand`
- `react-native-mmkv`
- `react-native-reanimated`
- `react-native-gesture-handler`
- `@react-native-community/netinfo`

---

## Bloque 1 — Arquitectura / Estructura

- [x] **1.1** Definir estructura de carpetas final (`api/`, `store/`, `hooks/`, `components/`, `screens/`, `services/`, `navigation/`, `types/`)
- [x] **1.2** Zustand store con persistencia MMKV (`src/store/feedStore.ts`) — likes + cola offline
- [x] **1.3** React Navigation: Bottom Tabs (Feed + Favorites) + Native Stack dentro del tab Feed
- [x] **1.4** Corregido entry point — `App.tsx` con `export default` + `GestureHandlerRootView`

---

## Bloque 2 — Offline Cache

- [x] **2.1** Persistir posts en MMKV al recibirlos de la API
- [x] **2.2** Al iniciar sin red, cargar posts desde MMKV instantaneamente
- [x] **2.3** Integrar deteccion de red con `NetInfo` (servicio de red)
- [x] **2.4** Cola de acciones offline — guardar likes en MMKV si no hay red
- [x] **2.5** Sincronizacion automatica al recuperar conectividad (con backoff exponencial)

---

## Bloque 3 — Animaciones (Reanimated)

- [x] **3.1** Animacion de aparicion por post al entrar al viewport (fade o slide)
- [x] **3.2** Press feedback en `PostCard` (scale down al presionar)
- [x] **3.3** Animacion del boton de like (scale + color)

---

## Bloque 4 — Gestos (Gesture Handler)

- [x] **4.1** Swipeable en `PostCard` — deslizar izquierda revela acciones ("Compartir" / "Favorito")
- [x] **4.2** Definir UX del swipe: snap back, umbral de activacion, haptic feedback

---

## Bloque 5 — Soporte de orientacion

- [x] **5.1** Reemplazar `Dimensions.get('window').width` estatico por `useWindowDimensions`
- [x] **5.2** Recalcular `ITEM_HEIGHT` segun orientacion para que `getItemLayout` siga siendo correcto
- [x] **5.3** Verificar que el scroll no pierde posicion al rotar

---

## Bloque 6 — Accesibilidad

- [x] **6.1** Agregar `accessible`, `accessibilityLabel` y `accessibilityRole` a `PostCard`
- [x] **6.2** Agregar labels al boton de like y al swipeable
- [x] **6.3** Verificar contraste de colores (texto sobre fondo)
- [x] **6.4** Soporte basico VoiceOver/TalkBack en botones de accion

---

## Bloque 7 — Modulo nativo / Mock getAverageColor

- [x] **7.1** Decidir: mock funcional con justificacion escrita (Expo managed workflow + alternativa nativa documentada)
- [x] **7.2** Implementar mock de `getAverageColor(imageUri)` con algoritmo de color dorado
- [x] **7.3** Usar ese color como background del texto del post

---

## Bloque 8 — Tests

- [x] **8.1** Unit test de logica de paginacion (`fetchFeed` / `useFeed`)
- [x] **8.2** Unit test de la cola offline (guardar y sincronizar likes)
- [x] **8.3** Integration test del componente `FeedScreen` con `@testing-library/react-native`
- [x] **8.4** Setup de Jest + configuracion para Expo

---

## Bloque 9 — Pulido final

- [x] **9.1** Navegacion con React Navigation si se decide incluirla
- [x] **9.2** Documentar decisiones tecnicas (DECISIONS.md)
- [x] **9.3** Revisar re-renders innecesarios (selectores Zustand + React.memo + useCallback)
- [x] **9.4** Verificar performance en modo release
