import { useState, useMemo } from "react";
import { Pencil, Trash2, Plus, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminMembers } from "@/hooks/useAdminMembers";
import { MemberFormDialog } from "./MemberFormDialog";
import { DeleteMemberDialog } from "./DeleteMemberDialog";
import { ImageManagerSection } from "./ImageManagerSection";
import { BlogPostEditor } from "./BlogPostEditor";
import { GearProductEditor } from "./GearProductEditor";
import { SiteSettingsEditor } from "./SiteSettingsEditor";
import type { Database } from "@/integrations/supabase/types";

type MemberRow = Database["public"]["Tables"]["members"]["Row"];

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { data: members, isLoading } = useAdminMembers();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editMember, setEditMember] = useState<MemberRow | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteMember, setDeleteMember] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const filtered = useMemo(() => {
    if (!members) return [];
    if (!search.trim()) return members;
    const q = search.toLowerCase();
    return members.filter((m) => m.full_name.toLowerCase().includes(q));
  }, [members, search]);

  const openCreate = () => {
    setEditMember(null);
    setFormOpen(true);
  };

  const openEdit = (member: MemberRow) => {
    setEditMember(member);
    setFormOpen(true);
  };

  const openDelete = (member: MemberRow) => {
    setDeleteMember({ id: member.id, name: member.full_name });
    setDeleteOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Panel de Administracion
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Gestiona el contenido del sitio
          </p>
        </div>
        <Button onClick={onLogout} variant="outline" size="sm">
          <LogOut className="h-4 w-4 mr-1" />
          Salir
        </Button>
      </div>

      <Tabs defaultValue="miembros" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="miembros">Miembros</TabsTrigger>
          <TabsTrigger value="imagenes-home">Imagenes Home</TabsTrigger>
          <TabsTrigger value="imagenes-galeria">Imagenes Galeria</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="gear">Mercancia</TabsTrigger>
          <TabsTrigger value="configuracion">Configuracion</TabsTrigger>
        </TabsList>

        {/* Miembros Tab */}
        <TabsContent value="miembros">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={openCreate} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Agregar Miembro
            </Button>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">Cargando miembros...</p>
          ) : !filtered.length ? (
            <p className="text-muted-foreground">No se encontraron miembros.</p>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead className="text-center">Maratones</TableHead>
                      <TableHead className="text-center">PR</TableHead>
                      <TableHead className="text-center">Boston</TableHead>
                      <TableHead className="text-center">Leyenda</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-medium">{m.full_name}</TableCell>
                        <TableCell className="text-center">
                          {m.total_marathons}
                        </TableCell>
                        <TableCell className="text-center">
                          {m.marathon_pr ?? "\u2014"}
                        </TableCell>
                        <TableCell className="text-center">
                          {m.boston_count}
                        </TableCell>
                        <TableCell className="text-center">
                          {m.is_legend ? "Si" : "No"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(m)}
                              aria-label="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDelete(m)}
                              aria-label="Eliminar"
                            >
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
                {filtered.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg border p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{m.full_name}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(m)}
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDelete(m)}
                          aria-label="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                      <span>Maratones: {m.total_marathons}</span>
                      <span>PR: {m.marathon_pr ?? "\u2014"}</span>
                      <span>Boston: {m.boston_count}</span>
                      <span>Leyenda: {m.is_legend ? "Si" : "No"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        {/* Imagenes Home Tab */}
        <TabsContent value="imagenes-home">
          <ImageManagerSection section="home" />
        </TabsContent>

        {/* Imagenes Galeria Tab */}
        <TabsContent value="imagenes-galeria">
          <ImageManagerSection section="galeria" />
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog">
          <BlogPostEditor />
        </TabsContent>

        {/* Gear Tab */}
        <TabsContent value="gear">
          <GearProductEditor />
        </TabsContent>

        {/* Configuracion Tab */}
        <TabsContent value="configuracion">
          <SiteSettingsEditor />
        </TabsContent>
      </Tabs>

      <MemberFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        member={editMember}
      />

      <DeleteMemberDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        memberId={deleteMember?.id ?? null}
        memberName={deleteMember?.name ?? ""}
      />
    </div>
  );
}
