export interface ProductInterface {
    id: number
    title: string
    price: number
    description: string
    category: CategoryInterface
    images: string[]
}

export interface CategoryInterface {
    id: number
    name: string
}

