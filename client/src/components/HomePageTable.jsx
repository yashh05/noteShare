import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect, Fragment } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DataTable = () => {
  const [fileArray, setFileArray] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  let [isOpen, setIsOpen] = useState(false);
  const [accessError,setAccessError]=useState("")
  const [accessEmail, setAccessEmail] = useState("");
  // const [removeAccess, setRemoveAccess] = useState("");
  const [fileId, setFileId] = useState("");
  const [giveAccess, setGiveAccess] = useState(true);
  // const columns = ["File Name", "Edit","Delete"];

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    fetch("https://noteshare-production-3cb7.up.railway.app/files/getfiles", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    })
      .then((res) => res.json())
      .then((getFiles) => setFileArray(getFiles));
  }, [userId]);

  // async function handleAccessChange() {
  //   // console.log(giveAccess ,  removeAccess);
  //   await fetch("http://localhost:8080/files/editaccessfile", {
  //     method: "DELETE",
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       giveAccess,
  //       removeAccess,
  //       fileId
  //     }),
  //   })
  //   closeModal();
  // }

  async function handleGiveAccess(){
    const url = `https://noteshare-production-3cb7.up.railway.app/files/${giveAccess ? 'giveaccess' : 'removeaccess'}`;
    fetch(url,{
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        accessEmail,
        fileId
      }),
    })
    .then((res)=> res.json())
    .then(data=>{
      if(data.error){
        setAccessError(data.error)
        console.log(accessError);
      } 
      else closeModal(); 
    })

    
  }

  async function handleFileDelete(fileId) {
    await fetch("https://noteshare-production-3cb7.up.railway.app/files/deletefile", {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        fileId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        const new_arr = fileArray.filter((file) => {
          return file._id !== fileId;
        });
        setFileArray(new_arr);
      });
  }

  const data = fileArray.map((file) => {
    return { fileName: file.fileName, fileId: file._id };
  });

  return (
    <>
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

                  <div className="mt-2 flex flex-col gap-2">
                    <div className=" w-full flex mb-3 ">
                      <div
                        className={`w-3/6 text-center rounded-full ${
                          giveAccess ? "text-white bg-[#4086F4]" : ""
                        }`}
                      >
                        <button onClick={() =>{
                         setGiveAccess(true)
                        }}>
                          giveAccess
                          </button>
                      </div>

                      <div
                        className={`w-3/6 text-center rounded-full ${
                          !giveAccess ? "text-white bg-[#4086F4]" : ""
                        }`}
                      >
                        <button onClick={() =>{
                         setGiveAccess(false)
                        }}>
                          Remove Access
                        </button>
                      </div>
                    </div>

                        <label
                          htmlFor="newAccessUser"
                          className="text-sm text-gray-500"
                        >
                         {giveAccess ?  "Enter the Email of the User to give access":" Enter the Email of the User to Remove access"}
                        </label>

                        <input
                          type="text"
                          id="newAccessUser"
                          placeholder="Email"
                          onChange={(e) => setAccessEmail(e.target.value)}
                          className=" px-3 py-1 rounded-lg focus:outline-none"
                        />

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border
                       border-transparent bg-blue-100 px-4 py-2 text-sm 
                       font-medium text-blue-900 hover:bg-blue-200 focus:outline-none
                        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={()=>handleGiveAccess()}
                          >
                            Save
                          </button>
                        </div>
                
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <table className="font-poppins border-collapse border-2 mb-20 shadow-lg  bg-white rounded-lg mt-10 pt-5 m-auto w-3/5">
        <caption class="caption-top" className="text-3xl mb-5">
          Your Files
        </caption>
        <thead>
          <tr>
            <th className=" text-left pl-6">File Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className=" [&>*:nth-child(odd)]:bg-[#F2F2F2]">
          {data.map((row) => {
            return (
              <tr key={row.fileId} className="mt-20 ">
                <td className=" cursor-pointer font-bold font-poppins text-[#26A1F4] pl-6">
                  <Link to={`/${row.fileId}`}>{row.fileName}</Link>
                </td>
                <td>
                  <button
                    className=" w-full"
                    onClick={() => {
                      openModal();
                      setFileId(row.fileId);
                    }}
                  >
                    {" "}
                    <img
                      src="/resources/pen.png"
                      alt=""
                      className="mx-auto w-[22px]"
                    />
                  </button>
                </td>
                <td className="flex ">
                  <button
                    onClick={() => handleFileDelete(row.fileId)}
                    className="mx-auto"
                  >
                    <img
                      src="/resources/delete-doc.png"
                      alt=""
                      className="w-[30px] mx-auto cursor-pointer"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
