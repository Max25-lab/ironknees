# PWA Pack — Rodillas de Hierro

Este paquete añade a tu sitio soporte PWA (instalable como app en Android/iOS/desktop).

## Archivos incluidos
- `manifest.json` — metadatos de la app (nombre, colores, iconos).
- `service-worker.js` — caché offline (estrategia cache-first).
- `icons/` — íconos en 192px y 512px (incluye máscara).
- `README.txt` — este instructivo.

## Cómo integrar en tu `index.html`
En `<head>` añade:
```html
<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#111111">
<link rel="apple-touch-icon" href="./icons/icon-192.png">
```

Antes de `</body>` registra el service worker:
```html
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}
</script>
```

**Importante:** tu sitio debe servirse por **HTTPS** (GitHub Pages ya lo hace).

## Publicar / actualizar
1. Sube estos archivos a la raíz de tu repositorio de GitHub Pages.
2. Haz commit en `main`. GitHub despliega automáticamente.
3. En Android visita tu web y selecciona _“Añadir a pantalla de inicio”_.

## Generar APK gratis para Android (opcional)
Usa **https://www.pwabuilder.com**:
- Ingresa la URL de tu web en GitHub Pages.
- PWABuilder valida el manifiesto y genera un proyecto Android listo para compilar en Android Studio o un `.apk`.

> iOS no permite publicar un `.ipa` sin cuenta de desarrollador, pero la PWA se puede **instalar desde Safari** (Compartir → Añadir a Inicio).