// import prisma from "../../../config/database";
// import { LoginRequest } from "../../../dto/login-request";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken'

// export const login=async(data:LoginRequest)=>{

// const user=await prisma.user.findUnique({
//     where:{
//         email:data.email,
//         isActive:true
//     },
//     select:{
//         id:true,
//         firstName:true,
//         secondName:true,
//         email:true,
//         phone:true,
//         role:true,
//         passwordHash:true
//     }
// })
// if(!user){
//     return new Error("user does not exists")
// }

// //password comparison
// const isPasswordMatch=await bcrypt.compare(user.passwordHash,data.password)
// if(!isPasswordMatch){
//     return new Error("Invalid credentials")
// }
// const {passwordHash,...safeUser}=user;
// //return safeUser
// //token generation
// const accessToken=await jwt.sign()

// }