export const getAllFotosOfInformeFotografico = (IF) => {
  let fotos = [];
  if (IF.grupos) {
    IF.grupos.forEach(g => {
      fotos = [...fotos, ...g.fotos];
    });
  }
  return fotos;
};

export const filterNoUsedFiles = (fotos, IF) => {
  const usedFotos = getAllFotosOfInformeFotografico(IF).map(f => f.urlFoto);
  return fotos.filter(f => !usedFotos.includes(f.urlFoto));
};

export const orderFotos = (group) => {
  if (group) {
    group.fotos = group.ordenFotos.map(fid => {
      const fto = group.fotos.find(f => fid === f.id);
      fto.defaultWidth = group.fotoWidth || group.defaultWidth;
      fto.defaultHeight = group.fotoHeight || group.defaultHeight;
      return fto;
    });
  }
  return group;
};

export const orderGroupsAndFotos = (IF) => {
  if (IF.grupos) {
    IF.grupos = IF.ordenGrupos.map(gid => {
      const gr = IF.grupos.find(g => gid === g.id);
      gr.defaultWidth = IF.fotoWidth;
      gr.defaultHeight = IF.fotoHeight;
      return orderFotos(gr);
    });
  }
  return IF;
};
