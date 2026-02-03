import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateMember, useUpdateMember } from "@/hooks/useAdminMembers";
import { MultiSelectMarathons } from "./MultiSelectMarathons";
import { marathonCityCoords } from "@/lib/marathonCityCoords";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type MemberRow = Database["public"]["Tables"]["members"]["Row"];

const marathonOptions = Object.keys(marathonCityCoords);

const memberSchema = z.object({
  full_name: z.string().min(1, "Nombre requerido"),
  date_of_birth: z.string().optional(),
  year_joined: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  strava: z.string().optional(),
  total_marathons: z.string().optional(),
  marathon_pr: z.string().optional(),
  marathon_pr_year: z.string().optional(),
  marathon_pr_city: z.string().optional(),
  boston_count: z.string().optional(),
  half_marathon_pr: z.string().optional(),
  ten_k_pr: z.string().optional(),
  sub3_marathons: z.string().optional(),
  most_run_marathon: z.string().optional(),
  marathon_cities: z.string().optional(),
  other_marathon_cities: z.string().optional(),
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  photo_authorized: z.boolean().optional(),
  has_placeholder_photo: z.boolean().optional(),
  is_legend: z.boolean().optional(),
});

type MemberFormValues = z.infer<typeof memberSchema>;

interface MemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: MemberRow | null;
}

function toFormValues(member: MemberRow): MemberFormValues {
  return {
    full_name: member.full_name,
    date_of_birth: member.date_of_birth ?? "",
    year_joined: member.year_joined?.toString() ?? "",
    email: member.email ?? "",
    phone: member.phone ?? "",
    instagram: member.instagram ?? "",
    strava: member.strava ?? "",
    total_marathons: member.total_marathons?.toString() ?? "",
    marathon_pr: member.marathon_pr ?? "",
    marathon_pr_year: member.marathon_pr_year?.toString() ?? "",
    marathon_pr_city: member.marathon_pr_city ?? "",
    boston_count: member.boston_count?.toString() ?? "",
    half_marathon_pr: member.half_marathon_pr ?? "",
    ten_k_pr: member.ten_k_pr ?? "",
    sub3_marathons: member.sub3_marathons?.toString() ?? "",
    most_run_marathon: member.most_run_marathon ?? "",
    marathon_cities: member.marathon_cities?.join(", ") ?? "",
    other_marathon_cities: member.other_marathon_cities ?? "",
    bio: member.bio ?? "",
    photo_url: member.photo_url ?? "",
    photo_authorized: member.photo_authorized,
    has_placeholder_photo: member.has_placeholder_photo,
    is_legend: member.is_legend,
  };
}

function toDbPayload(values: MemberFormValues) {
  const str = (v: string | undefined) => (v?.trim() || null);
  const num = (v: string | undefined) => {
    const n = Number(v);
    return v?.trim() && !isNaN(n) ? n : null;
  };
  const int = (v: string | undefined) => {
    const n = parseInt(v ?? "", 10);
    return v?.trim() && !isNaN(n) ? n : null;
  };

  return {
    full_name: values.full_name.trim(),
    date_of_birth: str(values.date_of_birth),
    year_joined: int(values.year_joined),
    email: str(values.email),
    phone: str(values.phone),
    instagram: str(values.instagram),
    strava: str(values.strava),
    total_marathons: num(values.total_marathons) ?? 0,
    marathon_pr: str(values.marathon_pr),
    marathon_pr_year: int(values.marathon_pr_year),
    marathon_pr_city: str(values.marathon_pr_city),
    boston_count: num(values.boston_count) ?? 0,
    half_marathon_pr: str(values.half_marathon_pr),
    ten_k_pr: str(values.ten_k_pr),
    sub3_marathons: num(values.sub3_marathons) ?? 0,
    most_run_marathon: str(values.most_run_marathon),
    marathon_cities: values.marathon_cities?.trim()
      ? values.marathon_cities.split(",").map((c) => c.trim()).filter(Boolean)
      : null,
    other_marathon_cities: str(values.other_marathon_cities),
    bio: str(values.bio),
    photo_url: str(values.photo_url),
    photo_authorized: values.photo_authorized ?? false,
    has_placeholder_photo: values.has_placeholder_photo ?? false,
    is_legend: values.is_legend ?? false,
  };
}

