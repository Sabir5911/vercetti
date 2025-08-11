
import React from 'react'
import { client } from '@/sanity/lib/client'
 

export default async function Page() {
  const query = `*[_type == "product"]{
    _id,
    id,
    name,
    slug,
    description,
    price,
    images[]{
      asset->{
        _id,
        url
      }
    },
    category,
    inStock
  }`

  const products = await client.fetch(query)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product: any) => (
        <div key={product._id} className="border-none  rounded shadow-lg shadow-black p-2 flex flex-col">
          {product.images?.[0]?.asset?.url && (
            <img
              src={product.images[0].asset.url}
              alt={product.name}
              className="h-96 w-full object-cover rounded  mb-4 "
            />
          )}
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-600 flex-grow">{product.description.slice(0, 100)}...</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-indigo-600">${product.price.toFixed(2)}</span>
            {product.inStock ? (
              <span className="text-green-600 font-semibold">In Stock</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
