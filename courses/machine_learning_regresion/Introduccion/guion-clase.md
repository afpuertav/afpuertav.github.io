# Guion de clase — Sesión 1

**Introducción a la Inteligencia Artificial y el Machine Learning**
Duración: 2 horas (120 min) · Sin código ni matemáticas

---

## Reparto del tiempo

| Bloque | Contenido | Minutos | Acumulado |
|---|---|---|---|
| 0 | Apertura y encuadre | 6 | 0:06 |
| 1 | ¿Qué es la inteligencia artificial? | 18 | 0:24 |
| 2 | ¿Qué es el machine learning? | 24 | 0:48 |
| — | **Descanso** | 10 | 0:58 |
| 3 | Paradigmas de aprendizaje | 26 | 1:24 |
| 4 | Tipos de tarea | 22 | 1:46 |
| 5 | Aplicaciones | 10 | 1:56 |
| 6 | Hacia dónde va el curso y cierre | 4 | 2:00 |

> Si el tiempo aprieta, los bloques comprimibles son el 5 (aplicaciones) y la
> diapositiva "Un mismo algoritmo, varias tareas". **No sacrifiques el bloque 3**:
> es el andamiaje del resto del curso.

---

## Bloque 0 · Apertura (6 min)

**Diapositivas:** portada, "Qué veremos hoy".

Antes de empezar, toma el pulso al grupo con una pregunta a mano alzada:

> **¿Quién ha usado alguna herramienta de IA esta semana?**
> ¿Y quién ha entrenado un modelo alguna vez?

Sirve para calibrar el nivel y para que noten que ya conviven con esto.

Encuadre explícito: **hoy no hay código**. Dilo en voz alta, porque parte del
grupo llega esperando abrir Python el primer día. El argumento: sin el mapa
conceptual, el código se convierte en copiar y pegar.

---

## Bloque 1 · ¿Qué es la IA? (18 min)

### Diapositiva "Una definición oficial"

Lee la definición de la OCDE despacio. Es densa a propósito.

**Pregunta para discutir (4-5 min):**

> **¿Un termostato programable es IA? ¿Y uno que aprende tus horarios?
> ¿Dónde ponemos la frontera, y por qué esa frontera importa legalmente?**

*Hacia dónde llevarla:* el termostato programable sigue reglas fijas escritas
por una persona — **no infiere nada**. El que aprende tus horarios sí infiere a
partir de lo que observa. La frontera importa porque de ella depende qué
sistemas quedan sujetos a regulación: la definición de la OCDE es la base del
Reglamento Europeo de IA y de normativa en otros países.

*Si nadie habla:* pregunta directamente por el caso intermedio — "¿y un
termostato con un temporizador que ustedes ajustan cada semana?".

### Diapositiva "Por qué esa definición es tan cuidadosa"

Recalca lo que la definición **no** dice. Nadie menciona redes neuronales ni
Python. Es una definición funcional, no técnica.

### Diapositiva "IA no es lo mismo que machine learning"

Aquí explicas los tres marcos anidados. Puntos que conviene decir:

- La IA como campo nace en los años 50; el ML es una de sus ramas.
- Los **sistemas expertos** de los 80 son IA plena y no aprenden de datos: son
  reglas escritas por especialistas humanos.
- El aprendizaje profundo es un subconjunto del ML, no un sinónimo.

Frase de cierre: *"Todo el machine learning es IA, pero no toda la IA es
machine learning."*

---

## Bloque 2 · ¿Qué es el machine learning? (24 min)

### Diapositiva "Definición"

Dos definiciones complementarias, IBM y Google. La de Google es más operativa
("entrenar un programa llamado modelo"); úsala como puente al diagrama
siguiente.

### Diapositiva "El cambio de enfoque"

**Esta es la diapositiva más importante del bloque.** Recórrela en voz alta
señalando cada caja:

- Arriba: nosotros escribimos las reglas → sale un programa → el programa
  produce respuestas.
- Abajo: **le damos datos Y respuestas** → el entrenamiento produce un modelo →
  el modelo produce respuestas para datos nuevos.

La inversión es el corazón del asunto: **las respuestas pasan de ser la salida
a ser parte de la entrada**. Si solo se llevan una idea de hoy, que sea esta.

Buen momento para usar la pizarra (tecla `B`) y dibujar encima.

