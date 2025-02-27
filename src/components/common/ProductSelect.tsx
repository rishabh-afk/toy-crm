import { useEffect, useRef } from "react";

const ProductSelect = ({
  loading,
  searchTerm,
  setSearchTerm,
  filteredProducts,
  handleProductChange,
}: {
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredProducts: any[];
  handleProductChange: (productCode: string) => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchTerm]);

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Type to search products by name or code..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-xl mb-5 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400"
      />

      {searchTerm && (
        <div className="absolute top-12 z-50 w-full bg-gray-100 border border-gray-500 rounded-lg max-h-48 overflow-auto">
          {loading ? (
            <div className="p-2 text-gray-500">Loading...</div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => {
                  handleProductChange(product);
                  setSearchTerm(""); // Hide dropdown after selection
                }}
                className="px-4 py-2 cursor-pointer break-words hover:bg-gray-500 hover:text-white"
              >
                {product.name} ({product.productCode})
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSelect;
