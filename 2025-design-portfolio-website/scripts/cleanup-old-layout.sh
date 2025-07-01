#!/bin/bash

# Backup the old layout components
mkdir -p backups/components/layout
cp -r components/layout/header backups/components/layout/
cp -r components/layout/footer backups/components/layout/
cp -r components/layout/navigation backups/components/layout/

# Remove the old layout component directories
rm -rf components/layout/header
rm -rf components/layout/footer
rm -rf components/layout/navigation

echo "Cleaned up old layout component directories"

