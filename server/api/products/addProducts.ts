import { readFile, writeFile } from 'fs/promises'
import { Product } from '../../../types/product'

export default defineEventHandler(async (event) => {
    const product = await readBody(event)
    const products = JSON.parse(await readFile('server/data.json', 'utf-8'))
    const newId = products.length > 0 ? Math.max(...products.map((p: Product) => p.id)) + 1 : 1
    const now = new Date().toISOString()
    const newProduct = {
        ...product,
        id: newId,
        created_at: now,
        updated_at: now,
    }
    products.push(newProduct)
    await writeFile('server/data.json', JSON.stringify(products, null, 2))
    return newProduct
})