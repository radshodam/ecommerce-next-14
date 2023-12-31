import prisma from "@/lib/db/prisma"
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import PaginationBar from "@/components/PaginationBar";


interface HomeProps {
  searchParams: { page: string };
}


export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {

  // Retrieve a list of users from the database using Prisma's 'findMany' method.
  // This function fetches all user records from the 'User' table.
  const products = await prisma.product.findMany(
    {
      // Sort the results by the 'id' field in descending order => from highest to lowest.
      orderBy: { id: "desc" }

    }
  )

  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  return (
    <div>
      {/* hero product */}
      <div className="hero rounded-xl bg-base-200">
        {currentPage === 1 && (
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full h-96 max-w-sm object-cover md:max-w-xl rounded-lg shadow-2xl"
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
          </div>)
        }
      </div>
      {/* other card products */}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="flex justify-center">
        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>


    </div>
  )
}
