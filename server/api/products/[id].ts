import { readFile } from 'fs/promises'
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  try {
    const json = await readFile('server/data.json', 'utf-8')
    const products = JSON.parse(json)
    const product = products.find((p: any) => String(p.id) === id)

    if (!product) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }

    return product
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})