"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useState } from "react"

export default function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Custom Drawer Component</h2>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Custom Drawer</DrawerTitle>
            <DrawerDescription>This is a custom drawer component that replaces vaul.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <p>This drawer is compatible with React 19 and doesn't require additional dependencies.</p>
          </div>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button>Save changes</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