### Diapositiva "Un ejemplo concreto: predecir la lluvia"

El contraste física vs. datos. Advierte que **no es que el ML sea mejor**: los
modelos meteorológicos operativos siguen siendo físicos, y el ML se usa para
corregirlos (lo verán en el bloque 5).

### Diapositiva "Tres palabras que usaremos todo el curso"

**Pregunta para discutir (4 min):**

> **Si un modelo acierta perfectamente sobre los datos con los que se entrenó,
> ¿es un buen modelo?**

*Hacia dónde llevarla:* no. Es la intuición del **sobreajuste**, sin nombrarlo
todavía. Analogía útil: un estudiante que se memorizó las respuestas del examen
del año pasado sin entender nada. Saca 5.0 en ese examen y se hunde en el
siguiente.

Anuncia que volverán a esta pregunta cuando vean validación. **No la resuelvas
del todo hoy** — déjala incómoda.

---

## Descanso (10 min)

---

## Bloque 3 · Paradigmas (26 min)

Es el bloque más denso. Ritmo sostenido, sin detenerse mucho en cada uno.

### "Los tres paradigmas fundamentales"

Presenta los tres de golpe antes de entrar en detalle, para que tengan el mapa.

### "Aprendizaje supervisado"

La analogía de Google (exámenes viejos con respuestas) funciona muy bien con
estudiantes. Explótala.

### "Aprendizaje no supervisado"

**Pregunta para discutir (5 min):**

> **Si nadie le dice al algoritmo qué es correcto, ¿cómo sabemos si lo hizo bien?**

*Hacia dónde llevarla:* es una pregunta genuinamente difícil y no tiene una
respuesta limpia. Existen métricas internas (cohesión, separación), pero al
final **la validación suele ser humana y depende del dominio**. Es una
diferencia profunda con el aprendizaje supervisado, donde hay un número que
dice si acertaste. Sirve para que entiendan por qué el curso se centra en
supervisado: es donde se puede medir.

### "Aprendizaje semisupervisado"

El argumento económico (etiquetar es caro) es el que hace clic. Ejemplo del
radiólogo.

### "Aprendizaje por refuerzo"

Rápido. AlphaGo y robótica. No entres en detalles de MDP.

### "Y además: IA generativa"

Aclara la confusión más común del momento: **ChatGPT no es un cuarto paradigma
mágico**, es entrenamiento no supervisado a gran escala más ajuste posterior.

### "Resumen de paradigmas"

**Pregunta para discutir (5 min):**

> **Tienen 50 000 fotos de productos de una tienda, de las cuales 300 están
> etiquetadas con su categoría. ¿Qué paradigma usarían y por qué?**

*Hacia dónde llevarla:* semisupervisado es la respuesta "de libro". Pero deja
que argumenten: también es defendible etiquetar más y hacer supervisado puro,
o hacer clustering primero para ver qué estructura hay. **Premia el
razonamiento sobre el coste de etiquetar**, no la respuesta correcta.

---

## Bloque 4 · Tipos de tarea (22 min)

Estructura repetida: **primero la definición, luego la imagen real**. Aprovecha
ese ritmo — no adelantes la imagen.

### "Las tres tareas más comunes"

Vista general con el esquema dibujado.

### "Clasificación" → "Clasificación: cómo se ve de verdad"

Al pasar a la imagen de scikit-learn, señala:

- Cada columna es un algoritmo distinto **sobre los mismos datos**.
- Cada fila es un conjunto de datos distinto.
- El número de la esquina es la exactitud.
- Lo importante: **las fronteras son radicalmente distintas** y varias aciertan
  parecido. No hay una única forma correcta de separar.

Fíjate en Linear SVM en la fila del medio (0.40): un modelo lineal no puede
separar datos concéntricos. Es un anticipo natural de por qué existen los
núcleos.

### "Regresión" → "Regresión: cómo se ve de verdad"

En la imagen del consumo eléctrico, señala que hay dos modelos: uno demasiado
suave (naranja, `max_iter=5`) y otro que sigue el detalle (verde). Conecta con
la pregunta del sobreajuste del bloque 2.

### "Clustering y otras tareas no supervisadas" → "Clustering: cómo se ve de verdad"

