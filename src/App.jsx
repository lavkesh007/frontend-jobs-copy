import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './User/Components/UserLogin/login'
import Forgot from './User/Components/UserForgotPassword/forgot';
import Register from './User/Components/UserRegister/register'
import Otp from './User/Components/UserRegister/otp';
import RightSide from './User/Components/UserLogin/rightSide';
import RegisterRightSide from './User/Components/UserRegister/RightSide';
import Forgototp from './User/Components/UserForgotPassword/Forgototp';
import ChangePassword from './User/Components/UserForgotPassword/ChangePassword';
import Home from './User/Components/Home/home';
import JobsDetailCard from './User/Components/Jobs/JobDetailCard';
import JobsCard from './User/Components/Jobs/JobsCard';
import AddJob from './Admin/Components/AdminJobs/AddJob';
import UserProfile from './User/Components/UserProfile/UserProfile';
import AppliedJobs from './User/Components/UserProfile/AppliedJobs';
import ProfileRightSide from './User/Components/UserProfile/RightSide';
import AllJobs from './User/Components/Jobs/AllJobs';
import ContactMain from './User/Components/Contact/ContactMain';
import AdminLoginMain from './Admin/Components/AdminLogin/AdminLoginMain';
import AdminHomeMain from './Admin/Components/AdminHome/AdminHomeMain';
import RightAdminHome from './Admin/Components/AdminHome/RightAdminHome';
import AdminDetails from './Admin/Components/AdminProfile/AdminDetails';
import DeleteJob from './Admin/Components/AdminJobs/DeleteJob';
import AdminUserRequest from './Admin/Components/AdminResponse/AdminUserRequest';
import EditProfile from './User/Components/UserProfile/EditProfile';
import SettingMain from './User/Components/Settings/SettingMain';
import CheckPassword from './User/Components/Settings/CheckPassword';
import ChangeProfilePassword from './User/Components/Settings/ProfileChangePassword';
import Index from "./User/Components/Settings/index";
import ProfileForgot from './User/Components/Settings/ProfileForgot';
import DeleteUser from './User/Components/Settings/DeleteUser';
import AdminProtectiveRoute from './Admin/Components/ProtectiveRoute/AdminProtectiveRoute';
import UserProtectedRoute from './User/Components/ProtectedRoute/UserProtectedRoute';
import ApplyInfo from './Admin/Components/UserJobApplyInfo/ApplyInfo';
import UserInformation from './Admin/Components/UserInfo/UserInformation';

const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/home" element={<Home/>}/>
        <Route path="/user/login" element={<Login/>}>
            <Route index element={<RightSide/>}/>
            <Route path='forgot' element={<Forgot/>}/>
            <Route path='forgototp' element={<Forgototp/>}/>
            <Route path='changePassword' element = {<ChangePassword/>}/>
        </Route>
        <Route path = '/user/alljobs'element={<AllJobs/>}/>
        <Route path = '/user/contact'element={<ContactMain/>}/>


        <Route path='/user/profile' element = {<UserProtectedRoute><UserProfile/></UserProtectedRoute>}>
          <Route index element={<ProfileRightSide/>}/>
          <Route path='applied' element={<AppliedJobs/>}/>
          <Route path='edit' element={<EditProfile/>}/>
          <Route path='setting' element={<SettingMain/>}>
            <Route index element={<Index/>}/>
            <Route path = 'checkPassword' element={<CheckPassword/>}/>
            <Route path = 'changePassword' element={<ChangeProfilePassword/>}/>
            <Route path = 'forgot' element={<ProfileForgot/>}/>
            <Route path='delete' element={<DeleteUser/>}/>
          </Route>
        
        </Route>
        {/* <Route path='/user/profile' element={<UserProfile/>}>
          <Route index element={<ProfileRightSide/>}/>
          <Route path='applied' element={<AppliedJobs/>}/>
          <Route path='edit' element={<EditProfile/>}/>
          <Route path='setting' element={<SettingMain/>}>
            <Route index element={<Index/>}/>
            <Route path = 'checkPassword' element={<CheckPassword/>}/>
            <Route path = 'changePassword' element={<ChangeProfilePassword/>}/>
            <Route path = 'forgot' element={<ProfileForgot/>}/>
            <Route path='delete' element={<DeleteUser/>}/>
          </Route>
        </Route> */}


        <Route path='/user/jobDetail/:id' element={<JobsDetailCard/>}/>
        <Route path='/user/job' element={<JobsCard/>}/>
      

        <Route path="/user/register" element={<Register />}> 
        <Route index element={<RegisterRightSide />} />
        <Route path="otp" element={<Otp />} />
        </Route>

        <Route path='/admin/login' element={<AdminLoginMain/>}/>

        {/* <Route path='/admin/dashboard' element={<AdminHomeMain/>}>
          <Route index element={<RightAdminHome/>}/>
          <Route path="addJob" element={<AddJob/>}/>
          <Route path="profile" element={<AdminDetails/>}/>
          <Route path="deleteJob" element={<DeleteJob/>}/>
          <Route path="userMessage" element={<AdminUserRequest/>}/>
        </Route> */}

        <Route path='/admin/dashboard' element={
            <AdminProtectiveRoute>
              <AdminHomeMain/>
            </AdminProtectiveRoute>
          }>
            <Route index element={<RightAdminHome/>}/>
          <Route path="addJob" element={<AddJob/>}/>
          <Route path="profile" element={<AdminDetails/>}/>
          <Route path="deleteJob" element={<DeleteJob/>}/>
          <Route path="userMessage" element={<AdminUserRequest/>}/>
          <Route path="userApplyInfo" element={<ApplyInfo/>}/>
          <Route path='userInfo' element={<UserInformation/>}/>
          </Route>
        

        <Route path="*" element={
            <div className="flex items-center justify-center h-screen text-2xl">
              404 - Page Not Found
            </div>
          } />
        {/* <Route path='/admin/addJob' element={<AddJob/>} /> */}
      </Routes>
   </BrowserRouter>
  )
}

export default App
