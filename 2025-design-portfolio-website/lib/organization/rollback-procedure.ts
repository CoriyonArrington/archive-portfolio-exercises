/**
 * Rollback Procedure
 *
 * This file defines the procedures for rolling back changes in case of issues
 * during the migration process.
 */

export type RollbackStep = {
    phase: string
    condition: string
    procedure: string[]
  }
  
  export const rollbackProcedures: RollbackStep[] = [
    {
      phase: "Any phase",
      condition: "Critical production bug introduced",
      procedure: [
        "Immediately roll back to the previous stable version: `git revert <commit-hash>`",
        "Deploy the reverted version to production",
        "Investigate the issue in a separate branch",
        "Fix the issue and test thoroughly before attempting migration again",
      ],
    },
    {
      phase: "Directory structure creation",
      condition: "Issues with directory structure",
      procedure: [
        "Reset the branch to the initial state: `git reset --hard HEAD~1`",
        "Review and fix the directory structure plan",
        "Re-run the setup script with corrections",
      ],
    },
    {
      phase: "Component migration",
      condition: "Components rendered incorrectly or with broken functionality",
      procedure: [
        "Identify the specific components causing issues",
        "Revert those specific component migrations: `git checkout HEAD~1 -- path/to/component`",
        "Fix the issues in the original component location",
        "Re-attempt migration with corrected components",
      ],
    },
    {
      phase: "Import updating",
      condition: "Broken imports causing build failures",
      procedure: [
        "Use the saved backup of the file before import changes",
        "Manually correct each import path",
        "Test the file in isolation before committing again",
      ],
    },
    {
      phase: "Page migration",
      condition: "Pages fail to render with new component structure",
      procedure: [
        "Revert the specific page to its original location: `git checkout HEAD~1 -- path/to/page`",
        "Create a compatibility layer between old and new component structures",
        "Gradually migrate page sections to use new components",
      ],
    },
    {
      phase: "API route migration",
      condition: "API endpoints return errors or incorrect data",
      procedure: [
        "Revert API routes to their original implementation: `git checkout HEAD~1 -- app/api`",
        "Test API endpoints with their original implementation",
        "Re-implement API changes with improved error handling",
      ],
    },
    {
      phase: "Full migration",
      condition: "Multiple issues across the codebase",
      procedure: [
        "If multiple critical issues are found, abandon the current branch",
        "Create a new branch from the main branch",
        "Take a more incremental approach, migrating one small section at a time",
        "Implement more comprehensive testing between migration steps",
      ],
    },
  ]
  
  export const preventativeMeasures = {
    backups: "Create backups of critical files before migration",
    testing: "Implement comprehensive tests for each component before and after migration",
    staging: "Deploy to a staging environment and test thoroughly before merging to main",
    documentation: "Document the migration process and rollback procedures for each phase",
    communication: "Communicate migration plans and potential issues to team members",
  }
  
  export const emergencyContacts = {
    technical: "Lead Developer - [NAME] ([EMAIL], [PHONE])",
    management: "Project Manager - [NAME] ([EMAIL], [PHONE])",
    deployment: "DevOps Engineer - [NAME] ([EMAIL], [PHONE])",
  }
  
  export const backupProcedure = `
  # Backup Procedure
  
  ## Before starting migration
  1. Create a complete backup of the codebase
  2. Ensure all work is committed to the repository
  3. Create a branch point tag for easy reference: \`git tag pre-refactor-backup\`
  
  ## During migration
  1. Commit frequently with descriptive messages
  2. Create backup branches at key milestones: \`git branch backup/milestone-1\`
  3. Push all branches and tags to remote repository
  
  ## Restoring from backup
  1. To restore the entire codebase: \`git checkout pre-refactor-backup\`
  2. To restore specific files: \`git checkout pre-refactor-backup -- path/to/file\`
  3. To restore a specific milestone: \`git checkout backup/milestone-1\`
  `
  
  