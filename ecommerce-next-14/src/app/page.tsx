import prisma from "@/lib/db/prisma"
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce - Radshodam",
  description: "Radshodam is your one-stop destination for a premium online shopping experience. Discover a wide range of high-quality products, from fashion and electronics to home decor and more. With a user-friendly interface, secure transactions, and reliable delivery services, we strive to make your online shopping journey convenient and enjoyable. Explore our curated collection....",
}

export default async function Home() {

  // Retrieve a list of users from the database using Prisma's 'findMany' method.
  // This function fetches all user records from the 'User' table.
  const products = await prisma.product.findMany(
    {
      // Sort the results by the 'id' field in descending order => from highest to lowest.
      orderBy: { id: "desc" }

    }
  )

  return (
    <div>
      {/* hero product */}
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link
              href={"/products/" + products[0].id}
              className="btn-primary btn"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>
      {/* other card products */}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

    </div>
  )
}
