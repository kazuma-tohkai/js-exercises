export function detectFileType(data) {
  // PDF 25 50 44 46 2D
  const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (data.byteLength >= pdf.byteLength) {
    for (let i = 0; i < pdf.byteLength; i++) {
      if (!(data[i] === pdf[i])) break;
      if (i === pdf.byteLength - 1) return "PDF";
    }
  }

  // ZIP 50 4B 03 04
  // ZIP 50 4B 05 06
  // ZIP 50 4B 07 08
  const zip1 = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);
  const zip2 = new Uint8Array([0x50, 0x4b, 0x05, 0x06]);
  const zip3 = new Uint8Array([0x50, 0x4b, 0x07, 0x08]);
  if (data.byteLength >= zip1.byteLength) {
    for (let i = 0; i < zip1.byteLength; i++) {
      if (!(data[i] === zip1[i])) break;
      if (i === zip1.byteLength - 1) return "ZIP";
    }
    for (let i = 0; i < zip2.byteLength; i++) {
      if (!(data[i] === zip2[i])) break;
      if (i === zip2.byteLength - 1) return "ZIP";
    }
    for (let i = 0; i < zip3.byteLength; i++) {
      if (!(data[i] === zip3[i])) break;
      if (i === zip3.byteLength - 1) return "ZIP";
    }
  }

  // GIF 47 49 46 38 37 61
  // GIF 47 49 46 38 39 61
  const gif1 = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61]);
  const gif2 = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
  if (data.byteLength >= gif1.byteLength) {
    for (let i = 0; i < gif1.byteLength; i++) {
      if (!(data[i] === gif1[i])) break;
      if (i === gif1.byteLength - 1) return "GIF";
    }
    for (let i = 0; i < gif2.byteLength; i++) {
      if (!(data[i] === gif2[i])) break;
      if (i === gif2.byteLength - 1) return "GIF";
    }
  }

  // PNG 89 50 4E 47 0D 0A 1A 0A
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (data.byteLength >= png.byteLength) {
    for (let i = 0; i < png.byteLength; i++) {
      if (!(data[i] === png[i])) break;
      if (i === png.byteLength - 1) return "PNG";
    }
  }
  return "UNKNOWN";
}
