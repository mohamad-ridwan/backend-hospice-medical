const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

app.use(cors())

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const uri = process.env.MONGO_DB_URI

const PORT = process.env.PORT || 6500

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const navbarRoutes = require('./src/routes/navbar')
const footerRoutes = require('./src/routes/footer')
const headerPageRoutes = require('./src/routes/headerPage')
const procedureCategoryRoutes = require('./src/routes/procedureCategory')
const aboutMyselfRoutes = require('./src/routes/aboutMyself')
const feedbackRoutes = require('./src/routes/feedback')
const ourOfferedServicesRoutes = require('./src/routes/ourOfferedServices')
const servicingHoursRoutes = require('./src/routes/servicingHours')
const blogRoutes = require('./src/routes/blog')
const doctorsRoutes = require('./src/routes/doctors')
const contactRoutes = require('./src/routes/contact')
const usersRoutes = require('./src/routes/users')
const verificationRoutes = require('./src/routes/verification')
const adminRoutes = require('./src/routes/admin')
const blackListJwtRoutes = require('./src/routes/blackListJwt')
const loketRoutes = require('./src/routes/loket')
const finishedTreatmentRoutes = require('./src/routes/finishedTreatment')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images')
    },
    filename: (req, file, cb)=>{
        cb(null, `${new Date().getTime()}` + '-' + file.originalname)
    }
})

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage}).single('image'))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credential", "true")
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, Jwt-Token")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

app.use('/v1/navbar', navbarRoutes)
app.use('/v2/footer', footerRoutes)
app.use('/v3/header-page', headerPageRoutes)
app.use('/v4/procedure-category', procedureCategoryRoutes)
app.use('/v5/about-myself', aboutMyselfRoutes)
app.use('/v6/feedback', feedbackRoutes)
app.use('/v7/our-offered-services', ourOfferedServicesRoutes)
app.use('/v8/servicing-hours', servicingHoursRoutes)
app.use('/v9/blog', blogRoutes)
app.use('/v10/doctors', doctorsRoutes)
app.use('/v11/contact', contactRoutes)
app.use('/v12/users', usersRoutes)
app.use('/v13/verification', verificationRoutes)
app.use('/v14/admin', adminRoutes)
app.use('/v15/black-list-jwt', blackListJwtRoutes)
app.use('/v16/loket', loketRoutes)
app.use('/v17/finished-treatment', finishedTreatmentRoutes)

app.use((error, req, res, next)=>{
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})

// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=>{
//     app.listen(PORT, ()=>console.log(`Server connect on ${PORT}`))
// })
// .catch((err)=>console.log(err))