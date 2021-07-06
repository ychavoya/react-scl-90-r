import puntosT from "../data/puntosT";
import dimensiones from "../data/dimensiones.json";

const edadAdulto = 20;

const calcularTDimensiones = (clase, promediosDim) => {
  let puntos = puntosT[clase];

  let ptsT = [];
  promediosDim.forEach((prom, idx) => {
    ptsT[idx] = 12;

    for (let looker = 0; looker < 12; looker++) {
      if (prom < puntos[idx][looker]) {
        ptsT[idx] = looker;
        break;
      }
    }

    ptsT[idx] = ajustarT(ptsT[idx]);
  });

  return ptsT;
};

const calcularTIndices = (clase, promedioIGS, totalTSP, totalIMSP) => {
  let puntos = puntosT[clase];

  let ptsT = {
    igs: 12,
    tsp: 12,
    imsp: 12,
  };

  for (let looker = 0; looker < 12; looker++) {
    if (promedioIGS < puntos[10][looker]) {
      ptsT.igs = looker;
      break;
    }
  }

  for (let looker = 0; looker < 12; looker++) {
    if (totalTSP < puntos[11][looker]) {
      ptsT.tsp = looker;
      break;
    }
  }

  for (let looker = 0; looker < 12; looker++) {
    if (totalIMSP < puntos[12][looker]) {
      ptsT.imsp = looker;
      break;
    }
  }

  ptsT.igs = ajustarT(ptsT.igs);
  ptsT.tsp = ajustarT(ptsT.tsp);
  ptsT.imsp = ajustarT(ptsT.imsp);

  return ptsT;
};

const ajustarT = (ptst) => {
  if (ptst < 7) return 30 + ptst * 5;
  if (ptst === 7) return 63;
  return 25 + ptst * 5;
};

const calculator = (respuestas, edad, sexo) => {
  if (!respuestas) {
    return null;
  }

  let totalesDim = [];
  let numItems = [];
  let totalTSP = 0;

  dimensiones.forEach((dim, idx) => {
    totalesDim[idx] = 0;
    dim.items.forEach((preg) => {
      totalesDim[idx] += respuestas[preg];
      if (respuestas[preg] !== 0) totalTSP++;
    });
    numItems[idx] = dim.items.length;
  });

  let totalIGS = 0;
  totalesDim.forEach((total) => (totalIGS += total));

  let totalIMSP = totalTSP !== 0 ? totalIGS / totalTSP : 0;

  let promediosDim = [];
  totalesDim.forEach((total, idx) => {
    promediosDim[idx] = total / numItems[idx];
  });
  let promedioIGS = totalIGS / 90;

  let clase = sexo === "M" ? (edad < edadAdulto ? 0 : 1) : edad < edadAdulto ? 2 : 3;

  let ptsTD = calcularTDimensiones(clase, promediosDim, promedioIGS);
  let ptsTI = calcularTIndices(clase, promedioIGS, totalTSP, totalIMSP);

  return {
    t: {
      dim: ptsTD,
      idx: ptsTI,
    },
    avg: {
      dim: promediosDim,
      igs: promedioIGS,
    },
    total: {
      dim: totalesDim,
      idx: {
        igs: totalIGS,
        tsp: totalTSP,
        imsp: totalIMSP,
      },
    },
    edad,
    sexo,
  };
};
export default calculator;
