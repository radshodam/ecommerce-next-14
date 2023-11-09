"use server";
// Importing functions related to the database and caching
import { createCart, getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

// Function to increment the quantity of a product in the shopping cart
export async function incrementProductQuantity(productId: string) {
  // Retrieve the shopping cart using getCart or createCart
  const cart = (await getCart()) ?? (await createCart());

  // Check if the product with productId is already in the shopping cart
  const articleInCart = cart.items.find((item) => item.productId === productId);

  // If the product exists, increment its quantity
  if (articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    });
  } else {
    // If the product doesn't exist, create a new item
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    });
  }

  // Revalidate the cache for the path related to the product with the specified id
  revalidatePath("/products/[id]");
}
