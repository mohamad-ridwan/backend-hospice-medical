const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/servicingHours')

router.post('/post/servicing', useControllers.postServicing)
router.post('/post/servicing/data/:_id', useControllers.postServicingData)
router.post('/post/book-an-appointment', useControllers.postBookAnAppointment)
router.post('/post/book-an-appointment/disease-type/:_id', useControllers.postDiseaseType)
router.post('/post/book-an-appointment/user-appointment-data/:_id', useControllers.postUserAppointmentData)
router.post('/post/book-an-appointment/user-appointment-data/is-confirm/:_id/:id', useControllers.postConfirmAppointmentDate)
router.put('/put/servicing/:_id', useControllers.putServicing)
router.put('/put/servicing/data/:_id/:id', useControllers.putServicingData)
router.put('/put/book-an-appointment/disease-type/:_id/:jenis', useControllers.putDiseaseType)
router.put('/put/book-an-appointment/user-appointment-data/:_id/:id/is-notif', useControllers.putIsNotif)
router.put('/put/patient-registration-data/book-an-appointment/user-appointment-data/:_id/:id', useControllers.putPatientRegistration)
router.put('/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/:_id/:id', useControllers.putIsConfirm)
router.put('/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/presence/:_id/:id', useControllers.putPresence)
router.put('/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/admin-info/profile-admin/updated/:_id/:email', useControllers.putAdminInfo)
router.get('/get', useControllers.getAll)
router.delete('/delete/patient-registration-data/book-an-appointment/user-appointment-data/:_id/:id', useControllers.deletePatientRegistration)
router.delete('/delete/patient-registration/book-an-appointment/:_id/user-appointment/cancel-registration/patient/:id', useControllers.cancelRegistration)
// post patient treatment
router.post('/post/role/:roleId', useControllers.postPatientTreatment)
router.post('/post/role/:roleId/data', useControllers.postPatientRegistration)
// update patient treatment
router.put('/put/role/:roleId/data/:id', useControllers.updatePatientRegistration)
// delete patient treatment
router.delete('/delete/role/:roleId/data/:id', useControllers.deleteDataPatientOfPatientTreatment)

module.exports = router