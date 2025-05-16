"use client";
import { useEffect, useState } from "react";
import { CatalogData, ServiceCatalog, Section, Category } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, ChevronRight } from "lucide-react";
import useNotification from "@/hooks/useNotification";

interface CatalogManagementsProps {
  catalogData: CatalogData;
}

export function CatalogManagements({ catalogData }: CatalogManagementsProps) {
  const { success_message } = useNotification();
  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>(
    catalogData.service_catalogs
  );
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
  const [newCatalogName, setNewCatalogName] = useState("");
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  // Dialog states
  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  // Generate new ID
  const generateId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  // Add new catalog
  const handleAddCatalog = () => {
    if (!newCatalogName.trim()) {
      success_message(null, null, `Please enter a catalog name.`);
      return;
    }

    const newCatalog: ServiceCatalog = {
      id: generateId(),
      name: newCatalogName,
      image: null,
      sections: [],
    };

    setCatalogs([...catalogs, newCatalog]);
    setNewCatalogName("");
    setCatalogDialogOpen(false);

    success_message(
      null,
      null,
      `Catalog "${newCatalogName}" has been added successfully.`
    );
  };

  // Update catalog
  const handleUpdateCatalog = () => {
    if (!editingCatalog) return;
    if (!newCatalogName.trim()) {
      success_message(null, null, "Please enter a catalog name.");
      return;
    }

    const updatedCatalogs = catalogs.map((catalog) =>
      catalog.id === editingCatalog.id
        ? { ...catalog, name: newCatalogName }
        : catalog
    );

    setCatalogs(updatedCatalogs);
    setEditingCatalog(null);
    setNewCatalogName("");
    setCatalogDialogOpen(false);

    success_message(
      null,
      null,
      `Catalog has been updated to "${newCatalogName}" successfully.`
    );
  };

  // Delete catalog
  const handleDeleteCatalog = (id: string) => {
    const catalogToDelete = catalogs.find((catalog) => catalog.id === id);
    if (!catalogToDelete) return;

    const updatedCatalogs = catalogs.filter((catalog) => catalog.id !== id);
    setCatalogs(updatedCatalogs);

    success_message(
      null,
      null,
      `Catalog "${catalogToDelete.name}" has been deleted successfully.`
    );
  };

  // Add new section to catalog
  const handleAddSection = (catalogId: string) => {
    if (!newSectionTitle.trim()) {
      success_message(null, null, "Please enter a section title.");
      return;
    }

    const newSection: Section = {
      section_title: newSectionTitle,
      categories: [],
    };

    const updatedCatalogs = catalogs.map((catalog) =>
      catalog.id === catalogId
        ? {
            ...catalog,
            sections: [...catalog.sections, newSection],
          }
        : catalog
    );

    setCatalogs(updatedCatalogs);
    setNewSectionTitle("");
    setSectionDialogOpen(false);

    success_message(
      null,
      null,
      `Section "${newSectionTitle}" has been added successfully.`
    );
  };

  // Update section
  const handleUpdateSection = () => {
    if (!editingSection) return;
    if (!newSectionTitle.trim()) {
      success_message(null, null, "Please enter a section title.");
      return;
    }

    const updatedCatalogs = catalogs.map((catalog) =>
      catalog.id === editingSection.catalogId
        ? {
            ...catalog,
            sections: catalog.sections.map((section) =>
              section.section_title === editingSection.section.section_title
                ? { ...section, section_title: newSectionTitle }
                : section
            ),
          }
        : catalog
    );

    setCatalogs(updatedCatalogs);
    setEditingSection(null);
    setNewSectionTitle("");
    setSectionDialogOpen(false);

    success_message(
      null,
      null,
      `Section has been updated to "${newSectionTitle}" successfully.`
    );
  };

  // Delete section
  const handleDeleteSection = (catalogId: string, sectionTitle: string) => {
    const updatedCatalogs = catalogs.map((catalog) =>
      catalog.id === catalogId
        ? {
            ...catalog,
            sections: catalog.sections.filter(
              (section) => section.section_title !== sectionTitle
            ),
          }
        : catalog
    );

    setCatalogs(updatedCatalogs);

    success_message(
      null,
      null,
      `Section "${sectionTitle}" has been deleted successfully.`
    );
  };

  // Add new category to section
  const handleAddCategory = (catalogId: string, sectionTitle: string) => {
    if (!newCategoryName.trim()) {
      success_message(null, null, "Please enter a category name.");
      return;
    }

    const newCategory: Category = {
      id: generateId(),
      name: newCategoryName,
      image: null,
    };

    const updatedCatalogs = catalogs.map((catalog) =>
      catalog.id === catalogId
        ? {
            ...catalog,
            sections: catalog.sections.map((section) =>
              section.section_title === sectionTitle
                ? {
                    ...section,
                    categories: [...section.categories, newCategory],
                  }
                : section
            ),
          }
        : catalog
    );

    setCatalogs(updatedCatalogs);
    setNewCategoryName("");
    setCategoryDialogOpen(false);

    success_message(
      null,
      null,
      `Category "${newCategoryName}" has been added successfully.`
    );
  };

  // Update category
  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    if (!newCategoryName.trim()) {
      success_message(null, null, `Please enter a category name.`);
      return;
    }

    const updatedCatalogs = catalogs.map((catalog) =>
      catalog.id === editingCategory.catalogId
        ? {
            ...catalog,
            sections: catalog.sections.map((section) =>
              section.section_title === editingCategory.sectionTitle
                ? {
                    ...section,
                    categories: section.categories.map((category) =>
                      category.id === editingCategory.category.id
                        ? { ...category, name: newCategoryName }
                        : category
                    ),
                  }
                : section
            ),
          }
        : catalog
    );

    setCatalogs(updatedCatalogs);
    setEditingCategory(null);
    setNewCategoryName("");
    setCategoryDialogOpen(false);

    success_message(
      null,
      null,
      `Category has been updated to "${newCategoryName}" successfully.`
    );
  };

  // Delete category
  const handleDeleteCategory = (
    catalogId: string,
    sectionTitle: string,
    categoryId: string
  ) => {
    const updatedCatalogs = catalogs.map((catalog) =>
      catalog.id === catalogId
        ? {
            ...catalog,
            sections: catalog.sections.map((section) =>
              section.section_title === sectionTitle
                ? {
                    ...section,
                    categories: section.categories.filter(
                      (category) => category.id !== categoryId
                    ),
                  }
                : section
            ),
          }
        : catalog
    );

    setCatalogs(updatedCatalogs);

    success_message(null, null, `Category has been deleted successfully.`);
  };

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setCatalogs(catalogData.service_catalogs);
  }, [catalogData.service_catalogs]);

  if (!hydrated) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Catalog Management</h2>
        <Dialog open={catalogDialogOpen} onOpenChange={setCatalogDialogOpen}>
          <DialogTrigger asChild>
            <div>
              <Button
                className="bg-admin-purple hover:bg-admin-purple/90 text-white"
                onClick={() => {
                  setEditingCatalog(null);
                  setNewCatalogName("");
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Catalog
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingCatalog ? "Edit Catalog" : "Add New Catalog"}
              </DialogTitle>
              <DialogDescription>
                {editingCatalog
                  ? "Update the catalog details below."
                  : "Enter the details for the new catalog."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Catalog Name
                </label>
                <Input
                  id="name"
                  value={newCatalogName}
                  onChange={(e) => setNewCatalogName(e.target.value)}
                  placeholder="Enter catalog name"
                />
              </div>
            </div>
            <DialogFooter>
              <div>
                <Button
                  variant="outline"
                  onClick={() => setCatalogDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingCatalog ? handleUpdateCatalog : handleAddCatalog
                  }
                  className="bg-admin-purple hover:bg-admin-purple/90 text-white"
                >
                  {editingCatalog ? "Update Catalog" : "Add Catalog"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue={catalogs[0]?.id}>
        <TabsList className="mb-4 w-full overflow-x-auto flex max-w-none">
          {catalogs.map((catalog) => (
            <TabsTrigger
              key={catalog.id}
              value={catalog.id}
              className="min-w-[120px]"
            >
              {catalog.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {catalogs.map((catalog) => (
          <TabsContent
            key={catalog.id}
            value={catalog.id}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{catalog.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCatalog(catalog);
                        setNewCatalogName(catalog.name);
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
                  Manage sections and categories for this catalog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Sections</h3>
                    <Dialog
                      open={sectionDialogOpen}
                      onOpenChange={setSectionDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingSection(null);
                              setNewSectionTitle("");
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Section
                          </Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            {editingSection
                              ? "Edit Section"
                              : "Add New Section"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingSection
                              ? "Update the section details below."
                              : "Enter the details for the new section."}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <label
                              htmlFor="section-title"
                              className="text-sm font-medium"
                            >
                              Section Title
                            </label>
                            <Input
                              id="section-title"
                              value={newSectionTitle}
                              onChange={(e) =>
                                setNewSectionTitle(e.target.value)
                              }
                              placeholder="Enter section title"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <div>
                            <Button
                              variant="outline"
                              onClick={() => setSectionDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={
                                editingSection
                                  ? handleUpdateSection
                                  : () => handleAddSection(catalog.id)
                              }
                              className="bg-admin-purple hover:bg-admin-purple/90 text-white"
                            >
                              {editingSection
                                ? "Update Section"
                                : "Add Section"}
                            </Button>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {catalog.sections.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-md">
                      <p className="text-gray-500">
                        No sections found. Add a new section to get started.
                      </p>
                    </div>
                  ) : (
                    <Accordion type="multiple" className="w-full">
                      {catalog.sections.map((section) => (
                        <AccordionItem
                          key={section.section_title}
                          value={section.section_title}
                        >
                          <AccordionTrigger className="py-4 px-3 hover:bg-gray-50 rounded-md group">
                            <div className="flex items-center justify-between w-full mr-4">
                              <span>{section.section_title}</span>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingSection({
                                      catalogId: catalog.id,
                                      section,
                                    });
                                    setNewSectionTitle(section.section_title);
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
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-4 pt-2 pb-4">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-medium">
                                  Categories
                                </h4>
                                <Dialog
                                  open={categoryDialogOpen}
                                  onOpenChange={setCategoryDialogOpen}
                                >
                                  <DialogTrigger asChild>
                                    <div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setEditingCategory(null);
                                          setNewCategoryName("");
                                        }}
                                      >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add Category
                                      </Button>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        {editingCategory
                                          ? "Edit Category"
                                          : "Add New Category"}
                                      </DialogTitle>
                                      <DialogDescription>
                                        {editingCategory
                                          ? "Update the category details below."
                                          : "Enter the details for the new category."}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid gap-2">
                                        <label
                                          htmlFor="category-name"
                                          className="text-sm font-medium"
                                        >
                                          Category Name
                                        </label>
                                        <Input
                                          id="category-name"
                                          value={newCategoryName}
                                          onChange={(e) =>
                                            setNewCategoryName(e.target.value)
                                          }
                                          placeholder="Enter category name"
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <div>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            setCategoryDialogOpen(false)
                                          }
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={
                                            editingCategory
                                              ? handleUpdateCategory
                                              : () =>
                                                  handleAddCategory(
                                                    catalog.id,
                                                    section.section_title
                                                  )
                                          }
                                          className="bg-admin-purple hover:bg-admin-purple/90 text-white"
                                        >
                                          {editingCategory
                                            ? "Update Category"
                                            : "Add Category"}
                                        </Button>
                                      </div>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>

                              {section.categories.length === 0 ? (
                                <div className="text-center py-6 bg-gray-50 rounded-md">
                                  <p className="text-gray-500 text-sm">
                                    No categories found. Add a new category to
                                    get started.
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  {section.categories.map((category) => (
                                    <div
                                      key={category.id}
                                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                                    >
                                      <div className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                        <span>{category.name}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            setEditingCategory({
                                              catalogId: catalog.id,
                                              sectionTitle:
                                                section.section_title,
                                              category,
                                            });
                                            setNewCategoryName(category.name);
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
                                              category.id
                                            )
                                          }
                                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
