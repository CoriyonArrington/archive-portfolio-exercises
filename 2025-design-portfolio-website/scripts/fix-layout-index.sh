#!/bin/bash

# Fix the layout index file
echo 'export { default as Header } from "./header"
export { default as Footer } from "./footer"' > components/layout/index.ts

echo "Fixed layout index file"

