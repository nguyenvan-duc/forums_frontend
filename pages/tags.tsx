import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { MainLayout } from '@/components/layouts';


type Props = {}
const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
]
const Tags = (props: Props) => {
  return (
    <div>
      <div className=' p-3'>
        <div className='mt-1 w-3/12 relative rounded-md shadow-sm mb-6'>
          <input
            type='text'
            name='price'
            id='price'
            className='border cursor-pointer py-2 block w-full pl-3 pr-44 font-medium sm:text-sm text-gray-500 border-gray-300 rounded-md outline-none'
            placeholder={'Tìm kiếm...'}
          />
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <button disabled={true} className='p-3'>
              <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-y-3 sm:grid-cols-2 gap-x-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3'>
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className='border bg-gray-50 border-gray-100 p-3'>
              <button className='px-2 text-sm text-blue-800 rounded-sm py-1 mb-2 bg-indigo-50'>
                #Tag
              </button>
              <p>
                To get social media testimonials like these, keep your customers
                engaged with your social media accounts by posting regularly
                yourself
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
Tags.Layout = MainLayout
Tags.sidebarRight = false
Tags.SidebarLeft = true
Tags.requestAuth = false
export default Tags
