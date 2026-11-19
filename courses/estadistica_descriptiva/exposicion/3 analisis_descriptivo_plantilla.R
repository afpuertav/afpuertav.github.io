# ======================================================================
# PLANTILLA: comparar dos alternativas con estadística descriptiva
# Estadística descriptiva - UNIMINUTO - Exposición final de la Unidad 3
# ======================================================================
# Sirve para un archivo (Excel o CSV) con las DOS alternativas juntas y una
# columna que indica a cuál pertenece cada fila.
#
# CÓMO USARLO (detalle en el "archivo 4, Instructivo del código de R"):
#   1. Suba el archivo de datos a su proyecto de Posit Cloud (panel Files > Upload).
#   2. Cambie SOLO la sección 1 (parámetros): reemplace todo lo que dice
#      "CAMBIAR" con la información de sus datos.
#   3. Corra el script de arriba hacia abajo: Ctrl + Enter línea por línea,
#      o el botón Source para correr todo.
#   4. Lea los resultados en la consola, los gráficos en el panel Plots y los
#      archivos generados en el panel Files.

# 0. PAQUETES ----------------------------------------------------------
# readxl solo se usa para leer archivos Excel; todo lo demás es R base.
if (!requireNamespace("readxl", quietly = TRUE)) install.packages("readxl")
library(readxl)

# 1. PARÁMETROS: lo único que ustedes cambian ----------------------------
archivo         <- "CAMBIAR_nombre_del_archivo.xlsx"  # nombre exacto, con extensión (.xlsx o .csv)
hoja            <- 1                                  # CAMBIAR si es Excel: número o nombre de la hoja con los datos
col_grupo       <- "CAMBIAR_columna_de_la_alternativa" # columna que dice si la fila es de A o de B
col_variable    <- "CAMBIAR_variable_principal"       # columna numérica que se compara
nombre_variable <- "CAMBIAR nombre y unidad"          # texto para ejes y títulos, ej. "Nota del parcial (puntos)"
min_valido      <- NA                                 # CAMBIAR: valor mínimo posible (NA si no hay mínimo)
max_valido      <- NA                                 # CAMBIAR: valor máximo posible (NA si no hay máximo)
umbral          <- NA                                 # CAMBIAR: valor de corte que importa para la decisión (NA si no hay)
col_segmento    <- NA                                 # OPCIONAL: columna numérica para segmentar, entre comillas (NA para omitir)
corte_segmento  <- NA                                 # OPCIONAL: valor que separa los dos segmentos
colores         <- c("#6aa9e0", "#f2994a")            # un color por grupo (puede dejarlo así)

# Clases del histograma y de la tabla de frecuencias.
# NULL = el script las propone solo, con la regla de Sturges. Para fijarlas ustedes,
# escriban números, por ejemplo: inicio <- 1; fin <- 5; ancho <- 0.5
inicio          <- NULL
fin             <- NULL
ancho           <- NULL

# 2. CARGAR Y EXPLORAR ---------------------------------------------------
if (grepl("\\.csv$", archivo, ignore.case = TRUE)) {
  datos <- read.csv(archivo, stringsAsFactors = FALSE, fileEncoding = "UTF-8")
  if (ncol(datos) == 1) datos <- read.csv2(archivo, stringsAsFactors = FALSE, fileEncoding = "UTF-8")  # CSV con ; y coma decimal
} else {
  datos <- as.data.frame(read_excel(archivo, sheet = hoja))
}
if (!col_grupo %in% names(datos) || !col_variable %in% names(datos)) {
  cat("Columnas disponibles:", paste(names(datos), collapse = ", "), "\n")
  stop("col_grupo o col_variable no coinciden con ninguna columna. Revise la sección 1.")
}
if (!is.numeric(datos[[col_variable]])) {
  # Texto con coma decimal ("3,5") o espacios: se convierte a número
  datos[[col_variable]] <- suppressWarnings(as.numeric(gsub(",", ".", trimws(as.character(datos[[col_variable]])), fixed = TRUE)))
}
if (all(is.na(datos[[col_variable]]))) stop("col_variable no contiene números. Revise que sea una columna numérica.")

dim(datos)                        # filas y columnas
str(datos)                        # tipo de cada columna
head(datos)                       # primeras filas
colSums(is.na(datos))             # datos faltantes por columna
table(datos[[col_grupo]], useNA = "ifany")  # cuántos hay en cada grupo (deben ser dos)
summary(datos[[col_variable]])    # primer vistazo: mire el mínimo y el máximo

# Valores imposibles en la variable principal
v0 <- datos[[col_variable]]
fuera <- !is.na(v0) & ((!is.na(min_valido) & v0 < min_valido) |
                       (!is.na(max_valido) & v0 > max_valido))
datos[fuera, ]                    # filas con valores fuera de rango

