export interface SizeTypeSpritePosition {
  x: number;
  y: number;
}

export const SIZE_TYPE_SPRITES: Record<string, SizeTypeSpritePosition> = {
  small: { x: -89, y: -99 }, // ROCHOSO/MONTANHA - Row 2, Col 2
  medium: { x: -174, y: -99 }, // COSTEIRO - Row 2, Col 3
  large: { x: -260, y: -99 }, // GENERALISTA - Row 2, Col 4
};

// Get sprite position for a size category
export function getSizeSpritePosition(
  sizeCategory: string,
): SizeTypeSpritePosition {
  return SIZE_TYPE_SPRITES[sizeCategory];
}
