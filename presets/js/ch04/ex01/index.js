// (a+bi)+(c+di)=(a+c)+(b+d)i
export function add(
  { realPart1, imaginaryPart1 },
  { realPart2, imaginaryPart2 }
) {
  return {
    realPart: realPart1 + realPart2,
    imaginaryPart: imaginaryPart1 + imaginaryPart2,
  };
}

// (a+bi)−(c+di)=(a−c)+(b−d)i
export function sub(
  { realPart1, imaginaryPart1 },
  { realPart2, imaginaryPart2 }
) {
  return {
    realPart: realPart1 - realPart2,
    imaginaryPart: imaginaryPart1 - imaginaryPart2,
  };
}

// (a+bi)(c+di)=ac+adi+bci+bdi2=(ac−bd)+(ad+bc)i
export function mul(
  { realPart1, imaginaryPart1 },
  { realPart2, imaginaryPart2 }
) {
  return {
    realPart: realPart1 * realPart2 - imaginaryPart1 * imaginaryPart2,
    imaginaryPart: realPart1 * imaginaryPart2 + imaginaryPart1 * realPart2,
  };
}

// (a+bi)/(c+di)=((a+bi)(c−di))/((c+di)(c−di))=((ac+bd)+(bc−ad)i)/(c2+d2)
export function div(
  { realPart1, imaginaryPart1 },
  { realPart2, imaginaryPart2 }
) {
  const denominator = Math.pow(realPart2, 2) + Math.pow(imaginaryPart2, 2);
  return {
    realPart:
      (realPart1 * realPart2 + imaginaryPart1 * imaginaryPart2) / denominator,
    imaginaryPart:
      (imaginaryPart1 * realPart2 - realPart1 * imaginaryPart2) / denominator,
  };
}
