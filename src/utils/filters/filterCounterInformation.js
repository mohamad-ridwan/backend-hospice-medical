const { createDateFormat } = require("../formats/createDateNormalFormat")

const filterCounterInformation = (
    counter,
    dataDrugCounter,
    dataLoket,
    dataFinishTreatment
)=>{
    function checkPatientWaiting() {
        if (patientWaitingToday().length > 0) {
            const patientNotCallYet = patientWaitingToday().filter(patient => !patient.isConfirm?.isSkipped)
            const patientSkipped = patientWaitingToday().filter(patient => patient.isConfirm?.isSkipped)

            if (patientSkipped.length > 0) {
                return `(${patientNotCallYet.length} Haven't been called, ${patientSkipped.length} Patient passed)`
            }
            return ''
        }

        return ''
    }

    function patientWaitingToday(){
        const patient = dataDrugCounter?.filter(patient => {
            const checkCounter = dataLoket?.find(loket =>
                loket.id === patient.loketInfo.loketId
            )?.loketName === counter

            const checkFinishTreatment = dataFinishTreatment?.find(finishP =>
                finishP?.patientId === patient?.patientId
            )
            const checkSubmitDate = patient?.submissionDate?.submissionDate === createDateFormat(new Date())

            return checkCounter && !checkFinishTreatment && checkSubmitDate
        })
        if (!Array.isArray(patient)) {
            return []
        }

        return patient
    }

    function findCurrentQueueNumber(patient) {
        if (patient.length > 0) {
            const patientNotCallYet = patient.filter(patientData => !patientData.isConfirm?.isSkipped)
            if (patientNotCallYet.length > 0) {
                const sort = patientNotCallYet.sort((a, b) =>
                    Number(a.queueNumber) - Number(b.queueNumber)
                )
                const firstPatient = sort[0]

                return {
                    documentId: firstPatient.id,
                    patientId: firstPatient.patientId,
                    queueNumber: Number(firstPatient.queueNumber)
                }
            } else {
                return {
                    documentId: null,
                    patientId: null,
                    queueNumber: 0
                }
            }
        }
        return {
            documentId: null,
            patientId: null,
            queueNumber: 0
        }
    }

    function patientConfirmedToday(){
        const patientConfirm = dataDrugCounter?.filter(patient => {
            const checkCounter = dataLoket?.find(loket =>
                loket.id === patient.loketInfo.loketId
            )?.loketName === counter

            const checkFinishTreatment = dataFinishTreatment?.find(finishP =>
                finishP?.patientId === patient?.patientId &&
                !finishP?.isCanceled
            )
            const checkSubmitDate = patient?.submissionDate?.submissionDate === createDateFormat(new Date())

            return checkCounter && checkFinishTreatment && checkSubmitDate
        })
        if (!Array.isArray(patientConfirm)) {
            return []
        }

        return patientConfirm
    }

    function patientExpired() {
        const patientExpired = dataDrugCounter?.filter(patient => {
            const checkCounter = dataLoket?.find(loket =>
                loket.id === patient.loketInfo.loketId
            )?.loketName === counter

            const checkFinishTreatment = dataFinishTreatment?.find(finishP =>
                finishP?.patientId === patient?.patientId
            )
            const checkSubmitDate = patient?.submissionDate?.submissionDate < createDateFormat(new Date())

            return checkCounter && !checkFinishTreatment && checkSubmitDate
        })
        if (!Array.isArray(patientExpired)) {
            return []
        }

        return patientExpired
    }

    return {
        counterInfo: [
            {
                title: 'Total Patient Waiting Today',
                total: `${patientWaitingToday().length} ${checkPatientWaiting()}`
            },
            {
                title: 'Has been Confirmed Today',
                total: patientConfirmedToday().length
            },
            {
                title: 'Total Expired Progress',
                total: patientExpired().length
            },
        ],
        queueNumber: findCurrentQueueNumber(patientWaitingToday())
    }
}

module.exports = {filterCounterInformation}