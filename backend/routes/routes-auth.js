import express from "express"
import Users from "../model/userMongo.js"
import multer from "multer"

import config from "../config/config.js"
import passport from "passport"
import isAuthenticated from "../helpers/isAuth.js"
import {upload} from "../helpers/multer.js"

const router = express.Router()

router.post("/signup", upload.single("file"), async (req, res) => {
   //console.log(req.body)
   //console.log(req.file)
   const {email, password, nombre, direccion, edad, telefono} = req.body
   const foto = req.file.path
   const buscado = await Users.getUserByEmail(email)
   if (buscado) {
      console.log("usuario existe")
      res.status(400).json({errorMessage: "Ya existe un usuario con ese correo"})
   } else {
      console.log("Creando Usuario")

      const newUser = new Users.model({
         email,
         password,
         nombre,
         direccion,
         edad,
         telefono,
         foto,
      })
      newUser.password = await newUser.encryptPass(password)
      //console.log("user con pass hasheado", newUser)
      await newUser.save()

      res.json({successMessage: "Registration Succes. Please Login"})
   }
})

router.post("/login", (req, res, next) => {
   console.log("desde post")
   passport.authenticate("local", (err, user, info) => {
      if (user) {
         req.logIn(user, (err) => {
            if (err) throw err
            let user = req.user
            console.log(user, "USUARIO")
            res.json({auth: true, user: req.user, msg: "Exitosó"}).send()
         })
      } else {
         console.log(info)

         res.status(400).json({errorMessage: info.message})
      }
      //console.log("user", user)
   })(req, res, next)
})

///

router.get("/user", isAuthenticated, (req, res) => {
   console.log(req.isAuthenticated())
   if (req.user) {
      res.json(req.user)
   } else {
      res.status(400).json({errorMessage: "Not Logged"})
   }
})

router.get("/logout", (req, res) => {
   // res.json({user: req.session.user, msg: "Adios"})
   req.session.destroy((err) => {
      if (err) {
         console.log(err)
      }
      req.logOut()
      res.clearCookie("connect.sid")

      return res.json({msg: "Adios"})
   })
})

export default router