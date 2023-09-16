import { useDispatch, useSelector } from "react-redux"
import { loggingOut } from "../store/slices/userSlice"

function Navbar() {
  const user = useSelector(state => state.user.isSignedIn)
const dispatch=useDispatch();
  return (
    <nav className='flex h-14 justify-between  items-center shadow-lg dark:bg-neutral-700'>
      <a href="/">  <p className=' text-[#12fAff] text-4xl ml-10  font-semibold'>Note<span className='text-[#fafafa]'>Share</span></p> </a>
      <ul className='flex mr-24 gap-10 font-medium text-xl text-[#12fAff]'>
        <li className=' cursor-pointer'><a href="/about" >About</a></li>
        {user ? <>
          <li className=' cursor-pointer'><a href="/editor" >Editor</a></li>
          <li className=' cursor-pointer'><a href="/about" >Dashboard</a></li>
          <li className=' cursor-pointer'><button onClick={()=>dispatch(loggingOut())} >Logout</button></li>
        </> : <>
          <li className=' cursor-pointer'><a href="/signup" >Sign In</a></li>
          <li className=' cursor-pointer'><a href="/login" >Log In</a></li>
        </>}

      </ul>
    </nav>
  )
}

export default Navbar