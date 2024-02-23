import UploaderModal from "./UploaderModal.jsx"
import { useState } from "react"

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div className='bg-neutral-900 px-5 md:px-10 flex justify-between fixed top-0 w-full h-20'>
        <div>

        </div>
        <div className='flex h-full items-center'>
          <button
            onClick={() => { setIsModalOpen(true) }}
            className='px-5 font-mono rounded-sm text-lg text-black bg-white'
          >
            Upload
          </button>
        </div>
      </div>
      {
        isModalOpen && <UploaderModal setIsModalOpen={setIsModalOpen} />
      }

    </>
  )
}

export default Header