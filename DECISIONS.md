# Decisiones Técnicas — SmartFeed

## Manejo de Estado: Zustand
**Por qué Zustand sobre Redux Toolkit / Context:**
- API mínima sin boilerplate — un store se define en ~20 líneas
- Soporte nativo de `persist` middleware compatible con MMKV
- Selectores por defecto evitan re-renders innecesarios
- Bundle size: ~1KB vs ~15KB de Redux

## Persistencia: MMKV
**Por qué MMKV sobre AsyncStorage / SQLite:**
- Lectura síncrona — los posts cargados aparecen instantáneamente al abrir la app
- 10x más rápido que AsyncStorage en benchmarks de React Native
- Soporta hasta 10k posts almacenados sin degradación

## Imágenes: expo-image
Tiene mejor rendimiento al cargar imágenes, animaciones más suaves y se acopla mejor al ecosistema Expo. Además el `cachePolicy="disk"` resuelve el caché offline de imágenes sin configuración extra.

## Paginación: React Query (useInfiniteQuery)
El feed paginado infinito justifica React Query porque sin él habría que manejar manualmente el estado de loading, error, páginas, retry y concurrencia. React Query resuelve todo eso con una sola función.

## Cola offline: MMKV + Zustand persist
Una cola offline debe sobrevivir al cierre de la app, reinicios y crashes. Guardar solo en memoria (Zustand sin persistencia) perdería los likes pendientes si la app se cierra antes de reconectar.

## FlatList: getItemLayout
Los items del feed tienen altura conocida y consistente, lo que permite usar `getItemLayout`. Esto evita que FlatList mida cada celda dinámicamente, mejorando dramáticamente el rendimiento del scroll.

## getAverageColor: Mock funcional
Se implementó como mock porque el objetivo era demostrar cómo se consume esa información dentro de la app, no la extracción del color en sí. En producción se conectaría la Android Palette API via TurboModule para obtener el color real de cada imagen.
