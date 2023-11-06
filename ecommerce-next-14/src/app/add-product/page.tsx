import prisma from '@/lib/db/prisma'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { date } from 'zod'

export const metadata: Metadata = {
  title: 'Radshodam',
  description: 'We make youre wallet cry',
}

export default function AddProductPage() {

  async function addProduct(formData: FormData) {
    "use server"

    const name = formData.get('name')?.toString()
    const description = formData.get('description')?.toString()
    const imageUrl = formData.get('imageUrl')?.toString()
    const price = Number(formData.get('price') || 0)

    if (!name || !description || !imageUrl || !price) {
      throw new Error("Missing required fields");
    }

    //don't show product run => npx prisma generate
    await prisma.product.create({
      data: { name, description, imageUrl, price }
    })

    //redirect => next navigation
    redirect('/')
  }
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct} >
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full focus:input-primary "
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full focus:input-primary "
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full focus:input-primary "
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full focus:input-primary "
        />
        <button className={`btn-primary btn`} type="submit">
          submit
        </button>
      </form>
    </div>
  )
}
