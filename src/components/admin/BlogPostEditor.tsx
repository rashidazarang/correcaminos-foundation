import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Plus, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  useAdminBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from "@/hooks/useBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

const categories = [
  "Experiencias",
  "Guias",
  "Entrenamiento",
  "Rituales",
  "Viajes",
  "Nutricion",
  "General",
];

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

interface PostFormData {
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  cover_image_url: string;
  content: string;
  published: boolean;
}

const emptyForm: PostFormData = {
  title: "",
  slug: "",
  category: "General",
  author: "",
  excerpt: "",
  cover_image_url: "",
  content: "",
  published: false,
};

export function BlogPostEditor() {
  const { data: posts, isLoading } = useAdminBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PostFormData>(emptyForm);
  const [slugManual, setSlugManual] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && !editingId) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, slugManual, editingId]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSlugManual(false);
    setFormOpen(true);
  };

  const openEdit = (post: BlogPostRow) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      author: post.author,
      excerpt: post.excerpt ?? "",
      cover_image_url: post.cover_image_url ?? "",
      content: post.content,
      published: post.published,
    });
    setSlugManual(true);
    setFormOpen(true);
  };

  const openDelete = (post: BlogPostRow) => {
    setDeleteTarget({ id: post.id, title: post.title });
    setDeleteOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `blog/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("site-images")
        .upload(path, file);
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(path);

      setForm((prev) => ({ ...prev, cover_image_url: urlData.publicUrl }));
      toast.success("Imagen subida");
    } catch {
      toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim() || !form.author.trim()) {
      toast.error("Titulo, contenido y autor son requeridos");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("El slug no puede estar vacio");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category,
        author: form.author.trim(),
        excerpt: form.excerpt.trim() || null,
        cover_image_url: form.cover_image_url.trim() || null,
        content: form.content,
        published: form.published,
        published_at: form.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        await updatePost.mutateAsync({ id: editingId, ...payload });
        toast.success("Entrada actualizada");
      } else {
        await createPost.mutateAsync(payload);
        toast.success("Entrada creada");
      }
      setFormOpen(false);
    } catch (err: any) {
      if (err?.message?.includes("duplicate key") || err?.message?.includes("blog_posts_slug_key")) {
        toast.error("Ya existe una entrada con ese slug");
      } else {
        toast.error("Error al guardar entrada");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deletePost.mutateAsync(deleteTarget.id);
      toast.success("Entrada eliminada");
    } catch {
      toast.error("Error al eliminar entrada");
    } finally {
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Entradas del Blog</h2>
        <Button onClick={openCreate} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Nueva Entrada
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Cargando entradas...</p>
      ) : !posts?.length ? (
        <p className="text-muted-foreground">No hay entradas todavia.</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titulo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-[250px] truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          post.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.published ? "Publicado" : "Borrador"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(post.published_at ?? post.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(post)} aria-label="Editar">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDelete(post)} aria-label="Eliminar">
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
            {posts.map((post) => (
              <div key={post.id} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-medium block truncate">{post.title}</span>
                    <span className="text-sm text-muted-foreground">{post.category}</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(post)} aria-label="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDelete(post)} aria-label="Eliminar">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 text-sm">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      post.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published ? "Publicado" : "Borrador"}
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(post.published_at ?? post.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Entrada" : "Nueva Entrada"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Titulo *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Titulo de la entrada"
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
              <p className="text-xs text-muted-foreground">Se genera automaticamente del titulo</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Categoria</Label>
                <Select
                  value={form.category}
                  onValueChange={(val) => setForm((prev) => ({ ...prev, category: val }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Autor *</Label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                  placeholder="Nombre del autor"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Extracto</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Resumen corto de la entrada..."
                rows={2}
              />
            </div>

            <div className="space-y-1">
              <Label>Imagen de portada</Label>
              <div className="flex gap-2">
                <Input
                  value={form.cover_image_url}
                  onChange={(e) => setForm((prev) => ({ ...prev, cover_image_url: e.target.value }))}
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
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {form.cover_image_url && (
                <img
                  src={form.cover_image_url}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-cover rounded-md border"
                />
              )}
            </div>

            <div className="space-y-1">
              <Label>Contenido (Markdown) *</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Escribe el contenido en Markdown..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="published"
                checked={form.published}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, published: !!checked }))
                }
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publicado
              </Label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {editingId ? "Guardar Cambios" : "Crear Entrada"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar entrada</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estas seguro de eliminar "{deleteTarget?.title}"? Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