# 3. LIMPIEZA ------------------------------------------------------------
# Decisión: se excluyen los registros sin valor y los valores imposibles.
# Declare esta decisión (y su motivo) en el anexo de trazabilidad.
sin_valor <- is.na(v0)
limpio    <- datos[!sin_valor & !fuera & !is.na(datos[[col_grupo]]), ]
cat("Registros originales:", nrow(datos), "\n",
    "Sin valor:", sum(sin_valor), "\n",
    "Valores imposibles:", sum(fuera), "\n",
    "Registros analizados:", nrow(limpio), "\n")

# 4. SEPARAR LOS GRUPOS --------------------------------------------------
# split() filtra la columna del grupo y deja un vector por cada uno.
x <- split(limpio[[col_variable]], limpio[[col_grupo]])
if (length(x) != 2) stop("La columna del grupo debe tener exactamente 2 valores distintos.")
names(x)                          # el primero es el grupo A y el segundo el B
sapply(x, length)                 # n de cada grupo

# 5. TABLAS DE FRECUENCIA AGRUPADAS ---------------------------------------
n_max   <- max(sapply(x, length))
sturges <- ceiling(1 + 3.322 * log10(n_max))
todos   <- unlist(x)
if (is.null(inicio) || is.null(fin) || is.null(ancho)) {
  clases <- pretty(range(todos), n = sturges)          # límites "redondos" cerca de Sturges
  if (max(todos) >= max(clases)) clases <- c(clases, max(clases) + diff(clases)[1])
} else {
  clases <- seq(inicio, fin, by = ancho)
}
clases <- round(clases, 10)
k     <- length(clases) - 1
ancho <- clases[2] - clases[1]
inicio <- clases[1]; fin <- clases[k + 1]
cat("Regla de Sturges (grupo más grande):", sturges, "clases\n")
cat("Clases usadas:", k, "de ancho", ancho, "entre", inicio, "y", fin, "\n")
# Cualquier número cercano al de Sturges sirve si lo justifican en el anexo.

tabla_frec <- function(v) {
  fi <- as.vector(table(cut(v, breaks = clases, right = FALSE, include.lowest = TRUE)))
  if (sum(fi) != length(v)) stop("Hay datos fuera de las clases: revise inicio, fin y ancho")
  Fi <- cumsum(fi)
  etiqueta <- paste0("[", head(clases, -1), "; ", tail(clases, -1), c(rep(")", k - 1), "]"))
  data.frame(clase = etiqueta, xi = head(clases, -1) + ancho / 2, fi = fi, Fi = Fi,
             hi = round(fi / length(v) * 100, 1), Hi = round(Fi / length(v) * 100, 1))
}
tablas <- lapply(x, tabla_frec)
tablas                            # una tabla por grupo (hi y Hi en %)

# 6. MEDIDAS: FICHA ESTADÍSTICA COMPARATIVA -----------------------------
# Datos crudos: var() y sd() dividen entre n - 1 (muestra).
moda_agrupada <- function(v) {
  fi <- as.vector(table(cut(v, breaks = clases, right = FALSE, include.lowest = TRUE)))
  modas <- c()
  for (i in 1:k) {
    ant <- if (i > 1) fi[i - 1] else 0
    sig <- if (i < k) fi[i + 1] else 0
    if (fi[i] > ant && fi[i] >= sig) {          # pico de la distribución
      d1 <- fi[i] - ant
      d2 <- fi[i] - sig
      modas <- c(modas, clases[i] + d1 / (d1 + d2) * ancho)
    }
  }
  modas                           # dos valores = distribución bimodal
}

ficha <- function(v) {
  m  <- mean(v);  me <- median(v);  s <- sd(v)
  q  <- unname(quantile(v, c(0.25, 0.75)))
  ric <- q[2] - q[1]
  vallas <- c(q[1] - 1.5 * ric, q[2] + 1.5 * ric)
  c(n = length(v), media = m, mediana = me, Q1 = q[1], Q3 = q[2], RIC = ric,
    s = s, CV_pct = if (all(v >= 0) && m > 0) s / m * 100 else NA, As2 = 3 * (m - me) / s,
    curtosis_g2 = mean((v - m)^4) / mean((v - m)^2)^2 - 3,
    atipicos = sum(v < vallas[1] | v > vallas[2]),
    pct_bajo_umbral = if (is.na(umbral)) NA else mean(v < umbral) * 100)
}
# Redondeo según la magnitud de los datos (sirve para millones o para decimales pequeños)
dig <- max(0, 2 - floor(log10(sd(todos))))
redondear <- function(m) {
  m <- as.data.frame(m)
  unidades <- intersect(c("media", "mediana", "Q1", "Q3", "RIC", "s"), names(m))
  m[unidades] <- round(m[unidades], dig)
  m[setdiff(names(m), c("n", unidades))] <- round(m[setdiff(names(m), c("n", unidades))], 2)
  m
}
ficha_tabla <- redondear(t(sapply(x, ficha)))
ficha_tabla                       # una fila por grupo
# CV = NA significa que no tiene sentido: la variable tiene valores negativos o la media es cero o negativa.

