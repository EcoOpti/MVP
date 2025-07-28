import React, { useState, useEffect } from "react";
import { ShipmentOptimization } from "@/entities/ShipmentOptimization";
import { Product } from "@/entities/Product";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  Sparkles,
  Zap,
  PlusCircle,
  FileDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import OptimizationResults from "../components/optimizer/OptimizationResults";
import SavingsCalculator from "../components/optimizer/SavingsCalculator";

export default function Optimizer() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    quantity: 1
  });
  
  const [optimization, setOptimization] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await Product.list();
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProductId(productId);
      setFormData({
        productName: product.name,
        length: product.dimensions.length,
        width: product.dimensions.width,
        height: product.dimensions.height,
        weight: product.weight,
        quantity: 1,
      });
    }
  };
  
  const handleInputChange = (field, value) => {
    setSelectedProductId(""); // Deselect product if user manually changes details
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const optimizePackaging = async () => {
    if (!formData.productName || !formData.length || !formData.width || !formData.height || !formData.weight) {
      return;
    }
    setIsOptimizing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const productVolume = parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height);
    const currentBoxVolume = productVolume * 2.5;
    const optimizedBoxVolume = productVolume * 1.3;
    
    const currentBoxDimensions = {
      length: Math.ceil(parseFloat(formData.length) * 1.4),
      width: Math.ceil(parseFloat(formData.width) * 1.4), 
      height: Math.ceil(parseFloat(formData.height) * 1.4)
    };
    
    const optimizedBoxDimensions = {
      length: Math.ceil(parseFloat(formData.length) * 1.1),
      width: Math.ceil(parseFloat(formData.width) * 1.1),
      height: Math.ceil(parseFloat(formData.height) * 1.1)
    };

    const savings = {
      cost: (currentBoxVolume - optimizedBoxVolume) * 0.003,
      volume: currentBoxVolume - optimizedBoxVolume,
      co2: (currentBoxVolume - optimizedBoxVolume) * 0.0001,
      plastic: (currentBoxVolume - optimizedBoxVolume) * 0.0002
    };

    const optimizationData = {
      product_name: formData.productName,
      product_dimensions: {
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        height: parseFloat(formData.height)
      },
      product_weight: parseFloat(formData.weight),
      quantity: parseInt(formData.quantity),
      current_box: {
        type: "Standard Box",
        dimensions: currentBoxDimensions,
        cost: 1.50
      },
      optimized_box: {
        type: "Optimized Box",
        dimensions: optimizedBoxDimensions,
        cost: 1.50 - savings.cost
      },
      savings: savings
    };

    setOptimization(optimizationData);
    setIsOptimizing(false);
  };

  const saveOptimization = async () => {
    if (optimization) {
      await ShipmentOptimization.create(optimization);
      setOptimization(null);
      setFormData({ productName: "", length: "", width: "", height: "", weight: "", quantity: 1 });
      setSelectedProductId("");
    }
  };
  
  const isFormValid = formData.productName && formData.length && formData.width && formData.height && formData.weight;

  return (
    <div className="space-y-6">
       <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-800">Packaging Optimizer</h1>
        <p className="text-slate-500 mt-1">Find the most cost-effective and sustainable packaging for your products.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>1. Select or Enter Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productSelect">Select a Saved Product</Label>
                <Select onValueChange={handleProductSelect} value={selectedProductId}>
                  <SelectTrigger id="productSelect">
                    <SelectValue placeholder="Or enter details manually below..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name} ({p.sku})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" placeholder="e.g. Premium Coffee Mug" value={formData.productName} onChange={(e) => handleInputChange('productName', e.target.value)} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label htmlFor="length">Length (cm)</Label><Input id="length" type="number" placeholder="30" value={formData.length} onChange={(e) => handleInputChange('length', e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="width">Width (cm)</Label><Input id="width" type="number" placeholder="20" value={formData.width} onChange={(e) => handleInputChange('width', e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="height">Height (cm)</Label><Input id="height" type="number" placeholder="10" value={formData.height} onChange={(e) => handleInputChange('height', e.target.value)} /></div>
              </div>

               <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="weight">Weight (g)</Label><Input id="weight" type="number" placeholder="500" value={formData.weight} onChange={(e) => handleInputChange('weight', e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="quantity">Quantity</Label><Input id="quantity" type="number" min="1" value={formData.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} /></div>
              </div>
              
              <Button onClick={optimizePackaging} disabled={!isFormValid || isOptimizing} className="w-full bg-green-600 hover:bg-green-700">
                {isOptimizing ? <><Zap className="w-4 h-4 mr-2 animate-spin" />Calculating...</> : <><Calculator className="w-4 h-4 mr-2" />Optimize Packaging</>}
              </Button>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!optimization && !isOptimizing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="border-dashed border-2 text-center py-20">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700">Awaiting Optimization</h3>
                  <p className="text-slate-500 text-sm">Your results will appear here.</p>
                </Card>
              </motion.div>
            )}
            {isOptimizing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="border-dashed border-2 text-center py-20">
                  <Zap className="w-12 h-12 text-green-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold text-slate-700">Optimizing...</h3>
                  <p className="text-slate-500 text-sm">Finding the most efficient solution.</p>
                </Card>
              </motion.div>
            )}
            {optimization && (
              <OptimizationResults 
                optimization={optimization}
                onSave={saveOptimization}
              />
            )}
          </AnimatePresence>
          {optimization && (
             <SavingsCalculator savings={optimization.savings} />
          )}
        </div>
      </div>
    </div>
  );
}
