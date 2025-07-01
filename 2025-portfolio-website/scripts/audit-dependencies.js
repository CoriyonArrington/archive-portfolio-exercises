import { execSync } from "child_process"
import fs from "fs"
import path from "path"

// Get the package.json content
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies }

// Get all JS/TS files in the project
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes("node_modules") && !filePath.includes(".next")) {
        getAllFiles(filePath, fileList)
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      fileList.push(filePath)
    }
  })

  return fileList
}

const allFiles = getAllFiles(".")
const usedDependencies = new Set()

// Check each file for imports
allFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8")

  // Match import statements
  const importRegex = /import\s+(?:.+\s+from\s+)?['"]([^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]

    // Get the package name (first part of the import path)
    const packageName = importPath.startsWith("@")
      ? importPath.split("/").slice(0, 2).join("/")
      : importPath.split("/")[0]

    if (dependencies[packageName]) {
      usedDependencies.add(packageName)
    }
  }
})

// Find unused dependencies
const unusedDependencies = Object.keys(dependencies).filter((dep) => !usedDependencies.has(dep))

console.log("=== Dependency Audit Results ===")
console.log(`Total dependencies: ${Object.keys(dependencies).length}`)
console.log(`Used dependencies: ${usedDependencies.size}`)
console.log(`Unused dependencies: ${unusedDependencies.length}`)

if (unusedDependencies.length > 0) {
  console.log("\nUnused dependencies:")
  unusedDependencies.forEach((dep) => {
    console.log(`- ${dep}: ${dependencies[dep]}`)
  })

  console.log("\nTo remove all unused dependencies, run:")
  console.log(`npm uninstall ${unusedDependencies.join(" ")}`)
}

// Check for outdated dependencies
console.log("\n=== Outdated Dependencies ===")
try {
  const outdated = execSync("npm outdated --json", { encoding: "utf8" })
  const outdatedDeps = JSON.parse(outdated)

  if (Object.keys(outdatedDeps).length > 0) {
    console.log("Outdated dependencies:")
    Object.entries(outdatedDeps).forEach(([dep, info]) => {
      console.log(`- ${dep}: current ${info.current}, latest ${info.latest}`)
    })
  } else {
    console.log("All dependencies are up to date!")
  }
} catch (error) {
  // If there are outdated dependencies, npm outdated exits with code 1
  if (error.stdout) {
    const outdatedDeps = JSON.parse(error.stdout)
    console.log("Outdated dependencies:")
    Object.entries(outdatedDeps).forEach(([dep, info]) => {
      console.log(`- ${dep}: current ${info.current}, latest ${info.latest}`)
    })
  }
}
