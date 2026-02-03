import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";

export function SiteSettingsEditor() {
  const { data: settings, isLoading } = useAdminSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const current = settings?.find((s) => s.key === "whatsapp_phone");
    if (current) setPhone(current.value);
  }, [settings]);

  const handleSave = () => {
    updateSetting.mutate({ key: "whatsapp_phone", value: phone });
  };

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando configuracion...</p>;
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-1">
          Configuracion del Sitio
        </h2>
        <p className="text-sm text-muted-foreground">
          Ajustes generales que afectan el funcionamiento del sitio.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-body font-medium text-foreground">
          Telefono WhatsApp
        </label>
        <p className="text-xs text-muted-foreground">
          Numero con codigo de pais, sin espacios ni signos (ej. 528110504295)
        </p>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="528110504295"
        />
      </div>

      <Button
        onClick={handleSave}
        disabled={updateSetting.isPending}
      >
        {updateSetting.isPending ? "Guardando..." : "Guardar"}
      </Button>

      {updateSetting.isSuccess && (
        <p className="text-sm text-green-600">Guardado correctamente.</p>
      )}
      {updateSetting.isError && (
        <p className="text-sm text-destructive">Error al guardar. Intenta de nuevo.</p>
      )}
    </div>
  );
}
