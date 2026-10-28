# Auditoría UX – Aplicación de notas

## 1. Problemas encontrados y soluciones

| Heurística de Nielsen | Problema de la pantalla original | Solución aplicada |
|---|---|---|
| Visibilidad del estado del sistema | No se confirma claramente si una nota se agregó o eliminó. | Mostrar mensajes después de cada acción. |
| Correspondencia entre el sistema y el mundo real | Las acciones pueden tener nombres poco claros. | Usar palabras sencillas como “Agregar nota” y “Eliminar”. |
| Control y libertad del usuario | La eliminación puede ser accidental. | Pedir confirmación antes de eliminar y permitir cancelar. |
| Consistencia y estándares | Los botones y mensajes pueden tener estilos diferentes. | Mantener colores, tamaños y estilos consistentes. |
| Prevención de errores | Se pueden intentar guardar notas vacías. | Deshabilitar el guardado cuando el campo esté vacío y validar el contenido. |

## 2. Leyes de diseño

- **Ley de Fitts:** los botones principales tendrán un tamaño mínimo de 44 px de alto para facilitar su uso.
- **Ley de Hick:** las acciones estarán organizadas para evitar demasiadas opciones simultáneas.
- **Ley de Miller:** la información de cada nota se presentará de forma breve y ordenada para facilitar su comprensión.

## 3. Accesibilidad

- Cada campo tendrá su etiqueta `label`.
- Los botones tendrán foco visible al navegar con el teclado.
- Los colores se definirán mediante variables CSS en `:root`.
- Se buscará un contraste mínimo de 4.5:1 para el texto normal.
- La página tendrá un solo encabezado principal `h1`.

## 4. Evidencias

### Antes del rediseño
Pegar aquí la captura de Lighthouse de la versión original, si está disponible.

### Después del rediseño
Pegar aquí la captura de Lighthouse de la versión final con una puntuación de Accesibilidad de 90 o más.

## 5. Resultado

La interfaz rediseñada busca facilitar la creación y administración de notas, prevenir errores y mejorar la accesibilidad.
