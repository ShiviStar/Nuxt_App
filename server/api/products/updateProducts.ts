import { readFile, writeFile } from 'fs/promises'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const products = JSON.parse(await readFile('server/data.json', 'utf-8'))
  const index = products.findIndex((p: any) => p.id === body.id)
  products[index] = { ...products[index], ...body, updated_at: new Date().toISOString() }
  await writeFile('server/data.json', JSON.stringify(products, null, 2))
  return products[index]
})