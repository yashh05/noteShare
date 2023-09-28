import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate , Link} from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import NavbarMui from '../components/NavbarMui';
import Navbar2 from '../components/Navbar2';
import DataTable from '../components/HomePageTable';

function HomePage() {
  let [isOpen, setIsOpen] = useState(false)
  const [fileName,setFileName]=useState("");
  const userId= useSelector(state=>state.user.userId)
  const [error,setError]=useState("")

  const navigate= useNavigate(); 

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  async function handleNewFile() {
      try{
        const data=await fetch("https://noteshare-production-3cb7.up.railway.app/files/createfile",{
          method:"POST",
          headers:{
            'content-Type':'application/json',
          },
          body:JSON.stringify({
            userId,
            fileName,
          })
        }).then((res)=>res.json())
        
        if(data.error){
          setError(data.error);
        }else{
          navigate(`/${data.id}`)
          closeModal()
        }
        //
      }catch(e){
        console.log(e.error);
      }


      // closeModal();
  }


  return (
    <>
    {/* <NavbarMui /> */}
    <Navbar2 />
      <div >
        <div className=' bg-[#FEFFFE] h-52 flex justify-center items-center'>
        <button onClick={openModal}><img src="/resources/add-icon.png" alt="add document" className=" max-w-[100px]" /></button>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center mb-5 font-medium leading-6 text-gray-900"
                    >
                      Please fill the Details
                    </Dialog.Title>
                    <p className='text-red-700 text-center'>{error? error:" "}</p>
                    <div className="mt-2 flex flex-col gap-2">
                      <label htmlFor='fileName' className="text-sm text-gray-500">
                        Enter the name of file
                      </label>
                      <input type='text' id='fileName' onChange={(e)=>setFileName(e.target.value)} className=' px-3 py-1 rounded-lg' />
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleNewFile}
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* <div>
          {fileArray.length!==0 && fileArray.map((file)=>{
            return <li><Link to={`/${file._id}`}>{file.fileName}</Link></li>
          })}
        </div> */}

        <DataTable />
      </div>
    </>
  )
}

export default HomePage