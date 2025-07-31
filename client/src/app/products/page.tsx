"use client";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error, getProducts, createProduct } = useProducts();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quality: "",
    price: 0,
    imageUrl: "",
  });

  useEffect(() => {
    getProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [id]: id === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createProduct(newProduct);
    if (created) {
      setIsSheetOpen(false);
      setNewProduct({ name: "", quality: "", price: 0, imageUrl: "" });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Product</SheetTitle>
              <SheetDescription>
                Fill in the details below to add a new product.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="quality">Quality</Label>
                <Input
                  id="quality"
                  placeholder="Enter product quality"
                  value={newProduct.quality}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="Enter image URL (optional)"
                  value={newProduct.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Product"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>No products found. Create one!</p>
        )}
        {!loading && !error && products.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quality}</TableCell>
                  <TableCell>
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
}
