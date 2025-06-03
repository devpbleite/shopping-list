import { z } from "zod";

export const shoppingItemSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  quantity: z
    .number({
      required_error: "Digite a quantidade",
      invalid_type_error: "Digite a quantidade",
    })
    .min(1, "Quantidade deve ser pelo menos 1")
    .max(999, "Quantidade deve ser no máximo 999"),
  category: z.string().min(1, "Selecione uma categoria"),
});
