import { z } from "zod";
import { Loader2 } from "lucide-react";

import { CategoryForm } from "@/features/categories/components/category-form";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

import { insertCategorySchema } from "@/db/schema";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
  const { id, isOpen, onClose } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Category?",
    "This action cannot be undone.",
  );

  const categoryQuery = useGetCategory(id);
  const editCategoryMutation = useEditCategory(id);
  const deleteCategoryMutation = useDeleteCategory(id);

  const isPending =
    editCategoryMutation.isPending || deleteCategoryMutation.isPending;

  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editCategoryMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteCategoryMutation.mutate(undefined, { onSuccess: () => onClose() });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Update the category details to organize your transactions.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
