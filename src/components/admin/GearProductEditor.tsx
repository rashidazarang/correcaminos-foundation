import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Plus, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAdminGearProducts,
  useCreateGearProduct,
  useUpdateGearProduct,
  useDeleteGearProduct,
} from "@/hooks/useGearProducts";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type GearRow = Database["public"]["Tables"]["gear_products"]["Row"];

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-");
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  image_url: string;
  active: boolean;
  sort_order: number;
}

const emptyForm: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  active: true,
  sort_order: 0,
};

export function GearProductEditor() {
  const { data: products, isLoading } = useAdminGearProducts();
  const createProduct = useCreateGearProduct();
  const updateProduct = useUpdateGearProduct();
  const deleteProduct = useDeleteGearProduct();

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [slugManual, setSlugManual] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!slugManual && !editingId) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.name) }));
    }
  }, [form.name, slugManual, editingId]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSlugManual(false);
    setFormOpen(true);
  };

  const openEdit = (product: GearRow) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      image_url: product.image_url ?? "",
      active: product.active,
      sort_order: product.sort_order,
    });
    setSlugManual(true);
    setFormOpen(true);
  };

  const openDelete = (product: GearRow) => {
    setDeleteTarget({ id: product.id, name: product.name });
    setDeleteOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `gear/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("site-images")
        .upload(path, file);
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(path);

      setForm((prev) => ({ ...prev, image_url: urlData.publicUrl }));
      toast.success("Imagen subida");
    } catch {
      toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.description.trim()) {
      toast.error("Nombre y descripcion son requeridos");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("El slug no puede estar vacio");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        image_url: form.image_url.trim() || null,
        active: form.active,
        sort_order: form.sort_order,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, ...payload });
        toast.success("Producto actualizado");
      } else {
        await createProduct.mutateAsync(payload);
        toast.success("Producto creado");
      }
      setFormOpen(false);
    } catch (err: any) {
      if (err?.message?.includes("duplicate key") || err?.message?.includes("gear_products_slug_key")) {
        toast.error("Ya existe un producto con ese slug");
      } else {
        toast.error("Error al guardar producto");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      toast.success("Producto eliminado");
    } catch {
      toast.error("Error al eliminar producto");
    } finally {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Productos Gear</h2>
        <Button onClick={openCreate} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Nuevo Producto
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Cargando productos...</p>
      ) : !products?.length ? (
        <p className="text-muted-foreground">No hay productos todavia.</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center">Orden</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="h-10 w-10 object-cover rounded" />
                      ) : (
                        <div className="h-10 w-10 bg-gris-calzada/20 rounded flex items-center justify-center text-xs text-muted-foreground">—</div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium max-w-[250px] truncate">{product.name}</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${product.active ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {product.active ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{product.sort_order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(product)} aria-label="Editar">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDelete(product)} aria-label="Eliminar">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="h-10 w-10 object-cover rounded shrink-0" />
                    ) : (
                      <div className="h-10 w-10 bg-gris-calzada/20 rounded shrink-0" />
                    )}
                    <span className="font-medium truncate">{product.name}</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(product)} aria-label="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDelete(product)} aria-label="Eliminar">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${product.active ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {product.active ? "Activo" : "Inactivo"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Nombre *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre del producto"
              />
            </div>

            <div className="space-y-1">
              <Label>Slug *</Label>
              <Input
                value={form.slug}
                onChange={(e) => {
                  setSlugManual(true);
                  setForm((prev) => ({ ...prev, slug: e.target.value }));
                }}
                placeholder="url-friendly-slug"
              />
              <p className="text-xs text-muted-foreground">Se genera automaticamente del nombre</p>
            </div>

            <div className="space-y-1">
              <Label>Descripcion *</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Descripcion del producto..."
                rows={4}
              />
            </div>

            <div className="space-y-1">
              <Label>Imagen</Label>
              <div className="flex gap-2">
                <Input
                  value={form.image_url}
                  onChange={(e) => setForm((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="URL de imagen o sube un archivo"
                  className="flex-1"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                </Button>
              </div>
              {form.image_url && (
                <img src={form.image_url} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-md border" />
              )}
            </div>

            <div className="space-y-1">
              <Label>Orden</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="active"
                checked={form.active}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, active: !!checked }))}
              />
              <Label htmlFor="active" className="cursor-pointer">Activo</Label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setFormOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {editingId ? "Guardar Cambios" : "Crear Producto"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar producto</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estas seguro de eliminar "{deleteTarget?.name}"? Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
