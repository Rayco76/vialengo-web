# Confianza, presentación personal y caso piloto

La portada conserva el verde, la tipografía y los componentes existentes. El bloque
de confianza aparece después de «Cómo funciona» y la presentación de Rayco antes
del contacto. Se enlaza el piloto desde la portada y desde «Casos» en la navegación.

## Foto de Rayco

1. Guardar una fotografía profesional real en `public/team/rayco.webp`.
2. En `src/content/about.ts`, cambiar `founder.photo.src` de `null` a
   `'/team/rayco.webp'` y revisar el texto alternativo.
3. La presentación usa formato vertical 3:4 y recorta para llenar el marco.
   Comprobar el encuadre en móvil y ordenador. No usar una persona de stock o generada
   como si fuera Rayco.

Sin fotografía aparece «Fotografía profesional pendiente». `MediaFrame.astro`
es compartido por la presentación y la galería; admite rutas del directorio público
y respeta la subruta configurada del sitio.

## Capturas del caso

La URL existente `/cases/dental-clinic-001/` se mantiene. El contenido está en
`src/content/cases.ts`. Cada entrada de `gallery` contiene `title`, `caption`, `src`
y `alt`.

1. Preparar material real cuya publicación esté autorizada o anonimizarlo antes
   de copiarlo al repositorio. No incorporar originales con datos sensibles.
2. Guardar el archivo listo para publicar en `public/cases/piloto/`.
3. Sustituir el `src: null` correspondiente por, por ejemplo,
   `src: '/cases/piloto/plantillas.webp'`. Actualizar `alt` y `caption` con lo que
   realmente se muestra.
4. Comprobar legibilidad y encuadre. Las capturas se muestran completas, sin recorte,
   en un marco 16:10. No tienen por qué compartir el tamaño original.

Hasta entonces se muestran cuatro placeholders «Próximamente», sin falsas capturas
ni imágenes que aparenten resultados. La nota al pie se aplica a los materiales
publicados; no sustituye a la autorización. Conservar las autorizaciones fuera del
repositorio público. No publicar nombres, logos, rostros de pacientes, conversaciones,
identificadores de cuentas u otros datos sin autorización explícita; anonimizar cuando
corresponda y revisar también nombres de archivo y metadatos de las imágenes.

## Texto y métricas

Las señales del piloto (aproximadamente 500 visualizaciones, 22 interacciones y una
visita al perfil) proceden de los datos facilitados por el responsable del proyecto.
No se han auditado aquí mediante acceso a los perfiles. Se muestran juntas, con su
contexto y sin atribución de pacientes, ingresos ni promesas de resultados.
No se convierten en contadores de éxito de la portada. Actualizar la fuente, periodo
y cifras cuando se disponga de información adicional contrastada.

La IA solo prepara borradores de contenidos y reseñas con revisión humana. El bot
de WhatsApp sigue reglas; no se presenta como IA clínica ni como un sistema autónomo
de atención al paciente. Las automatizaciones futuras se describen como preparación.
La propiedad de las cuentas sigue en la clínica y los accesos se acuerdan para las
tareas necesarias; esta página describe la forma de colaboración, no un nuevo
sistema técnico de permisos.

## Validación

Ejecutar `npm run build`. Revisar home, `/cases/` y el piloto en ordenador y móvil:
jerarquía de títulos, contraste, navegación por teclado, enlaces, ausencia de
desbordamiento, placeholders y textos de contexto de las cifras. Conservar también
la coherencia de `/index.md`, `/ai/`, `/ai.md` y `/llms.txt`.
