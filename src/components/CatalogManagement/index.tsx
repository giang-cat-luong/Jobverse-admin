"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import useNotification from "@/hooks/useNotification";
import {
  Category,
  Section,
  ServiceCatalog,
  ServiceCatalogData,
} from "@/types/catalog";

import CatalogDialog from "@/app/(admin)/_components/CatalogForm";
import SectionDialog from "@/app/(admin)/_components/SectionForm";
import CategoryDialog from "@/app/(admin)/_components/TypeForm";

interface CatalogManagementsProps {
  catalogData: ServiceCatalogData;
}

export default function CatalogManagements({
  catalogData,
}: CatalogManagementsProps) {
  const { success_message } = useNotification();
  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const [editingCatalog, setEditingCatalog] = useState<ServiceCatalog | null>(
    null
  );
  const [editingSection, setEditingSection] = useState<{
    catalogId: string;
    section: Section;
  } | null>(null);
  const [editingCategory, setEditingCategory] = useState<{
    catalogId: string;
    sectionTitle: string;
    category: Category;
  } | null>(null);

  const [currentCatalogId, setCurrentCatalogId] = useState<string>("");
  const [currentSectionTitle, setCurrentSectionTitle] = useState<string>("");

  const generateId = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    setHydrated(true);
    setCatalogs(catalogData.service_catalogs);
    if (catalogData.service_catalogs.length > 0) {
      setCurrentCatalogId(catalogData.service_catalogs[0].id);
    }
  }, [catalogData]);

  if (!hydrated) return null;

  const handleAddOrUpdateCatalog = (name: string) => {
    if (!name.trim())
      return success_message(null, null, "Please enter a catalog name.");
    if (editingCatalog) {
      const updated = catalogs.map((c) =>
        c.id === editingCatalog.id ? { ...c, name } : c
      );
      setCatalogs(updated);
      success_message(
        null,
        null,
        `Catalog has been updated to "${name}" successfully.`
      );
    } else {
      const newCatalog: ServiceCatalog = {
        id: generateId(),
        name,
        image: null,
        sections: [],
      };
      setCatalogs([...catalogs, newCatalog]);
      success_message(
        null,
        null,
        `Catalog "${name}" has been added successfully.`
      );
    }
    setEditingCatalog(null);
    setCatalogDialogOpen(false);
  };

  const handleDeleteCatalog = (id: string) => {
    const toDelete = catalogs.find((c) => c.id === id);
    if (!toDelete) return;
    setCatalogs(catalogs.filter((c) => c.id !== id));
    success_message(
      null,
      null,
      `Catalog "${toDelete.name}" has been deleted successfully.`
    );
  };

  const handleAddOrUpdateSection = (title: string) => {
    if (!title.trim())
      return success_message(null, null, "Please enter a section title.");
    const updated = catalogs.map((c) =>
      c.id === currentCatalogId
        ? {
            ...c,
            sections: editingSection
              ? c.sections.map((s) =>
                  s.section_title === editingSection.section.section_title
                    ? { ...s, section_title: title }
                    : s
                )
              : [...c.sections, { section_title: title, categories: [] }],
          }
        : c
    );
    setCatalogs(updated);
    setEditingSection(null);
    setSectionDialogOpen(false);
    success_message(
      null,
      null,
      editingSection
        ? `Section has been updated to "${title}" successfully.`
        : `Section "${title}" has been added successfully.`
    );
  };

  const handleDeleteSection = (catalogId: string, sectionTitle: string) => {
    const updated = catalogs.map((c) =>
      c.id === catalogId
        ? {
            ...c,
            sections: c.sections.filter(
              (s) => s.section_title !== sectionTitle
            ),
          }
        : c
    );
    setCatalogs(updated);
    success_message(
      null,
      null,
      `Section "${sectionTitle}" has been deleted successfully.`
    );
  };

  const handleAddOrUpdateCategory = (name: string) => {
    if (!name.trim())
      return success_message(null, null, "Please enter a category name.");
    const updated = catalogs.map((c) =>
      c.id === currentCatalogId
        ? {
            ...c,
            sections: c.sections.map((s) =>
              s.section_title === currentSectionTitle
                ? {
                    ...s,
                    categories: editingCategory
                      ? s.categories.map((cat) =>
                          cat.id === editingCategory.category.id
                            ? { ...cat, name }
                            : cat
                        )
                      : [
                          ...s.categories,
                          { id: generateId(), name, image: null },
                        ],
                  }
                : s
            ),
          }
        : c
    );
    setCatalogs(updated);
    setEditingCategory(null);
    setCategoryDialogOpen(false);
    success_message(
      null,
      null,
      editingCategory
        ? `Category has been updated to "${name}" successfully.`
        : `Category "${name}" has been added successfully.`
    );
  };

  const handleDeleteCategory = (
    catalogId: string,
    sectionTitle: string,
    categoryId: string
  ) => {
    const updated = catalogs.map((c) =>
      c.id === catalogId
        ? {
            ...c,
            sections: c.sections.map((s) =>
              s.section_title === sectionTitle
                ? {
                    ...s,
                    categories: s.categories.filter(
                      (cat) => cat.id !== categoryId
                    ),
                  }
                : s
            ),
          }
        : c
    );
    setCatalogs(updated);
    success_message(null, null, "Category has been deleted successfully.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Catalog Management</h2>
        <CatalogDialog
          open={catalogDialogOpen}
          onOpenChange={setCatalogDialogOpen}
          onSubmit={handleAddOrUpdateCatalog}
          initialValue={editingCatalog?.name}
          isEditing={!!editingCatalog}
        />
      </div>

      <Tabs defaultValue={currentCatalogId} onValueChange={setCurrentCatalogId}>
        <div className="overflow-x-auto w-full">
          <TabsList className="flex w-max gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 text-center shadow-sm">
            {catalogs.map((catalog) => (
              <TabsTrigger
                key={catalog.id}
                value={catalog.id}
                className="whitespace-nowrap px-3 py-2 rounded-md"
              >
                {catalog.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {catalogs.map((catalog) => (
          <TabsContent key={catalog.id} value={catalog.id}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{catalog.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCatalog(catalog);
                        setCatalogDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCatalog(catalog.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Manage sections and categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Sections</h3>
                  <SectionDialog
                    open={sectionDialogOpen}
                    onOpenChange={setSectionDialogOpen}
                    onSubmit={handleAddOrUpdateSection}
                    initialValue={editingSection?.section.section_title}
                    isEditing={!!editingSection}
                  />
                </div>

                {catalog.sections.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-md text-gray-500">
                    No sections found.
                  </div>
                ) : (
                  <Accordion type="multiple">
                    {catalog.sections.map((section) => (
                      <AccordionItem
                        key={section.section_title}
                        value={section.section_title}
                      >
                        <AccordionTrigger>
                          <div className="flex justify-between w-full items-center">
                            <span>{section.section_title}</span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingSection({
                                    catalogId: catalog.id,
                                    section,
                                  });
                                  setSectionDialogOpen(true);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSection(
                                    catalog.id,
                                    section.section_title
                                  );
                                }}
                                className="h-8 w-8 p-0 text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium">
                                Categories
                              </h4>
                              <CategoryDialog
                                open={categoryDialogOpen}
                                onOpenChange={setCategoryDialogOpen}
                                onSubmit={handleAddOrUpdateCategory}
                                initialValue={editingCategory?.category.name}
                                isEditing={!!editingCategory}
                              />
                            </div>
                            {section.categories.length === 0 ? (
                              <div className="bg-gray-50 py-4 rounded text-center text-sm text-gray-500">
                                No categories found.
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {section.categories.map((cat) => (
                                  <div
                                    key={cat.id}
                                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                                  >
                                    <div className="flex gap-2 items-center">
                                      <ChevronRight className="h-4 w-4 text-gray-400" />
                                      <span>{cat.name}</span>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setEditingCategory({
                                            catalogId: catalog.id,
                                            sectionTitle: section.section_title,
                                            category: cat,
                                          });
                                          setCurrentCatalogId(catalog.id);
                                          setCurrentSectionTitle(
                                            section.section_title
                                          );
                                          setCategoryDialogOpen(true);
                                        }}
                                        className="h-7 w-7 p-0"
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleDeleteCategory(
                                            catalog.id,
                                            section.section_title,
                                            cat.id
                                          )
                                        }
                                        className="h-7 w-7 p-0 text-red-500"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
