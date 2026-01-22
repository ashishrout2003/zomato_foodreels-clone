import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/Food PartnerLogin'
import Home  from '../pages/General/home';
import Saved from '../pages/General/Saved';
import CreateFood from '../pages/food-partner/CreateFoodPartner';
import Profile from '../pages/food-partner/Profile';
const AppRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
          <Route path="/food-partner/login" element={< FoodPartnerLogin/>} />
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-food" element={<CreateFood />} />
          <Route path='/food-partner/:id' element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default AppRoutes