import NotFoundPage from "@/app/not-found";
import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { cache } from "react";


interface ProductPageProps {
    params: {
        id: string
    }
};


// cache
// Caching is a method of storing data temporarily in memory, 
// allowing for faster retrieval of frequently used data. 
// This optimization helps reduce redundant database queries and, in turn,
// improves the overall performance of the application.
// cache

const getProduct = cache(async (id: string) => {

    // findUnique
    // Retrieve a specific product from the database using Prisma's 'findUnique' method.
    // The 'id' variable is used to specify the unique identifier of the product.
    // This function fetches a single product based on its 'id' from the 'product' table.
    // findUnique
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) NotFoundPage();
    return product;

})




export async function generateMetadata({ params: { id } }: ProductPageProps) {

    const product = await getProduct(id);

    return {
        title: product?.name + " - Radshodam",
        description: product?.description,
        openGraph: {
            images: [{ url: product?.imageUrl }],
        },
    }

}

export default async function ProductPage({ params: { id } }: ProductPageProps) {

    const product = await getProduct(id);

    if (!product) NotFoundPage

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {product &&
                <Image
                    src={product?.imageUrl}
                    alt={product?.description}
                    width={500}
                    height={500}
                    className="rounded-lg"
                    priority
                />}
            <div>
                <h1 className="text-5xl font-bold">{product?.name}</h1>
                {product && product.price &&
                    <PriceTag price={product?.price} className="mt-4" />
                }
                <p className="py-6">{product?.description}</p>
            </div>
        </div>
    )
}
