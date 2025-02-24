import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <nav className="flex justify-between w-full bg-blue-200 h-16 items-center px-10 absolute top-0">
        <div className="flex gap-4">
          <a href="">Home</a>
          <a className="" href="">List</a>
          <a href="">About Us</a>
        </div>

        <div className="">
          <a href="">Profile</a>
        </div>
      </nav>

      <div className="h-screen mt-20">
        <Outlet/>
      </div>

      <div className="bg-blue-200 h-32 w-full absolute bottom-0">
      </div>
    </>
  )
}

export default MainLayout