lapply(x, function(v) round(moda_agrupada(v), dig + 1))   # modas (fórmula de datos agrupados)

# 7. CASOS EXTREMOS -------------------------------------------------------
# Valores fuera de las vallas Q1 - 1,5 RIC y Q3 + 1,5 RIC
atipicos <- lapply(x, function(v) {
  q <- unname(quantile(v, c(0.25, 0.75))); ric <- q[2] - q[1]
  sort(v[v < q[1] - 1.5 * ric | v > q[2] + 1.5 * ric])
})
atipicos

# 8. GRÁFICOS ---------------------------------------------------------------
# Misma escala en todos los gráficos para que la comparación sea honesta.
ymax <- max(sapply(x, function(v) max(as.vector(table(cut(v, clases, right = FALSE, include.lowest = TRUE))))))
linea_umbral <- function() if (!is.na(umbral)) abline(v = umbral, col = "red", lwd = 2, lty = 3)

dibujar_histogramas <- function() {
  par(mfrow = c(1, 2))
  for (i in seq_along(x)) {
    hist(x[[i]], breaks = clases, right = FALSE, include.lowest = TRUE,
         ylim = c(0, ymax * 1.1), col = colores[i],
         main = names(x)[i], xlab = nombre_variable, ylab = "Frecuencia (fi)")
    abline(v = mean(x[[i]]),   lwd = 3)             # línea continua = media
    abline(v = median(x[[i]]), lwd = 3, lty = 2)    # línea discontinua = mediana
    linea_umbral()                                  # línea punteada roja = umbral
  }
}
dibujar_cajas <- function() {
  par(mfrow = c(1, 1))
  boxplot(x, horizontal = TRUE, col = colores, ylim = c(inicio, fin),
          xlab = nombre_variable, main = "Cajas paralelas")
  linea_umbral()
}
dibujar_ojivas <- function() {
  par(mfrow = c(1, 1))
  plot(NULL, xlim = c(inicio, fin), ylim = c(0, 100), xlab = nombre_variable,
       ylab = "Hi (%)", main = "Ojivas")
  for (i in seq_along(x)) {
    lines(clases, c(0, tablas[[i]]$Hi), type = "b", pch = 19, col = colores[i], lwd = 2)
  }
  linea_umbral()
  legend("topleft", legend = names(x), col = colores, lwd = 2, pch = 19, bty = "n")
}
dibujar_histogramas()             # 8.1 histogramas
dibujar_cajas()                   # 8.2 cajas paralelas
dibujar_ojivas()                  # 8.3 ojivas

# 9. SEGMENTO (opcional): ¿una tercera variable explica las diferencias? ---
if (!is.na(col_segmento) && !is.na(corte_segmento)) {
  con_seg <- limpio[!is.na(limpio[[col_segmento]]), ]   # se excluyen los que no tienen el dato
  con_seg$segmento <- ifelse(con_seg[[col_segmento]] < corte_segmento,
                             paste("menos de", corte_segmento),
                             paste(corte_segmento, "o más"))
  print(tapply(con_seg[[col_variable]], list(con_seg[[col_grupo]], con_seg$segmento), median))  # mediana por segmento
  print(table(con_seg[[col_grupo]], con_seg$segmento))                                          # n por segmento
} else cat("Sección 9 omitida: no se definió col_segmento y corte_segmento.\n")

# 10. ¿Y SI QUITAMOS LOS CASOS EXTREMOS? ---------------------------------------
sin_atip <- lapply(x, function(v) {
  q <- unname(quantile(v, c(0.25, 0.75))); ric <- q[2] - q[1]
  v[v >= q[1] - 1.5 * ric & v <= q[2] + 1.5 * ric]
})
redondear(t(sapply(sin_atip, function(v) c(n = length(v), media = mean(v), mediana = median(v),
                                           s = sd(v), CV_pct = if (all(v >= 0) && mean(v) > 0) sd(v) / mean(v) * 100 else NA))))

# 11. GUARDAR LOS RESULTADOS (aparecen en el panel Files) -------------------------
write.csv(limpio, "datos_limpios.csv", row.names = FALSE)
for (i in seq_along(tablas)) {
  write.csv(tablas[[i]], paste0("tabla_frecuencias_", i, ".csv"), row.names = FALSE)
}
write.csv(ficha_tabla, "ficha_comparativa.csv")

png("histogramas.png", width = 1800, height = 800, res = 150); dibujar_histogramas(); dev.off()
png("cajas_paralelas.png", width = 1800, height = 800, res = 150); dibujar_cajas(); dev.off()
png("ojivas.png", width = 1800, height = 800, res = 150); dibujar_ojivas(); dev.off()
cat("Listo. Revise el panel Files: datos_limpios.csv, tablas, ficha_comparativa.csv y los gráficos .png\n")
