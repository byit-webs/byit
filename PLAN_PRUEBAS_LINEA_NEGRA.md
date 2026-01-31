# 🧪 Plan de Pruebas Exhaustivo - Fix Línea Negra Móviles

## ✅ Checklist de Verificación Pre-Testing

### 1. Archivos Modificados - Verificados ✅

| Archivo | Cambio | Estado | Líneas |
|---------|--------|--------|--------|
| `Layout.astro` | viewport-fit=cover | ✅ Correcto | 18-20 |
| `Layout.astro` | theme-color meta | ✅ Correcto | 22 |
| `Layout.astro` | Fixed bg layer 1 | ✅ Correcto | 110 |
| `Layout.astro` | Fixed bg layer 2 (200vh) | ✅ Correcto | 111-114 |
| `Layout.astro` | overscroll CSS | ✅ Correcto | 201-207 |
| `global.css` | html overscroll-behavior | ✅ Correcto | 14-15 |
| `global.css` | body overscroll-behavior | ✅ Correcto | 27-28 |
| `global.css` | body::after pseudo | ✅ Correcto | 32-42 |
| `Footer.astro` | bg-[#050505] | ✅ Correcto | 4 |

### 2. Arquitectura de Capas - Verificada ✅

```
Z-Index Stack (de arriba a abajo):
┌─────────────────────────────────────┐
│ Contenido normal        (z: 0 a +∞) │
├─────────────────────────────────────┤
│ Orb component          (z: -10)     │
├─────────────────────────────────────┤
│ Fixed layer 1          (z: -50)     │  ← Cubre viewport estándar
├─────────────────────────────────────┤
│ Fixed layer 2 (200vh)  (z: -60)     │  ← Cubre ±100vh extra
├─────────────────────────────────────┤
│ body::after            (z: -100)    │  ← Extiende 200vh abajo
└─────────────────────────────────────┘
```

### 3. CSS Properties - Verificadas ✅

**HTML Element:**
- ✅ `background-color: #050505 !important`
- ✅ `scroll-behavior: smooth`
- ✅ `min-height: 100vh` + `-webkit-fill-available`
- ✅ `overscroll-behavior-y: contain`
- ✅ `overscroll-behavior-x: none`

**Body Element:**
- ✅ `background-color: #050505 !important`
- ✅ `min-height: 100vh` + `-webkit-fill-available`
- ✅ `overflow-x: hidden`
- ✅ `position: relative`
- ✅ `overscroll-behavior-y: contain`
- ✅ `overscroll-behavior-x: none`

**Body::After Pseudo-element:**
- ✅ `position: fixed`
- ✅ `bottom: -100vh` (empieza debajo del viewport)
- ✅ `height: 200vh` (cubre 200vh hacia abajo)
- ✅ `background-color: #050505`
- ✅ `z-index: -100`
- ✅ `pointer-events: none`

---

## 🧪 Pruebas a Realizar

### Test 1: Verificación Visual en Chrome DevTools

**Objetivo:** Simular móvil en desktop y verificar capas

**Pasos:**
1. Abrir Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Seleccionar "iPhone 12 Pro" o "Pixel 5"
4. Inspeccionar elemento `<body>`
5. Verificar en "Computed":
   - `background-color: rgb(5, 5, 5)` ✅
   - `overscroll-behavior-y: contain` ✅

**Resultado Esperado:**
- Body tiene fondo negro
- Pseudo-elemento ::after existe con z-index: -100

---

### Test 2: Scroll hasta el Final (Desktop Simulation)

**Objetivo:** Verificar que no aparece blanco al final

**Pasos:**
1. En Chrome DevTools modo móvil
2. Scrollear hasta el final de la página (Footer)
3. Inspeccionar si hay espacio blanco/gris debajo del Footer

**Resultado Esperado:**
- ✅ Fondo negro continuo hasta el final
- ❌ NO debe haber línea blanca/gris

---

### Test 3: Overscroll en Móvil Real (Crítico)

**Objetivo:** Probar bounce effect en dispositivo real

**Dispositivos de Prueba:**
- 📱 iPhone (iOS Safari)
- 📱 Android (Chrome Mobile)

**Pasos:**
1. Abrir sitio en móvil real
2. Scrollear hasta el **FINAL** de la página
3. Continuar deslizando el dedo hacia arriba (intentar "jalar" la página)
4. Observar qué color aparece en el área de bounce

**Resultado Esperado:**
- ✅ Área de bounce debe ser NEGRA (#050505)
- ❌ NO debe aparecer blanco/gris

**Si falla:**
- Verificar que el caché del navegador está limpio
- Cerrar completamente el navegador y reabrir
- Hacer "Hard Reload" (Cmd+Shift+R o Ctrl+Shift+R)

---

### Test 4: Viewport Theme Color (iOS/Android)

**Objetivo:** Verificar que la barra del navegador es negra

**Pasos:**
1. Abrir sitio en móvil real
2. Observar la barra de estado del navegador (arriba)
3. En iOS Safari: barra superior
4. En Android Chrome: barra de direcciones

**Resultado Esperado:**
- ✅ Barra del navegador con tinte negro/oscuro
- ❌ NO debe ser blanca

---

### Test 5: Performance Impact

**Objetivo:** Verificar que las capas fixed no afectan rendimiento

**Herramienta:** Chrome DevTools > Performance

**Pasos:**
1. Iniciar grabación en Performance tab
2. Scrollear la página completa (arriba a abajo)
3. Detener grabación
4. Analizar "Rendering" metrics

**Resultado Esperado:**
- ✅ FPS estable (≥30fps en móvil simulado)
- ✅ Sin exceso de "Paint" events
- ❌ NO debe haber layout thrashing

---

### Test 6: Interactividad de Elementos

**Objetivo:** Verificar que `pointer-events: none` no rompe clicks

**Pasos:**
1. Hacer click en botones del Footer
2. Hacer click en enlaces del Footer
3. Interactuar con formulario de contacto (si está al final)

**Resultado Esperado:**
- ✅ Todos los elementos son clickeables
- ✅ Hover effects funcionan
- ❌ NO debe haber áreas "muertas" donde no se puede clickear

---

### Test 7: Cross-Browser Compatibility

**Navegadores a Probar:**

| Navegador | Versión Mínima | Estado |
|-----------|----------------|--------|
| Chrome Mobile | 90+ | 🔄 Pendiente |
| Safari iOS | 14+ | 🔄 Pendiente |
| Firefox Mobile | 90+ | 🔄 Pendiente |
| Samsung Internet | 15+ | 🔄 Pendiente |

**Para cada navegador:**
1. Cargar página
2. Scroll hasta el final
3. Intentar overscroll bounce
4. Verificar color de fondo

---

### Test 8: Edge Cases

**Escenarios Especiales:**

1. **Página muy corta (menos de 1 pantalla):**
   - ¿Aparece línea al intentar scroll?
   - Expected: ✅ Fondo negro, no scroll

2. **Zoom del navegador:**
   - Hacer zoom 200%
   - Scroll al final
   - Expected: ✅ Fondo negro continuo

3. **Orientación landscape:**
   - Rotar móvil horizontalmente
   - Scroll al final
   - Expected: ✅ Fondo negro continuo

4. **Dark mode del sistema:**
   - Activar dark mode en el móvil
   - Verificar que no cambia a gris
   - Expected: ✅ Sigue siendo #050505

---

## 📊 Resumen de Tests

### Tests Automatizables (DevTools):
- ✅ Test 1: Verificación Visual
- ✅ Test 2: Scroll Desktop
- ✅ Test 5: Performance
- ✅ Test 6: Interactividad

### Tests Manuales (Dispositivo Real):
- 📱 Test 3: Overscroll Móvil Real (CRÍTICO)
- 📱 Test 4: Theme Color
- 📱 Test 7: Cross-Browser
- 📱 Test 8: Edge Cases

---

## ✅ Criterios de Éxito

La solución es **exitosa** si:

1. ✅ En Chrome DevTools (móvil simulado): No hay línea blanca al final
2. ✅ En móvil real iOS: Overscroll bounce muestra negro
3. ✅ En móvil real Android: Overscroll bounce muestra negro
4. ✅ Theme-color funciona (barra del navegador oscura)
5. ✅ Rendimiento mantiene ≥30fps en scroll
6. ✅ Todos los elementos son clickeables
7. ✅ Funciona en Chrome, Safari, Firefox móvil

---

## 🐛 Troubleshooting

### Si todavía aparece línea blanca/gris:

**Causa Posible 1: Caché del navegador**
```bash
# Desktop
Ctrl+Shift+R (Chrome/Firefox)
Cmd+Shift+R (Safari)

# Móvil
Settings > Clear Browsing Data > Cached Images
```

**Causa Posible 2: Algún componente tiene `background: white`**
```bash
# Buscar en el proyecto:
grep -r "bg-white" src/
grep -r "background.*white" src/
```

**Causa Posible 3: Z-index conflict**
```bash
# Verificar que ningún elemento tenga z-index < -100
# Inspeccionar en DevTools elementos con z-index negativo
```

**Causa Posible 4: CSS no compilado**
```bash
# Rebuild completo
npm run build
npm run preview
```

---

## 📝 Log de Pruebas

| Test | Fecha | Dispositivo | Navegador | Resultado | Notas |
|------|-------|-------------|-----------|-----------|-------|
| Test 1 | Pendiente | Desktop | Chrome DevTools | - | - |
| Test 3 | Pendiente | iPhone 12 | Safari 15 | - | - |
| Test 3 | Pendiente | Pixel 5 | Chrome 120 | - | - |
| Test 4 | Pendiente | iPhone 12 | Safari 15 | - | - |

---

**Status:** 🔄 Listo para Testing Manual en Dispositivo Real
**Prioridad:** Test 3 (Overscroll Móvil Real) es CRÍTICO
