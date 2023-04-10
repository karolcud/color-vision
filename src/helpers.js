import colorMap from "./colorMap";

const dist3d = ([x1, y1, z1], [x2, y2, z2]) => {
  return Math.sqrt(
    (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2)
  );
};

const findClosest = selectedColor => {
  let minimumDist = dist3d(selectedColor, colorMap[0].rgb);
  let bestColor = colorMap[0];

  colorMap.slice(1).forEach(color => {
    const dist = dist3d(selectedColor, color.rgb);

    if (dist < minimumDist) {
      minimumDist = dist;
      bestColor = color;
    }
  });

  return bestColor.name;
};

export { dist3d, findClosest };
