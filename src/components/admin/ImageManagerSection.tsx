import { useState, useRef } from "react";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSiteImages,
  useCreateSiteImage,
  useDeleteSiteImage,
} from "@/hooks/useAdminImages";
import { supabase } from "@/integrations/supabase/client";

const galeriaCategories = [
  { value: "entrenamientos", label: "Entrenamientos" },
  { value: "carreras", label: "Carreras" },
  { value: "viajes", label: "Viajes" },
  { value: "convivios", label: "Convivios" },
];

interface ImageManagerSectionProps {
  section: "home" | "galeria";
}

export function ImageManagerSection({ section }: ImageManagerSectionProps) {
  const { data: images, isLoading } = useSiteImages(section);
  const createImage = useCreateSiteImage();
  const deleteImage = useDeleteSiteImage();

  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("");
  const [altText, setAltText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (section === "galeria" && !category) {
      toast.error("Selecciona una categoria primero");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${section}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("site-images")
        .upload(path, file);
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(path);

      await createImage.mutateAsync({
        section,
        category: section === "galeria" ? category : undefined,
        image_url: urlData.publicUrl,
        alt_text: altText || undefined,
      });

      setAltText("");
      toast.success("Imagen subida");
    } catch {
      toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteImage.mutateAsync(id);
      toast.success("Imagen eliminada");
    } catch {
      toast.error("Error al eliminar imagen");
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload controls */}
      <div className="rounded-lg border p-4 space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Subir imagen
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {section === "galeria" && (
            <div className="space-y-1 sm:w-48">
              <Label>Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria..." />
                </SelectTrigger>
                <SelectContent>
                  {galeriaCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1 flex-1">
            <Label>Texto alternativo (opcional)</Label>
            <Input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Descripcion de la imagen..."
            />
          </div>
          <div className="flex items-end">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-1" />
              )}
              {uploading ? "Subiendo..." : "Subir imagen"}
            </Button>
          </div>
        </div>
      </div>

      {/* Image count */}
      <p className="text-sm text-muted-foreground">
        {images?.length ?? 0} {images?.length === 1 ? "imagen" : "imagenes"}
      </p>

      {/* Image grid */}
      {isLoading ? (
        <p className="text-muted-foreground">Cargando imagenes...</p>
      ) : !images?.length ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mb-2 opacity-40" />
          <p>No hay imagenes todavia</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group rounded-md overflow-hidden border aspect-square"
            >
              <img
                src={img.image_url}
                alt={img.alt_text ?? ""}
                className="w-full h-full object-cover"
              />
              {img.category && (
                <span className="absolute bottom-1 left-1 text-[10px] bg-negro-asfalto/70 text-blanco-sal px-1.5 py-0.5 rounded">
                  {img.category}
                </span>
              )}
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar imagen"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
