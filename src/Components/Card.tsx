'use client'
import { ProductInterface } from '@/type/Product'
import Image from '@/Components/Image'
import Title from '@/Components/Title'
import Description from '@/Components/Description'
import Price from '@/Components/Price'
import SeeDetailButton from '@/Components/SeeDetailButton'
import AddToCartButton from '@/Components/AddToCartButton'


const Card = ({ data }: { data: ProductInterface[] }) => {

  if (!data || data.length === 0) {
    return null
  }

  console.log(data)

  return (
    <>
      {data.length > 0 &&
          data.map((item: ProductInterface) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-full"
              >
              <Image itemImageProps={item.images[0]} />
              <div className="p-5 flex flex-col flex-grow">
                <Title itemTitleProps={item.title} />
                <Description itemDescriptionProps={item.description} />
                <Price itemPriceProps={item.price} />
                <div className="flex flex-col sm:flex-row gap-2 justify-between mt-auto">
                  <SeeDetailButton itemIdProps={item.id} />
                  <AddToCartButton itemProps={item} />
                </div>
              </div>
            </div>
          ))}
    </>
  )
}

export default Card