import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radshodam',
  description: 'We make youre wallet cry',
}

export default function AddProductPage() {

  async function addProduct(formData: FormData) {
    "use server"
    console.log("formData", formData);

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
