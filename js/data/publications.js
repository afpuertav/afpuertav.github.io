/* ============================================================
   Datos de publicaciones.
   Para añadir una nueva, copia un bloque y ponlo al principio.
   ============================================================ */
window.AFP_DATA = window.AFP_DATA || {};

window.AFP_DATA.publications = [
  {
    date: null,
    statusKey: "publications.status.working",
    link: null,
    tags: ["CAD", "Information theory", "Machine learning"],
    title: {
      es: "Quantifying Complexity and Quality in History-Based Parametric CAD Models through Information Theory and Machine Learning",
      en: "Quantifying Complexity and Quality in History-Based Parametric CAD Models through Information Theory and Machine Learning"
    },
    excerpt: {
      es: "Los modelos CAD paramétricos basados en historial codifican no solo la geometría, sino también la secuencia y la lógica de las operaciones que definen la estructura de un producto. Cuantificar su complejidad sigue siendo un reto fundamental para la robustez, la reutilización y la automatización del diseño. Este estudio propone un flujo reproducible que integra métricas geométricas, estructurales y de teoría de la información para evaluar objetivamente la complejidad y la calidad de los modelos CAD. La teoría de la información de Shannon aporta el soporte conceptual del marco y permite cuantificar el desorden estructural mediante medidas de entropía. Se analizaron 381 modelos de SolidWorks combinando estadística descriptiva, reducción de dimensionalidad y agrupamiento no supervisado para derivar etiquetas latentes de complejidad, usadas luego para entrenar modelos supervisados de clasificación y regresión. Los resultados muestran que los descriptores basados en entropía, en particular la entropía de Wang, superan a las métricas geométricas al predecir la complejidad del modelo. Además, se observó de forma consistente una relación negativa entre entropía y calidad del modelo (medida por la tasa de regeneración exitosa), lo que confirma que el desorden estructural reduce la robustez y la reutilización. Los hallazgos validan la entropía como indicador universal de complejidad en modelos CAD paramétricos.",
      en: "History-based parametric computer-aided design (CAD) models encode not only geometry but also the sequence and logic of operations that define a product’s structure. Understanding and quantifying the complexity of these models remains a fundamental challenge for design robustness, reuse, and automation. This study proposes a reproducible pipeline that integrates geometric, structural, and information-theoretic metrics to objectively evaluate the complexity and quality of CAD models. Shannon’s Information Theory provides the conceptual backbone of the framework, allowing structural disorder to be quantified through entropy-based measures. A dataset of 381 SolidWorks models was analyzed using a combination of descriptive statistics, dimensionality reduction, and unsupervised clustering to derive latent complexity labels, which were subsequently used to train supervised classification and regression models. Results show that entropy-based descriptors, particularly Wang entropy, outperform geometric metrics in predicting model complexity. Moreover, a negative relationship between entropy and model quality (measured through regeneration success ratio) was consistently observed, confirming that structural disorder reduces robustness and reusability. The findings validate entropy as a universal indicator of complexity in parametric CAD models and provide a generalizable framework for their assessment."
    }
  }
];
