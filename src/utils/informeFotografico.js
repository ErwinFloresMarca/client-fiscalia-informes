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
      return group.fotos.find(f => fid === f.id);
    });
  }
  return group;
};

export const orderGroupsAndFotos = (IF) => {
  if (IF.grupos) {
    IF.grupos = IF.ordenGrupos.map(gid => {
      return orderFotos(IF.grupos.find(g => gid === g.id));
    });
  }
  return IF;
};
