import Navbar from "../../components/Navbar"
import Dashboard from "./Dashboard"
import SideBar from "./SideBar"


const AdminPage = () => {
  return (
    <div className=" bg-blue-100 w-full h-screen">
      <Navbar />
      <SideBar />
      <Dashboard />
    </div>
  )
}

export default AdminPage
