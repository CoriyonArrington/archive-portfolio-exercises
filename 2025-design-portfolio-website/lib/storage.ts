import { createClient } from "@supabase/supabase-js"

/**
 * Uploads an image to Supabase Storage
 *
 * @param file - The file to upload
 * @param bucket - The storage bucket name (default: 'images')
 * @param folder - Optional folder path within the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadImage(file: File, bucket = "images", folder?: string): Promise<string | null> {
  try {
    console.log(`Starting upload to bucket: ${bucket}, folder: ${folder || "root"}`)

    // Create a unique file name to avoid collisions
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

    // Construct the file path
    const filePath = folder ? `${folder}/${fileName}` : fileName
    console.log(`Generated file path: ${filePath}`)

    // Get Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables")
      throw new Error("Missing Supabase credentials")
    }

    console.log("Creating Supabase client for storage operations")

    // Create a fresh Supabase client for this operation
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Upload the file
    console.log(`Uploading file ${file.name} (${file.size} bytes) to ${bucket}/${filePath}`)
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading image:", error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    console.log("Upload successful, data:", data)

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    console.log("Generated public URL:", publicUrl)
    return publicUrl
  } catch (error) {
    console.error("Error in uploadImage:", error)
    throw error
  }
}

/**
 * Deletes an image from Supabase Storage
 *
 * @param path - The path of the file to delete
 * @param bucket - The storage bucket name (default: 'images')
 * @returns Boolean indicating success or failure
 */
export async function deleteImage(path: string, bucket = "images"): Promise<boolean> {
  try {
    console.log(`Attempting to delete image at path: ${path}`)

    // Get Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables")
      throw new Error("Missing Supabase credentials")
    }

    // Create a fresh Supabase client for this operation
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Extract the file path from the URL
    const urlObj = new URL(path)
    const pathSegments = urlObj.pathname.split("/")
    const filePath = pathSegments.slice(pathSegments.indexOf(bucket) + 1).join("/")

    console.log(`Extracted file path: ${filePath}`)

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      console.error("Error deleting image:", error)
      return false
    }

    console.log("Image deleted successfully")
    return true
  } catch (error) {
    console.error("Error in deleteImage:", error)
    return false
  }
}

/**
 * Lists all images in a bucket or folder
 *
 * @param bucket - The storage bucket name (default: 'images')
 * @param folder - Optional folder path within the bucket
 * @returns Array of file objects with URLs
 */
export async function listImages(bucket = "images", folder?: string): Promise<{ name: string; url: string }[]> {
  try {
    console.log(`Listing images in bucket: ${bucket}, folder: ${folder || "root"}`)

    // Get Supabase credentials
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables")
      throw new Error("Missing Supabase credentials")
    }

    // Create a fresh Supabase client for this operation
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase.storage.from(bucket).list(folder || "")

    if (error) {
      console.error("Error listing images:", error)
      return []
    }

    console.log(`Found ${data.length} items`)

    // Filter out folders and get public URLs for files
    const files = data
      .filter((item: any) => !item.metadata)
      .map((file: any) => {
        const path = folder ? `${folder}/${file.name}` : file.name

        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(path)

        return {
          name: file.name,
          url: publicUrl,
        }
      })

    console.log(`Returning ${files.length} image files`)
    return files
  } catch (error) {
    console.error("Error in listImages:", error)
    return []
  }
}

// If there's a function that returns image URLs, ensure it returns absolute URLs
// For example, if there's a getImageUrl function, it should return a complete URL

// Example fix (adjust based on your actual code):
export function getImageUrl(path: string): string {
  // If the path already starts with http or https, return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  // Otherwise, ensure it has a leading slash and return a complete URL
  const formattedPath = path.startsWith("/") ? path : `/${path}`
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public${formattedPath}`
}
