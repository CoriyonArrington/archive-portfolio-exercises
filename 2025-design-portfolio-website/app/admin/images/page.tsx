import { GeneralImageUploader } from "@/components/admin/general-image-uploader"

export default function ImagesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Image Management</h1>
      <p className="text-muted-foreground mb-8">Upload and manage images that can be used anywhere on your site.</p>
      <GeneralImageUploader />
    </div>
  )
}
