// 'use client'

// import { createContext, ReactNode, FC, useContext, useState, useEffect } from 'react';


// export interface ProductData {
//     id : number
//     title : string
//     price : number
//     description : string
//     images : string 
// }

// interface ProductContextType {
//     productData: ProductData[]
// }


// const ProductContext = createContext<ProductContextType | undefined> (undefined)

// interface ProductProviderProps {
//     children: ReactNode
// }

// export const ProductProvider : FC<ProductProviderProps> = ({children}) => {
//     const [productData, setProductData] = useState<ProductData[]>([])
    
//     const fetchProductData = async () => {
//         try {
//             const response = await fetch('https://api.escuelajs.co/api/v1/products')
//             const data = await response.json()
//             setProductData(data)
//         } catch (error) {
//             console.error('Error fetching product data:', error)
//         }
//     }
//     useEffect(() => {
//         fetchProductData()
//     }, [])

//     return (
//         <ProductContext.Provider value={{productData}}>
//             {children}
//         </ProductContext.Provider>
//     )
// }

// export const useProduct = () => {
//     const context = useContext(ProductContext)
//     if(context === undefined){
//         throw new Error('productUser must be used within ProductProvider')
//     }

//     return context
// }