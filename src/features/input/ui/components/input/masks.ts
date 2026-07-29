export const MASKS = {
  CPF: {
    mask: "000.000.000-00",
  },
  CNPJ: {
    mask: "00.000.000/0000-00",
  },
  TELEFONE: {
    mask: "(00) 00000-0000",
  },
  CEP: {
    mask: "00000-000",
  },
} as const;

export type MaskType = keyof typeof MASKS;
