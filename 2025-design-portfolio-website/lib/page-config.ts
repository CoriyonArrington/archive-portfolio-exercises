// Use this in pages that need to be fully dynamic
export const dynamicConfig = {
  dynamic: "force-dynamic",
  revalidate: 0,
}

// Use this in pages that can be static but need to revalidate
export const staticWithRevalidationConfig = {
  revalidate: 3600, // 1 hour
}
