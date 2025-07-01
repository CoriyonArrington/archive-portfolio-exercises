"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { ImageGallery } from "@/components/admin/image-gallery"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Plus, Upload, Info } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import type { ProjectType } from "@/types/project"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectImageEditorProps {
  project: ProjectType
  onUpdate: (updatedImages: string[]) => Promise<void>
  onUpdateThumbnail?: (thumbnailUrl: string) => Promise<void>
}

interface ImageSection {
  id: string
  label: string
  description: string
  index: number
}

const IMAGE_SECTIONS: ImageSection[] = [
  {
    id: "hero",
    label: "Hero Image",
    description: "Main project image displayed at the top of the project page",
    index: 0,
  },
  {
    id: "discovery",
    label: "Discovery Phase",
    description: "Image representing the research and discovery phase",
    index: 1,
  },
  {
    id: "design",
    label: "Design Phase",
    description: "Image representing the design process",
    index: 2,
  },
  {
    id: "delivery",
    label: "Delivery Phase",
    description: "Image representing the implementation and delivery",
    index: 3,
  },
]

export function ProjectImageEditor({ project, onUpdate, onUpdateThumbnail }: ProjectImageEditorProps) {
  const [projectImages, setProjectImages] = useState<string[]>(project.images || [])
  const [isUpdating, setIsUpdating] = useState(false)
  const [activeDialog, setActiveDialog] = useState<string | null>(null)
  const { toast } = useToast()
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(project.thumbnailUrl || "")
  const [isThumbnailUpdating, setIsThumbnailUpdating] = useState(false)
  const [isThumbnailDialogOpen, setIsThumbnailDialogOpen] = useState(false)

  useEffect(() => {
    console.log("Project images updated:", project.images)
    setProjectImages(project.images || [])
  }, [project])

  const ensureImageArray = (arr: string[], minLength: number): string[] => {
    const result = [...arr]
    while (result.length < minLength) {
      result.push("")
    }
    return result
  }

  const handleAddImage = (sectionId: string, url: string) => {
    console.log(`Adding image to section ${sectionId}:`, url)

    const section = IMAGE_SECTIONS.find((s) => s.id === sectionId)
    if (!section) {
      console.error(`Section ${sectionId} not found`)
      return
    }

    const newImages = ensureImageArray([...projectImages], section.index + 1)
    newImages[section.index] = url

    console.log("Updated images array:", newImages)
    setProjectImages(newImages)
    setActiveDialog(null)

    toast({
      title: "Image added",
      description: `Image added to ${section.label}`,
    })
  }

  const handleAddAdditionalImage = (url: string) => {
    console.log("Adding additional image:", url)
    const newImages = [...projectImages, url]
    console.log("Updated images array:", newImages)
    setProjectImages(newImages)
    setActiveDialog(null)

    toast({
      title: "Image added",
      description: "Additional image added",
    })
  }

  const handleRemoveImage = (index: number) => {
    console.log(`Removing image at index ${index}`)
    const newImages = [...projectImages]

    if (index < 4) {
      newImages[index] = ""
    } else {
      newImages.splice(index, 1)
    }

    console.log("Updated images array:", newImages)
    setProjectImages(newImages)

    toast({
      title: "Image removed",
      description: "The image has been removed",
    })
  }

  const handleSave = async () => {
    setIsUpdating(true)

    try {
      const filteredImages = [...projectImages]
      while (filteredImages.length > 0 && filteredImages[filteredImages.length - 1] === "") {
        filteredImages.pop()
      }

      console.log("Saving images:", filteredImages)
      await onUpdate(filteredImages)

      toast({
        title: "Images updated",
        description: "Project images have been updated successfully",
      })
    } catch (error) {
      console.error("Update error:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating the project images",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSaveThumbnail = async () => {
    if (!thumbnailUrl || !onUpdateThumbnail) return

    setIsThumbnailUpdating(true)

    try {
      console.log("Saving thumbnail:", thumbnailUrl)
      await onUpdateThumbnail(thumbnailUrl)

      toast({
        title: "Thumbnail updated",
        description: "Project thumbnail has been updated successfully",
      })
    } catch (error) {
      console.error("Thumbnail update error:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating the project thumbnail",
        variant: "destructive",
      })
    } finally {
      setIsThumbnailUpdating(false)
    }
  }

  const handleAddThumbnail = (url: string) => {
    console.log("Setting thumbnail URL:", url)
    setThumbnailUrl(url)
    setIsThumbnailDialogOpen(false)

    toast({
      title: "Thumbnail selected",
      description: "Click 'Save Thumbnail' to apply changes",
    })
  }

  return (
    <div className="space-y-6">
      {/* Thumbnail section */}
      <Card className="mb-6">
        <div className="flex justify-between items-start p-6 pb-4">
          <div>
            <h3 className="text-lg font-medium">Project Thumbnail</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This image appears on project cards throughout the site
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsThumbnailDialogOpen(true)}>
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative aspect-video w-full max-w-md rounded-md overflow-hidden bg-muted">
              {thumbnailUrl ? (
                <Image src={thumbnailUrl || "/placeholder.svg"} alt="Project thumbnail" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Plus className="h-8 w-8 mb-2" />
                  <span>Add Thumbnail</span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-end">
              {thumbnailUrl && onUpdateThumbnail && (
                <Button onClick={handleSaveThumbnail} disabled={isThumbnailUpdating} className="gap-2">
                  {isThumbnailUpdating ? "Saving..." : "Save Thumbnail"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Project Images</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p className="font-medium mb-2">Image positions matter:</p>
              <ul className="list-disc pl-4 text-sm">
                <li>First image: Hero image</li>
                <li>Second image: Discovery Phase</li>
                <li>Third image: Design Phase</li>
                <li>Fourth image: Delivery Phase</li>
                <li>Additional images: Design highlights</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main image sections in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {IMAGE_SECTIONS.map((section) => {
          const hasImage = projectImages[section.index] && projectImages[section.index] !== ""

          return (
            <Card key={section.id} className="relative">
              <div className="flex justify-between items-start p-6 pb-4">
                <div>
                  <h3 className="text-lg font-medium">{section.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setActiveDialog(section.id)}>
                    <Upload className="h-4 w-4" />
                  </Button>
                  {hasImage && (
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveImage(section.index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="px-6 pb-6">
                {hasImage ? (
                  <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted">
                    <Image
                      src={projectImages[section.index] || "/placeholder.svg"}
                      alt={section.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video w-full rounded-md overflow-hidden bg-muted flex flex-col items-center justify-center">
                    <Plus className="h-8 w-8 mb-2" />
                    <span>Add {section.label}</span>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Additional images section */}
      <Card>
        <div className="flex justify-between items-start p-6 pb-4">
          <div>
            <h3 className="text-lg font-medium">Additional Images</h3>
            <p className="text-sm text-muted-foreground mt-1">Supplementary images to showcase design highlights</p>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div
            className="h-24 w-full rounded-md overflow-hidden bg-muted flex items-center justify-center border-2 border-dashed cursor-pointer"
            onClick={() => setActiveDialog("additional")}
          >
            <Plus className="h-6 w-6 mr-2" />
            <span>Add Image</span>
          </div>
        </div>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isUpdating} className="gap-2">
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Dialog for additional images */}
      <Dialog open={activeDialog === "additional"} onOpenChange={(open) => !open && setActiveDialog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add Additional Image</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="upload">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="gallery">From Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <ImageUploader onUploadComplete={handleAddAdditionalImage} />
            </TabsContent>

            <TabsContent value="gallery">
              <ImageGallery onSelect={handleAddAdditionalImage} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Dialog for phase sections */}
      <Dialog
        open={activeDialog !== null && activeDialog !== "additional"}
        onOpenChange={(open) => !open && setActiveDialog(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Add Image to {IMAGE_SECTIONS.find((section) => section.id === activeDialog)?.label || "Section"}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="upload">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="gallery">From Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <ImageUploader
                onUploadComplete={(url) => {
                  const section = IMAGE_SECTIONS.find((s) => s.id === activeDialog)
                  if (section) {
                    handleAddImage(section.id, url)
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="gallery">
              <ImageGallery
                onSelect={(url) => {
                  const section = IMAGE_SECTIONS.find((s) => s.id === activeDialog)
                  if (section) {
                    handleAddImage(section.id, url)
                  }
                }}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Dialog for thumbnail */}
      <Dialog open={isThumbnailDialogOpen} onOpenChange={setIsThumbnailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Set Project Thumbnail</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="upload">
            <TabsList className="mb-4">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="gallery">From Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <ImageUploader onUploadComplete={handleAddThumbnail} />
            </TabsContent>

            <TabsContent value="gallery">
              <ImageGallery onSelect={handleAddThumbnail} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
