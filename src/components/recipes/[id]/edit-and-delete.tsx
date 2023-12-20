"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "~/components/ui/button";
import { api } from "~/trpc/react";

type DialogContentProps = {
  recipeId: number;
};
function DialogContent({ recipeId }: DialogContentProps) {
  const router = useRouter();
  const deleteRecipeMutation = api.recipe.delete.useMutation();

  return (
    <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[52] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg ">
      <AlertDialog.Title className="mb-2 text-4xl font-semibold">
        Delete Recipe
      </AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to delete this recipe?
      </AlertDialog.Description>
      <div className="mt-4 flex justify-end gap-2">
        <AlertDialog.Cancel asChild>
          <Button variant="ghost">Cancel</Button>
        </AlertDialog.Cancel>
        <Button
          disabled={
            deleteRecipeMutation.isLoading || deleteRecipeMutation.isSuccess
          }
          className="bg-red-300"
          onClick={() => {
            deleteRecipeMutation.mutate(
              { recipeId },
              {
                onSuccess: () => {
                  setTimeout(() => {
                    router.push("/");
                  }, 1000);
                },
              },
            );
          }}
        >
          {deleteRecipeMutation.isLoading
            ? "Deleting..."
            : deleteRecipeMutation.isSuccess
              ? "Redirecting..."
              : "Delete"}
        </Button>
      </div>
    </AlertDialog.Content>
  );
}

type EditAndDeleteProps = {
  recipeId: number;
};
export default function EditAndDelete({ recipeId }: EditAndDeleteProps) {
  return (
    <div className="flex items-center gap-2">
      <p>manage your recipe: </p>
      <Link href={`/recipes/edit?recipeId=${recipeId}`}>
        <Button variant="ghost">
          <Pencil></Pencil>
        </Button>
      </Link>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="ghost">
            <Trash2 className="stroke-red-500"></Trash2>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-[51] bg-black/40 backdrop-blur-sm"></AlertDialog.Overlay>
          <DialogContent recipeId={recipeId}></DialogContent>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
