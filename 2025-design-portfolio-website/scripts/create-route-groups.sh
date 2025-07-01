#!/bin/bash

# Create the route groups
echo "Creating route groups..."

# Create main route group
echo "Creating app/(main) route group..."
mkdir -p "app/(main)"

# Create admin route group
echo "Creating app/(admin) route group..."
mkdir -p "app/(admin)"

# Create API directories
echo "Creating API directories..."
mkdir -p "app/api/projects"
mkdir -p "app/api/testimonials"
mkdir -p "app/api/services"

echo "Route groups have been created."
echo "You can now manually move files into these directories."

