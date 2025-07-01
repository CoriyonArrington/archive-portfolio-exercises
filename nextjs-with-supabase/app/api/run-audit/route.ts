// app/api/run-audit/route.ts (Parse ts-prune text output)
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execPromise = promisify(exec);

// --- Types ---
interface ComponentStatusData { name: string; location: string; status: string; usageCount: number; notes: string; }
interface UnusedComponentData { path: string; name: string; type?: string; status?: string; }
interface UnusedDependencyData { name: string; devDependency: boolean; type?: string; status?: string; }
interface DuplicationData { sourceFile: string; targetFile: string; lines: number; tokens: number; }
interface AuditData { timestamp: string; summary: { unusedComponentsCount?: number; unusedDependenciesCount?: number; duplicationPercentage?: number; healthScore?: number; standardizedCount?: number; totalComponents?: number; }; details: { unusedComponents: UnusedComponentData[]; unusedDependencies?: UnusedDependencyData[]; duplications: DuplicationData[]; componentStatus: ComponentStatusData[]; }; }

// --- Configuration ---
const outputDir = path.join(process.cwd(), "public", "admin", "component-audit", "data");
const outputPath = path.join(outputDir, "latest-audit.json");
const jscpdReportPath = path.join(process.cwd(), "reports", "jscpd-report.json");
// *** Path assumed from previous step - VERIFY if needed ***
const componentListPath = path.join(process.cwd(), "reports", "component-structure.json");


// --- Helper Functions ---

// *** MODIFIED runTsPrune to parse TEXT output ***
async function runTsPrune(): Promise<UnusedComponentData[]> {
  let rawStdout = '';
  try {
    console.log("Running ts-prune...");
    // Run without --json initially, or expect text even with --json if it fails
    const { stdout } = await execPromise('npx ts-prune --project tsconfig.json'); // May remove --json if it consistently outputs text
    rawStdout = stdout || '';
    console.log("ts-prune completed (parsing text output).");

    // Parse the text output (format: path:line - name)
    const lines = rawStdout.trim().split('\n');
    const unused: UnusedComponentData[] = [];

    const regex = /^(.+?):\d+ - (.+)$/; // Regex to capture path and name

    lines.forEach(line => {
      const match = line.trim().match(regex);
      if (match && match[1] && match[2]) {
        unused.push({
          path: match[1].trim(), // Captured file path
          name: match[2].trim(), // Captured export name
        });
      } else if (line.trim()) {
          console.warn(`Could not parse ts-prune line: "${line}"`)
      }
    });

    return unused;

  } catch (error: any) {
    console.error("ts-prune execution failed:", error);
    // If error occurred but there WAS some stdout, try parsing it anyway
    if (error.stdout) {
      console.warn("ts-prune process exited with error code, attempting to parse stdout as text:", error.code);
      rawStdout = error.stdout || '';
      const lines = rawStdout.trim().split('\n');
      const unused: UnusedComponentData[] = [];
      const regex = /^(.+?):\d+ - (.+)$/;
      lines.forEach(line => {
        const match = line.trim().match(regex);
        if (match && match[1] && match[2]) {
            unused.push({ path: match[1].trim(), name: match[2].trim() });
        } else if (line.trim()) {
          console.warn(`Could not parse ts-prune line (in error block): "${line}"`)
        }
      });
      if (unused.length > 0) {
        console.log(`Parsed ${unused.length} items from ts-prune stdout despite process error.`);
        return unused;
      }
    }
    console.warn("Returning empty array for unused components due to ts-prune error.");
    return []; // Return empty on failure
  }
}

// runDepcheck, runJscpd, runGenerateComponentList remain the same as the previous version
async function runDepcheck(): Promise<{ dependencies: string[], devDependencies: string[] }> { /* ... Same as previous ... */
   let rawStdout = '';
   try {
     console.log("Running depcheck...");
     const { stdout } = await execPromise('npx depcheck --json');
     rawStdout = stdout || '';
     console.log("depcheck completed.");
     const results = JSON.parse(rawStdout);
     return {
       dependencies: results.dependencies || [],
       devDependencies: results.devDependencies || [],
     };
   } catch (error: any) {
     console.error("depcheck execution failed or parsing failed:", error);
      if (error.stdout) {
        console.warn("depcheck process exited with error code, but attempting to parse stdout:", error.code);
        rawStdout = error.stdout || '';
        try {
          const results = JSON.parse(rawStdout);
           return {
             dependencies: results.dependencies || [],
             devDependencies: results.devDependencies || [],
           };
        } catch (parseError) {
           console.error("Failed to parse depcheck stdout even after process error:", parseError);
           console.error("Problematic depcheck output:", rawStdout);
        }
      }
     console.warn("Returning empty arrays for unused dependencies due to depcheck error.");
     return { dependencies: [], devDependencies: [] };
   }
}

async function runJscpd(): Promise<{ percentage: number; duplicates: any[] }> { /* ... Same as previous ... */
  try {
    console.log("Running jscpd...");
    await fs.mkdir(path.dirname(jscpdReportPath), { recursive: true });
    await execPromise(`npx jscpd . --ignore "node_modules/**" --reporters json --output ./reports`);
    console.log("jscpd completed.");
    const reportContent = await fs.readFile(jscpdReportPath, 'utf-8');
    const report = JSON.parse(reportContent);
    return {
      percentage: report.statistics?.total?.percentage ?? 0,
      duplicates: report.duplicates || [],
    };
  } catch (error: any) {
    console.error("jscpd execution failed or reading report failed:", error);
     try {
        const reportContent = await fs.readFile(jscpdReportPath, 'utf-8');
        const report = JSON.parse(reportContent);
         console.warn("jscpd process exited with error code, but report file exists:", error.code);
        return {
            percentage: report.statistics?.total?.percentage ?? 0,
            duplicates: report.duplicates || [],
        };
     } catch (readError) {
         console.error("Could not read jscpd report after jscpd process error:", readError);
     }
    console.warn("Returning default values for duplication due to jscpd error.");
    return { percentage: 0, duplicates: [] };
  }
}

