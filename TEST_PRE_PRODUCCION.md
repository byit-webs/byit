# ✅ Pruebas Pre-Producción - Línea Negra Móvil

## 🎯 Problema Identificado

**Descripción:** Línea negra aparece al hacer scroll en móvil en estas situaciones:
1. ⬆️ Al subir hasta el Hero y hacer "pull down" (overscroll bounce superior)
2. ⬇️ Al hacer scroll hacia abajo desde el Hero

**Causa:** Overscroll bounce muestra área fuera del contenido que no tiene background negro

---

## ✅ Solución Implementada

### Fix 1: `body::before` para Overscroll Superior
```css
body::before {
  content: '';
  position: fixed;
  top: -100vh;  /* Cubre 100vh ARRIBA del viewport */
  background-color: #050505;
  z-index: -100;
}
```

### Fix 2: `body::after` para Overscroll Inferior
```css
body::after {
  content: '';
  position: fixed;
  bottom: -100vh;  /* Cubre 200vh ABAJO del viewport */
  height: 200vh;
  background-color: #050505;
  z-index: -100;
}
```

### Fix 3: Capas Fixed Adicionales
- Fixed layer 1: `z-index: -50` (viewport estándar)
- Fixed layer 2: `z-index: -60` (200vh extendido)

### Fix 4: Meta Tags
- `theme-color: #050505` → Barra del navegador negra
- `viewport-fit: cover` → Ocupa pantalla completa

---

## 🧪 Tests de Producción

### Test 1: Overscroll Superior (CRÍTICO)
**Escenario:** Pull-to-refresh en Hero

**Pasos:**
1. Abrir sitio en móvil real
2. Estar en la sección Hero (inicio de página)
3. Deslizar dedo hacia ABAJO (intentar "pull to refresh")
4. Observar el color que aparece arriba

**Resultado Esperado:**
- ✅ Debe aparecer NEGRO (#050505)
- ❌ NO debe aparecer blanco/gris

**Dispositivos a probar:**
- [ ] iPhone (iOS Safari)
- [ ] Android (Chrome)

---

### Test 2: Scroll Normal desde Hero
**Escenario:** Scroll hacia abajo desde Hero a Services

**Pasos:**
1. Estar en Hero
2. Scrollear suavemente hacia abajo
3. Observar transición entre Hero → Services

**Resultado Esperado:**
- ✅ Transición suave sin líneas negras
- ✅ Gradientes de colores visibles
- ❌ NO debe aparecer gap negro

---

### Test 3: Scroll hasta Final
**Escenario:** Verificar que no rompimos nada al final

**Pasos:**
1. Scrollear hasta Footer
2. Intentar scroll más allá del Footer

**Resultado Esperado:**
- ✅ Fondo negro continuo
- ❌ NO debe aparecer blanco

---

### Test 4: Gradientes Visuales
**Escenario:** Verificar que los colores siguen visibles

**Pasos:**
1. Cargar página
2. Observar Hero - debe tener gradiente naranja/morado
3. Observar Orb - debe tener efecto de luz

**Resultado Esperado:**
- ✅ Gradientes de colores VISIBLES
- ✅ Orb con efecto de luz
- ❌ NO todo negro plano

---

### Test 5: Rendimiento
**Escenario:** Verificar que no hay lag

**Pasos:**
1. Scrollear desde Hero hasta Footer
2. Observar fluidez (fps)

**Resultado Esperado:**
- ✅ Scroll fluido ≥30fps
- ❌ NO debe haber stuttering

---

### Test 6: Interactividad
**Escenario:** Todos los elementos clickeables

**Pasos:**
1. Click en "Empezar Proyecto" (Hero)
2. Click en cards de Services
3. Click en Portfolio
4. Click en Precios

**Resultado Esperado:**
- ✅ Todos los elementos responden
- ✅ Hover effects funcionan

---

## 📋 Checklist Pre-Deploy

### Código
- [x] `body::before` añadido (top overscroll)
- [x] `body::after` añadido (bottom overscroll)
- [x] Fixed layers con z-index correcto
- [x] theme-color meta tag
- [x] viewport-fit=cover
- [x] overscroll-behavior: contain

### Archivos Modificados
- [x] `src/styles/global.css`
- [x] `src/layouts/Layout.astro`
- [x] `src/components/Footer.astro`

### Tests
- [ ] Test 1: Overscroll superior (móvil real)
- [ ] Test 2: Scroll Hero→Services (móvil real)
- [ ] Test 3: Scroll hasta final (móvil real)
- [ ] Test 4: Gradientes visibles (visual)
- [ ] Test 5: Rendimiento (DevTools)
- [ ] Test 6: Interactividad (clicks)

---

## 🚀 Deploy a Producción

### Opción 1: Netlify (Recomendado)
```bash
# 1. Build producción
npm run build

# 2. Preview local
npm run preview

# 3. Deploy a Netlify
# Arrastra carpeta dist/ a Netlify Drop
# O usa CLI:
netlify deploy --prod
```

### Opción 2: Manual
```bash
# 1. Build
npm run build

# 2. La carpeta dist/ contiene el sitio estático
# Subir contenido de dist/ a tu hosting
```

---

## ✅ Criterios de Aprobación

La solución es **apta para producción** si:

1. ✅ Test 1 PASA (overscroll superior negro)
2. ✅ Test 2 PASA (scroll Hero→Services sin línea)
3. ✅ Test 4 PASA (gradientes visibles)
4. ✅ Test 5 PASA (rendimiento fluido)
5. ✅ Test 6 PASA (todo clickeable)

**Si todos pasan → DEPLOY APROBADO ✅**

---

## 🐛 Rollback Plan

Si después de deploy hay problemas:

### Revertir en Git
```bash
git revert HEAD
git push origin main
```

### Revertir Cambios CSS
```bash
# Restaurar global.css anterior
git checkout HEAD~1 src/styles/global.css
npm run build
```

---

## 📊 Resultado de Tests

| Test | Dispositivo | Estado | Notas |
|------|-------------|--------|-------|
| Test 1 | iPhone | 🔄 | Pendiente prueba |
| Test 1 | Android | 🔄 | Pendiente prueba |
| Test 2 | iPhone | 🔄 | Pendiente prueba |
| Test 4 | Desktop | 🔄 | Verificar gradientes |

---

**Status:** 🔄 Listo para Testing Final Pre-Deploy
**Acción Siguiente:** Ejecutar Tests 1-6 en orden
