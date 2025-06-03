import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { z } from "zod";
import Select from "react-select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "./Badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { categories } from "@/data/categories";
import { shoppingItemSchema } from "@/lib/validations/shopping-item";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React from "react";

type FormData = z.infer<typeof shoppingItemSchema>;

interface AddItemFormProps {
  onAdd: (item: FormData) => void;
}

const categoryOptions = categories.map((cat) => ({
  value: cat.name,
  label: (
    <Badge
      category={cat.name}
      color={cn(
        "bg-opacity-10 text-opacity-90",
        cat.bgColor,
        cat.textColor
      )}
    />
  ),
}));

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: {
      name: "",
      quantity: undefined,
      category: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.name || !data.quantity || !data.category) {
        throw new Error("Todos os campos são obrigatórios");
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      
      onAdd(data);
      
      form.resetField("name");
      form.resetField("quantity");
      form.resetField("category");
      
      form.setValue("category", "");
      
      toast({
        title: "Item adicionado",
        description: `${data.name} foi adicionado à sua lista.`,
      });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível adicionar o item. Tente novamente.",
      });
    }
  };

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Nome do item"
                    {...field}
                    className="bg-white/50 md:bg-white border-red-100 focus:border-red-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="number"
                      min="1"
                      placeholder="Quantidade..."
                      className="bg-white/50 md:bg-white border-red-100 focus:border-red-500"
                      {...field}
                      onChange={(e) => {
                        try {
                          const value = e.target.value;
                          onChange(value === "" ? undefined : Number(value));
                        } catch (error) {
                          console.error("Erro ao atualizar quantidade:", error);
                        }
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={categoryOptions.find(option => option.value === field.value) || null}
                      onChange={(newValue) => field.onChange(newValue?.value || "")}
                      options={categoryOptions}
                      placeholder="Categoria"
                      className="bg-white/50 md:bg-white"
                      isClearable={true}
                      classNames={{
                        control: (state) => 
                          cn(
                            "!min-h-9 !bg-transparent border !border-red-100 !rounded-md",
                            state.isFocused && "!border-red-500 !shadow-none"
                          ),
                        placeholder: () => "text-muted-foreground",
                        input: () => "text-sm",
                        option: () => "text-sm",
                      }}
                      styles={{
                        menu: (base) => ({
                          ...base,
                          maxHeight: 'none', 
                          overflow: 'hidden', 
                        }),
                        menuList: (base) => ({
                          ...base,
                          maxHeight: 'none', 
                          overflow: 'hidden', 
                        }),
                      }}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: "rgb(239 68 68)", 
                          primary25: "rgb(254 242 242)", 
                          primary50: "rgb(254 226 226)", 
                          primary75: "rgb(252 165 165)", 
                        },
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>

        <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
      </form>
    </Form>
  );
}