async function runGenerateComponentList(): Promise<ComponentStatusData[]> { /* ... Same as previous ... */
    try {
        console.log(`Running component list generation (npm run docs:structure)... Expecting output at ${componentListPath}`);
        await execPromise('npm run docs:structure');
        console.log("Component list generation script finished.");
        try {
            await fs.access(componentListPath); // Check if file exists
            const listContent = await fs.readFile(componentListPath, 'utf-8');
            const list = JSON.parse(listContent);
            console.log(`Successfully read and parsed ${componentListPath}`);
            return list.map((item: any) => ({
                name: item.name || 'Unknown',
                location: item.path || 'Unknown',
                status: item.status || 'Needs Review',
                usageCount: item.usageCount || 0,
                notes: item.notes || "",
            }));
        } catch (fileError: any) {
            if (fileError.code === 'ENOENT') {
                 console.error(`Component list output file not found at expected location: ${componentListPath}. Please check 'npm run docs:structure' script output path or update 'componentListPath' in the API route.`);
            } else {
                console.error(`Error reading/parsing component list file (${componentListPath}):`, fileError);
            }
             throw fileError; // Re-throw
        }
    } catch (error: any) {
        console.error("Component list generation process failed:", error);
        console.warn("Returning empty array for component status due to script error.");
        return [];
    }
}

// --- POST Handler (Logic remains the same) ---
export async function POST() {
    console.log("API route /api/run-audit POST request received");
    let finalAuditData: AuditData | null = null;

    try {
        const results = await Promise.allSettled([
            runTsPrune(), // Now parses text
            runDepcheck(),
            runJscpd(),
            runGenerateComponentList(),
        ]);

        // Process results safely
        const tsPruneResult = results[0].status === 'fulfilled' ? results[0].value : [];
        const depcheckResult = results[1].status === 'fulfilled' ? results[1].value : { dependencies: [], devDependencies: [] };
        const jscpdResult = results[2].status === 'fulfilled' ? results[2].value : { percentage: 0, duplicates: [] };
        const componentListResult = results[3].status === 'fulfilled' ? results[3].value : [];

        // --- Calculations (Same as before) ---
        const unusedComponentsCount = tsPruneResult.length;
        const unusedDependenciesCount = depcheckResult.dependencies.length + depcheckResult.devDependencies.length;
        const duplicationPercentage = jscpdResult.percentage;
        const totalComponents = componentListResult.length;
        const standardizedCount = componentListResult.filter(c => c.status === "Standardized").length;
        let totalDependencies = 0;
        let healthScore = 0;
         try {
             const packageJsonPath = path.join(process.cwd(), 'package.json');
             const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
             const packageJson = JSON.parse(packageJsonContent);
             totalDependencies = Object.keys(packageJson.dependencies || {}).length + Object.keys(packageJson.devDependencies || {}).length;
             const unusedComponentsRatio = totalComponents > 0 ? (unusedComponentsCount / totalComponents) * 100 : 0;
             const unusedDependenciesRatio = totalDependencies > 0 ? (unusedDependenciesCount / totalDependencies) * 100 : 0;
             healthScore = Math.max(0, Math.round(100 - (0.4 * unusedComponentsRatio + 0.3 * unusedDependenciesRatio + 0.3 * duplicationPercentage)));
         } catch (pkgError) {
             console.error("Could not read package.json or calculate health score:", pkgError);
             healthScore = 0;
         }

        // --- Formatting (Same as before - tsPruneResult now contains correct {path, name} objects) ---
        const unusedComponentsDetail: UnusedComponentData[] = tsPruneResult; // Already formatted by runTsPrune
        const unusedDependenciesDetail: UnusedDependencyData[] = [
            ...depcheckResult.dependencies.map(name => ({ name, devDependency: false })),
            ...depcheckResult.devDependencies.map(name => ({ name, devDependency: true }))
        ];
         const duplicationsDetail: DuplicationData[] = jscpdResult.duplicates.map(d => ({
            sourceFile: d.firstFile?.name ?? 'N/A',
            targetFile: d.secondFile?.name ?? 'N/A',
            lines: d.lines ?? 0,
            tokens: d.tokens ?? 0,
         }));

        // --- Construct Final Data (Same as before) ---
        finalAuditData = { /* ... */
            timestamp: new Date().toISOString(),
            summary: { unusedComponentsCount, unusedDependenciesCount, duplicationPercentage, healthScore, standardizedCount, totalComponents, },
            details: { unusedComponents: unusedComponentsDetail, unusedDependencies: unusedDependenciesDetail, duplications: duplicationsDetail, componentStatus: componentListResult, },
        };

        // --- Write JSON Output File (Same as before) ---
        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(outputPath, JSON.stringify(finalAuditData, null, 2));
        console.log(`Audit data successfully written to ${outputPath}`);

        return NextResponse.json({ message: 'Audit completed successfully!' });

    } catch (error) { // --- Error Handling (Same as before) ---
        console.error("Error constructing/writing audit data:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred writing audit data.';
        return NextResponse.json({ message: 'Audit failed during final processing.', error: errorMessage }, { status: 500 });
    }
}