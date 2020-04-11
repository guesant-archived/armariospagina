const toNumb = n => Number(n);

export const fxLabels = {
  "Transparência": { "opacity": "Opacidade" },
  "Desfoque": { "blur": "Simples", "gaussian": "Gausiano (lento)" },
  "Tamanho": { "resize": "Esticar", "contain": "Caber", "cover": "Preencher" },
  "Corte": { "crop": "Cortar", "autocrop": "Auto-corte" },
  "Cor": { "brightness": "Brilho", "contrast": "Contraste", "greyscale": "Preto e Branco", "invert": "Inverter", "normalize": "Normalizar" }
};

export const fxParams = {
  "brightness": [["val", toNumb]], "contrast": [["val", toNumb]], "greyscale": [], "invert": [], "normalize": [], "resize": [["w", toNumb], ["h", toNumb]], "contain": [["w", toNumb], ["h", toNumb]], "cover": [["w", toNumb], ["h", toNumb]], "crop": [["x", toNumb], ["y", toNumb], ["w", toNumb], ["h", toNumb]], "opacity": [["f", toNumb]], "blur": [["r", toNumb]]
}
