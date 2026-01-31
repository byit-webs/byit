# Conversor de Imágenes a WebP

Este archivo contiene las instrucciones para convertir tus imágenes PNG a formato WebP optimizado.

## Opción 1: Herramienta Online (Más Fácil)

1. Ve a https://squoosh.app/ (herramienta de Google)
2. Arrastra las siguientes imágenes desde `public/img/`:
   - `barbershop.png` (200KB) - **PRIORIDAD ALTA**
   - `paginataller.png` (204KB) - **PRIORIDAD ALTA**
   - `farmacia.png` (88KB)
   - `paginaclinica.png` (79KB)
   
3. Para cada imagen:
   - Selecciona formato: **WebP**
   - Quality: **82** (balance óptimo calidad/tamaño)
   - Effort: **6** (máxima compresión)
   
4. Descarga cada imagen con el nombre original pero extensión `.webp`:
   - `barbershop.webp`
   - `paginataller.webp`
   - `farmacia.webp`
   - `paginaclinica.webp`

5. Coloca los archivos `.webp` en `public/img/` (junto a los PNG originales)

## Opción 2: Batch con Squoosh CLI (Avanzado)

```bash
# Ejecuta esto en la terminal del proyecto con políticas habilitadas
npx @squoosh/cli --webp '{"quality":82,"effort":6}' ./public/img/*.png -d ./public/img/
```

## Opción 3: Conversión Manual con Windows Paint 3D

Si prefieres no usar herramientas online:

1. Abre cada imagen en Paint 3D
2. File > Save As > Image
3. Tipo: PNG (luego renombra manualmente a .webp)

**Nota**: Esta opción NO optimiza el tamaño, solo la Opción 1 y 2 lo hacen correctamente.

## Verificación

Después de la conversión, verifica que tengas estos archivos en `public/img/`:

```
✓ barbershop.png      (200 KB - original, fallback)
✓ barbershop.webp     (~50-60 KB - optimizado)
✓ paginataller.png    (204 KB - original, fallback)
✓ paginataller.webp   (~70-80 KB - optimizado)
✓ farmacia.png        (88 KB - original, fallback)
✓ farmacia.webp       (~25-30 KB - optimizado)
✓ paginaclinica.png   (79 KB - original, fallback)
✓ paginaclinica.webp  (~22-28 KB - optimizado)
✓ favicon.png         (26 KB - NO convertir, es crítico)
```

**Ahorro estimado total**: ~350 KB → ~170 KB (-50%)

## ¿Por qué mantenemos los PNG?

Los archivos PNG originales sirven como **fallback** para navegadores antiguos que no soportan WebP. El código ya está configurado para usar WebP automáticamente en navegadores modernos (97% de usuarios) y PNG en navegadores legacy (3%).
