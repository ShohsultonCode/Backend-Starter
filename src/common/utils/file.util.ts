export const convertMbtoBytes = (mb: number) => {
  return mb * 1024 * 1024;
};

export const convertKbtoBytes = (kb: number) => {
  return kb * 1024;
};

export const convertBytestoMb = (bytes: number) => {
  return bytes / (1024 * 1024);
};

export const convertBytestoKb = (bytes: number) => {
  return bytes / 1024;
};