En la imagen, la primera fila (círculos concéntricos) es el mejor ejemplo:
k-means falla y DBSCAN acierta. Mensaje: **no existe el algoritmo
universalmente mejor**. Es el teorema "no free lunch" en versión visual.

### "Un mismo algoritmo, varias tareas"

**Pregunta para discutir (3 min, opcional si va justo de tiempo):**

> **¿Por qué creen que la regresión logística, pese a llamarse "regresión",
> se usa para clasificar?**

*Hacia dónde llevarla:* porque internamente **sí predice un número continuo**
—una probabilidad entre 0 y 1— y luego se aplica un umbral para decidir la
clase. Es un buen ejemplo de que la frontera entre tareas es más porosa de lo
que sugieren los nombres. No entres en la función logística.

---

## Bloque 5 · Aplicaciones (10 min)

### "Vehículos autónomos"

Video propio. Introdúcelo con contexto de dónde y cuándo lo grabaste — el
material propio genera más atención que un ejemplo de catálogo.

> **Comprueba antes de clase que hay conexión a internet**: el video está
> embebido desde YouTube y no funciona sin red. Si el aula no tiene wifi
> fiable, descárgalo antes y cámbialo por un archivo local.

### "Predicción del clima"

La figura de la OMM. El mensaje clave: los paneles (b) y (c) son el mismo
modelo físico, pero (c) está **corregido con datos históricos**. Esa corrección
es un problema de regresión. Conecta con el ejemplo de la lluvia del bloque 2.

### "Tiempo de ruta"

La captura de Google Maps. Cada número de minutos que ven en el teléfono es la
salida de un regresor. Es el ejemplo más cercano a su vida diaria.

### "Y muchas más" y "¿Cuándo tiene sentido usar ML?"

**Pregunta para discutir (4 min):**

> **Calcular el IVA de una factura, ¿es un problema de machine learning?
> ¿Y detectar facturas fraudulentas?**

*Hacia dónde llevarla:* el IVA es una fórmula fija y conocida — usar ML sería
absurdo, más caro y menos fiable. El fraude no tiene fórmula, cambia con el
tiempo y sí hay datos históricos: ahí el ML tiene sentido. Es la mejor forma de
cerrar el criterio de "cuándo sí y cuándo no".

---

## Bloque 6 · Cierre (4 min)

### "Nuestro recorrido" y "Modelos de regresión en scikit-learn"

La diapositiva de las nueve familias de modelos suele producir cierto vértigo.
Úsalo a favor: **no van a ver todas**, pero es importante que sepan que la
regresión lineal es la puerta de entrada a un catálogo grande.

### "Para cerrar"

Los cinco puntos, rápido.

**Tarea de cierre (pídela explícitamente):**

> **Piensen en un problema de su carrera o su trabajo. ¿De qué tipo sería:
> clasificación, regresión o clustering? Lo retomamos al inicio de la próxima
> sesión.**

Es el mejor enganche para arrancar la sesión 2 y te da un diagnóstico gratis de
qué entendieron.

---

## Preguntas que suelen aparecer

**"¿Esto es lo mismo que ChatGPT?"**
No. ChatGPT es un modelo generativo de lenguaje, entrenado con un enfoque no
supervisado a escala masiva y afinado después. Comparte los fundamentos, pero
en este curso trabajarán con modelos mucho más pequeños e interpretables.

**"¿Cuántos datos necesito?"**
Depende del número de variables y del ruido. Respuesta honesta hoy: no hay una
cifra mágica; lo verán al hablar de curvas de aprendizaje.

**"¿Necesito saber mucha matemática?"**
Para usar scikit-learn, no. Para entender qué falla cuando falla, sí ayuda.
El curso irá dosificando.

**"¿El modelo puede estar sesgado?"**
Sí, y hereda los sesgos de los datos. No es tema de hoy, pero reconoce la
pregunta y anota que la retomarán al hablar de evaluación.

---

## Antes de entrar al aula

- [ ] Renderizar la presentación: `quarto render introduccion.qmd`
- [ ] Comprobar que el video de YouTube carga con la red del aula
- [ ] Verificar que las cinco imágenes de `imgs/` se ven completas en pantalla
- [ ] Probar la pizarra (tecla `B`) y el modo presentador (tecla `S`)
- [ ] Tener a mano la pregunta de cierre para dejarla como tarea
