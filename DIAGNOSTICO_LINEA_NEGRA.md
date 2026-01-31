# 🔍 Diagnóstico Sistemático - Línea Negra

## Stack de Capas Actual

### En `Layout.astro`:
```
z-index: -10  → Orb container (fixed, h-full)
z-index: -50  → Fixed bg layer 1 (inset-0)
z-index: -60  → Fixed bg layer 2 (200vh, translateY -50vh)
z-index: -100 → body::before (top overscroll)
z-index: -100 → body::after (bottom overscroll)
```

### En `index.astro`:
```
z-index: -20  → Gradient blobs (fixed inset-0)
                - Red/orange gradient (top-left)
                - Purple gradient (top-right)
                - Orange gradient (bottom-left)
```

## Problema Identificado

Los **gradient blobs en index.astro** (z: -20) están **POR DEBAJO** del Orb (z: -10), pero **ENCIMA** de los fondos negros (z: -50, -60).

Cuando scrolleas, estos gradients son `fixed`, pero solo cubren el viewport inicial. Al scrollear más abajo, se acaba el área de esos gradientes y se ve el fondo negro (-50) creando la "línea negra".

## Solución

Necesito que los gradients también se extiendan a toda la altura de la página, no solo `inset-0`.
