import { readFile, writeFile } from 'fs/promises'

export default defineEventHandler(async (event) => {
  const idParam = getQuery(event).id
  const id = Number(idParam)

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid product ID' })
  }

  try {
    const file = await readFile('server/data.json', 'utf-8')
    const products = JSON.parse(file)

    const index = products.findIndex((p: any) => p.id === id)
    if (index === -1) {
      throw createError({ statusCode: 404, message: 'Product not found' })
    }

    products.splice(index, 1)
    await writeFile('server/data.json', JSON.stringify(products, null, 2), 'utf-8')

    return { success: true, message: 'Product deleted successfully' }
  } catch (error: any) {
    throw createError({ statusCode: 500, message: error.message || 'Server error' })
  }
})