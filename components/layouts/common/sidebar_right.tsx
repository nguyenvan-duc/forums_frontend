type Props = {}
export function SidebarRight({}: Props) {
  return (
    <div className='w-full border p-3 rounded-md bg-gray-50'>
      <div className='w-full border-b pb-2 flex justify-between items-center'>
        <h2 className='text-lg font-semibold'>Bookmark</h2>
        <a className='text-sm text-blue-500 hover:underline hover:cursor-pointer'>xem tất cả</a>
      </div>
      <ul className='w-full'>
        <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
          <a>
            I am trying to run a standalone Django script but i keep getting
            this error: ModuleNotFoundError: No module named
          </a>
        </li>
        <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
          <a>
            I am trying to run a standalone Django script but i keep getting
            this error: ModuleNotFoundError: No module named
          </a>
        </li>
      </ul>
    </div>
  )
}
