// Sprite positions for plant families
// The plant_family_sprite.webp is 2816px × 10000px (4 columns × 13 rows approx)
// Each cell is 704px × 768px
// Scaled to 88px icons: backgroundSize is 352px × 1250px, each cell is 88px × 96px

export interface PlantFamilySpritePosition {
  x: number;
  y: number;
}

export const PLANT_FAMILY_SPRITES: Record<string, PlantFamilySpritePosition> = {
  Poaceae: { x: -4, y: -8 }, // Row 1, Col 1
  Fabaceae: { x: -89, y: -8 }, // Row 1, Col 2
  Brassicaceae: { x: -175, y: -8 }, // Row 1, Col 3
  Rosaceae: { x: -260, y: -8 }, // Row 1, Col 4
  Asteraceae: { x: -4, y: -99 }, // Row 2, Col 1
  Apiaceae: { x: -89, y: -99 }, // Row 2, Col 2
  Lamiaceae: { x: -175, y: -99 }, // Row 2, Col 3
  Violaceae: { x: -260, y: -99 }, // Row 2, Col 4
  Salicaceae: { x: -4, y: -200 }, // Row 3, Col 1
  Rutaceae: { x: -89, y: -200 }, // Row 3, Col 2
  Polygalaceae: { x: -175, y: -200 }, // Row 3, Col 3
  Linaceae: { x: -260, y: -200 }, // Row 3, Col 4
  Urticaceae: { x: -4, y: -291 }, // Row 4, Col 1
  Polygonaceae: { x: -89, y: -291 }, // Row 4, Col 2
  Malvaceae: { x: -175, y: -291 }, // Row 4, Col 3
  Ericaceae: { x: -260, y: -291 }, // Row 4, Col 4
  Rhamnaceae: { x: -4, y: -392 }, // Row 5, Col 1
  Geraniaceae: { x: -89, y: -392 }, // Row 5, Col 2
  Plantaginaceae: { x: -175, y: -392 }, // Row 5, Col 3
  Scrophulariaceae: { x: -260, y: -392 }, // Row 5, Col 4
  Cistaceae: { x: -4, y: -483 }, // Row 6, Col 1
  Apocynaceae: { x: -89, y: -483 }, // Row 6, Col 2
  Aristolochiaceae: { x: -175, y: -483 }, // Row 6, Col 3
  Caprifoliaceae: { x: -260, y: -483 }, // Row 6, Col 4
  // Final Corrected mapping (Step 234 - including Fagaceae)
  // Row 8
  Amaranthaceae: { x: -4, y: -678 }, // Row 8, Col 1
  Asclepiadaceae: { x: -89, y: -678 }, // Row 8, Col 2
  Betulaceae: { x: -175, y: -678 }, // Row 8, Col 3
  Boraginaceae: { x: -260, y: -678 }, // Row 8, Col 4

  // Row 9
  Cannabaceae: { x: -4, y: -769 }, // Row 9, Col 1
  Chenopodiaceae: { x: -89, y: -769 }, // Row 9, Col 2
  Coriariaceae: { x: -175, y: -769 }, // Row 9, Col 3
  Cyperaceae: { x: -260, y: -769 }, // Row 9, Col 4

  // Row 10
  Dipsacaceae: { x: -4, y: -866 }, // Row 10, Col 1
  Fagaceae: { x: -89, y: -866 }, // Row 10, Col 2
  Gentianaceae: { x: -175, y: -866 }, // Row 10, Col 3
  Lythraceae: { x: -260, y: -866 }, // Row 10, Col 4

  // Row 11
  Oleaceae: { x: -4, y: -957 }, // Row 11, Col 1
  Plumbaginaceae: { x: -89, y: -957 }, // Row 11, Col 2
  Primulaceae: { x: -175, y: -957 }, // Row 11, Col 3
  Resedaceae: { x: -260, y: -957 }, // Row 11, Col 4

  // Row 12
  // R12C1: Lythraceae (Repeated) -4, -1057
  // R12C2: Oleaceae (Repeated) -89, -1057
  // R12C3: Plumbaginaceae (Repeated) -175, -1057
  // R12C4: Primulaceae (Repeated) -260, -1057

  // Row 13
  // R13C1: Resedaceae (Repeated) -4, -1153
  Santalaceae: { x: -89, y: -1142 }, // Row 13, Col 2
  Solanaceae: { x: -175, y: -1142 }, // Row 13, Col 3
  Ulmaceae: { x: -260, y: -1142 }, // Row 13, Col 4
};

// Common names for plant families (Portuguese)
export const PLANT_FAMILY_COMMON_NAMES: Record<string, string> = {
  Poaceae: "Gramíneas",
  Fabaceae: "Leguminosas",
  Brassicaceae: "Crucíferas",
  Rosaceae: "Rosáceas",
  Asteraceae: "Compostas",
  Apiaceae: "Umbelíferas",
  Lamiaceae: "Labiadas",
  Violaceae: "Violetas",
  Salicaceae: "Salgueiros",
  Fagaceae: "Fagáceas",
  Betulaceae: "Betuláceas",
  Ulmaceae: "Ulmáceas",
  Urticaceae: "Urticáceas",
  Polygonaceae: "Poligonáceas",
  Malvaceae: "Malváceas",
  Ericaceae: "Ericáceas",
  Rhamnaceae: "Ramnáceas",
  Geraniaceae: "Geraniáceas",
  Plantaginaceae: "Plantagináceas",
  Scrophulariaceae: "Escrofulariáceas",
  Cistaceae: "Cistáceas",
  Apocynaceae: "Apocináceas",
  Aristolochiaceae: "Aristoloquiáceas",
  Caprifoliaceae: "Caprifoliáceas",
  Lauraceae: "Lauráceas",
  Amaranthaceae: "Amarantáceas",
  Asclepiadaceae: "Asclepiadáceas",
  Boraginaceae: "Boragináceas",
  Cannabaceae: "Canabáceas",
  Chenopodiaceae: "Quenopodiáceas",
  Coriariaceae: "Coriariáceas",
  Cyperaceae: "Ciperáceas",
  Dipsacaceae: "Dipsacáceas",
  Gentianaceae: "Gencianáceas",
  Lythraceae: "Litráceas",
  Oleaceae: "Oleáceas",
  Plumbaginaceae: "Plumbagináceas",
  Primulaceae: "Primuláceas",
  Resedaceae: "Resedáceas",
  Santalaceae: "Santaláceas",
  Solanaceae: "Solanáceas",
};

// Get sprite position for a plant family
export function getPlantFamilySpritePosition(
  family: string,
): PlantFamilySpritePosition | null {
  return PLANT_FAMILY_SPRITES[family] || null;
}

// Get common name for a plant family
export function getPlantFamilyCommonName(family: string): string | undefined {
  return PLANT_FAMILY_COMMON_NAMES[family];
}