export function MemberFormDialog({
  open,
  onOpenChange,
  member,
}: MemberFormDialogProps) {
  const createMember = useCreateMember();
  const updateMember = useUpdateMember();
  const isEdit = !!member;

  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: member ? toFormValues(member) : {},
  });

  useEffect(() => {
    if (open) {
      setShowUrlInput(false);
      reset(member ? toFormValues(member) : {
        full_name: "",
        photo_authorized: false,
        has_placeholder_photo: false,
        is_legend: false,
      });
    }
  }, [open, member, reset]);

  const photoUrl = watch("photo_url");
  const marathonPrCity = watch("marathon_pr_city");
  const mostRunMarathon = watch("most_run_marathon");
  const marathonCitiesStr = watch("marathon_cities") ?? "";

  const marathonCitiesArray = marathonCitiesStr
    ? marathonCitiesStr.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("member-photos")
        .upload(path, file);
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("member-photos")
        .getPublicUrl(path);

      setValue("photo_url", urlData.publicUrl);
      toast.success("Imagen subida");
    } catch {
      toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onSubmit = (values: MemberFormValues) => {
    const payload = toDbPayload(values);

    if (isEdit) {
      updateMember.mutate(
        { id: member.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Miembro actualizado");
            onOpenChange(false);
          },
          onError: () => toast.error("Error al actualizar miembro"),
        }
      );
    } else {
      createMember.mutate(payload, {
        onSuccess: () => {
          toast.success("Miembro creado");
          onOpenChange(false);
        },
        onError: () => toast.error("Error al crear miembro"),
      });
    }
  };

  const isPending = createMember.isPending || updateMember.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-display">
            {isEdit ? "Editar Miembro" : "Agregar Miembro"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Info Personal */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Info Personal
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nombre completo *</Label>
                  <Input id="full_name" {...register("full_name")} />
                  {errors.full_name && (
                    <p className="text-sm text-red-500">{errors.full_name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Fecha de nacimiento</Label>
                  <Input id="date_of_birth" type="date" {...register("date_of_birth")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year_joined">Ano de ingreso</Label>
                  <Input id="year_joined" type="number" {...register("year_joined")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input id="phone" {...register("phone")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" {...register("instagram")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strava">Strava</Label>
                  <Input id="strava" {...register("strava")} />
                </div>
              </div>
            </fieldset>

            {/* Estadisticas */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Estadisticas
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_marathons">Total maratones</Label>
                  <Input id="total_marathons" type="number" {...register("total_marathons")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marathon_pr">PR Maraton</Label>
                  <Input id="marathon_pr" placeholder="HH:MM:SS" {...register("marathon_pr")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marathon_pr_year">Ano PR Maraton</Label>
                  <Input id="marathon_pr_year" type="number" {...register("marathon_pr_year")} />
                </div>
                <div className="space-y-2">
                  <Label>Ciudad PR Maraton</Label>
                  <Select
                    value={marathonPrCity || ""}
                    onValueChange={(v) => setValue("marathon_pr_city", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ciudad..." />
                    </SelectTrigger>
                    <SelectContent>
                      {marathonOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="boston_count">Veces Boston</Label>
                  <Input id="boston_count" type="number" {...register("boston_count")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="half_marathon_pr">PR Medio Maraton</Label>
                  <Input id="half_marathon_pr" placeholder="HH:MM:SS" {...register("half_marathon_pr")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ten_k_pr">PR 10K</Label>
                  <Input id="ten_k_pr" placeholder="MM:SS" {...register("ten_k_pr")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sub3_marathons">Maratones Sub-3</Label>
                  <Input id="sub3_marathons" type="number" {...register("sub3_marathons")} />
                </div>
              </div>
            </fieldset>

            {/* Maratones */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Maratones
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maraton mas corrido</Label>
                  <Select
                    value={mostRunMarathon || ""}
                    onValueChange={(v) => setValue("most_run_marathon", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar maraton..." />
                    </SelectTrigger>
                    <SelectContent>
                      {marathonOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ciudades de maraton</Label>
                  <MultiSelectMarathons
                    value={marathonCitiesArray}
                    onChange={(cities) => setValue("marathon_cities", cities.join(", "))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="other_marathon_cities">Otras ciudades</Label>
                  <Input id="other_marathon_cities" {...register("other_marathon_cities")} />
                </div>
              </div>
            </fieldset>

            {/* Perfil */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Perfil
              </legend>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea id="bio" rows={3} {...register("bio")} />
                </div>

                {/* Photo upload */}
                <div className="space-y-2">
                  <Label>Foto de perfil</Label>
                  {photoUrl && (
                    <div className="mb-2">
                      <img
                        src={photoUrl}
                        alt="Preview"
                        className="w-20 h-20 rounded-md object-cover border"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
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
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                    >
                      o pegar URL
                    </button>
                  </div>
                  {showUrlInput && (
                    <Input
                      placeholder="https://..."
                      {...register("photo_url")}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={watch("photo_authorized") ?? false}
                      onCheckedChange={(checked) =>
                        setValue("photo_authorized", checked === true)
                      }
                    />
                    Foto autorizada
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={watch("has_placeholder_photo") ?? false}
                      onCheckedChange={(checked) =>
                        setValue("has_placeholder_photo", checked === true)
                      }
                    />
                    Tiene imagen placeholder
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={watch("is_legend") ?? false}
                      onCheckedChange={(checked) =>
                        setValue("is_legend", checked === true)
                      }
                    />
                    Es leyenda
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? "Guardando..."
                  : isEdit
                  ? "Guardar Cambios"
                  : "Crear Miembro"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
