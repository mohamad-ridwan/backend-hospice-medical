const { createDateFormat, createDateNormalFormat } = require("../formats/createDateNormalFormat")
const { spaceString } = require("../regex/spaceString")
const { specialCharacter } = require("../regex/specialCharacter")

const filterTableCounterInfo = (
    dataPatientRegis,
    dataDrugCounter,
    dataLoket,
    dataFinishTreatment,
    params,
    searchTxt,
    filterBy,
    sortBy,
    selectDate
) => {
    const loket = dataLoket.find(loket => loket?.loketName === params?.counterName)

    function findDataRegistration() {
        let currentDataStatus = []
        let dataColumns = []

        if (dataPatientRegis.length > 0) {
            const patientWaiting = dataPatientRegis.filter((patient => {
                // finished treatment
                const findPatientFT = dataFinishTreatment?.find(patientFT =>
                    patientFT.patientId === patient.id
                )
                // patient counter
                const findPatientCounter = dataDrugCounter?.find(patientC =>
                    patientC?.patientId === patient.id &&
                    patientC?.loketInfo?.loketId === loket?.id &&
                    patientC?.isConfirm?.confirmState === false &&
                    patientC?.submissionDate?.submissionDate === createDateFormat(new Date())
                )
                return findPatientCounter && !findPatientFT
            }))
            const patientAlreadyConfirmed = dataPatientRegis.filter((patient => {
                const loket = dataLoket?.find(loket => loket.loketName === params.counterName)
                // patient counter
                const findPatientCounter = dataDrugCounter?.find(patientC =>
                    patientC?.patientId === patient.id &&
                    patientC?.loketInfo?.loketId === loket?.id &&
                    patientC?.isConfirm?.confirmState &&
                    patientC?.submissionDate?.submissionDate === createDateFormat(new Date())
                )
                return findPatientCounter
            }))
            const patientExpired = dataPatientRegis.filter((patient => {
                // finished treatment
                const findPatientFT = dataFinishTreatment?.find(patientFT =>
                    patientFT.patientId === patient.id
                )
                const loket = dataLoket?.find(loket => loket.loketName === params.counterName)
                // patient counter
                const findPatientCounter = dataDrugCounter?.find(patientC =>
                    patientC?.patientId === patient.id &&
                    patientC?.loketInfo?.loketId === loket?.id &&
                    patientC?.isConfirm?.confirmState === false &&
                    patientC?.submissionDate?.submissionDate < createDateFormat(new Date())
                )
                return findPatientCounter && !findPatientFT
            }))
            if (params.status === 'waiting-patient') {
                currentDataStatus = patientWaiting
            } else if (params.status === 'already-confirmed') {
                currentDataStatus = patientAlreadyConfirmed
            } else if (params.status === 'expired-patient') {
                currentDataStatus = patientExpired
            }

            if (currentDataStatus.length > 0) {
                const getDataColumns = currentDataStatus.map(patient => {
                    const patientCounter = dataDrugCounter?.find(patientC => patientC.patientId === patient.id)
                    const status = params.status === 'waiting-patient' ? 'waiting' : params.status === 'already-confirmed' ? 'already confirmed' : params.status === 'expired-patient' ? 'expired' : 'null'
                    const colorStatus = status === 'waiting' ? '#FFA500' : status === 'already confirmed' ? '#288bbc' : status === 'expired' ? '#ff296d' : '#000'
                    // find patient be passed
                    const isPatientSkipped = patientCounter?.isConfirm?.isSkipped ? 'Skipped' : null

                    return {
                        id: patient.id,
                        data: [
                            {
                                name: patient.patientName
                            },
                            {
                                name: patientCounter?.queueNumber,
                                filterBy: 'Queue Number'
                            },
                            {
                                firstDesc: status.toUpperCase(),
                                name: isPatientSkipped ? `(${isPatientSkipped})` : '',
                                color: colorStatus,
                                colorName: '#777',
                                fontSize: '12px',
                                fontWeightFirstDesc: 'bold',
                            },
                            {
                                name: params.counterName
                            },
                            {
                                name: patient.emailAddress
                            },
                            {
                                name: patient.phone
                            },
                            {
                                firstDesc: createDateNormalFormat(patient.dateOfBirth),
                                colorName: '#777',
                                marginBottom: '4.5px',
                                fontSize: '12px',
                                filterBy: 'Date of Birth',
                                name: patient.dateOfBirth
                            },
                            {
                                name: patient.id
                            },
                            {
                                name: ''
                            }
                        ]
                    }
                })
                dataColumns = getDataColumns
            }
            return dataColumns
        } else {
            return []
        }
    }

    const dataColumns = findDataRegistration()

    // filter by
    // filter date
    const filterByDate =
        filterBy === 'Date of Birth' &&
            dataColumns.length > 0 ? dataColumns.filter(patient => {
                if (selectDate.length > 0) {
                    const findDate = patient.data.find(data => data?.filterBy === 'Date of Birth')
                    const checkDate = findDate?.name === createDateFormat(selectDate)
                    return checkDate
                }
                return dataColumns
            }) : []

    // filter queue number
    const filterQueueNumber =
        filterBy === 'Queue Number' &&
            dataColumns.length > 0 ? dataColumns.filter(patient => {
                const findQueue = patient.data.find(data => data?.filterBy === 'Queue Number')

                return findQueue
            }) : dataColumns

    function sortByUp() {
        if (
            filterBy === 'Date of Birth' &&
            sortBy === 'Sort By Up'
        ) {
            const sort = filterByDate.sort((a, b) => {
                const findDateA = a.data.find(data => data?.filterBy === 'Date of Birth')
                const findDateB = b.data.find(data => data?.filterBy === 'Date of Birth')
                const checkDate = (new Date(findDateB?.name)).valueOf() - (new Date(findDateA?.name)).valueOf()
                return checkDate
            })
            return sort
        } else if (
            filterBy === 'Queue Number' &&
            sortBy === 'Sort By Up'
        ) {
            const sort = filterQueueNumber.sort((a, b) => {
                const findQueueA = a.data.find(data => data?.filterBy === 'Queue Number')
                const findQueueB = b.data.find(data => data?.filterBy === 'Queue Number')
                const checkQueue = Number(findQueueB?.name) - Number(findQueueA?.name)
                return checkQueue
            })
            return sort
        }

        return []
    }
    
    function sortByDown() {
        if (
            filterBy === 'Date of Birth' &&
            sortBy === 'Sort By Down'
        ) {
            const sort = filterByDate.sort((a, b) => {
                const findDateA = a.data.find(data => data?.filterBy === 'Date of Birth')
                const findDateB = b.data.find(data => data?.filterBy === 'Date of Birth')
                const checkDate = (new Date(findDateA?.name)).valueOf() - (new Date(findDateB?.name)).valueOf()
                return checkDate
            })
            return sort
        } else if (
            filterBy === 'Queue Number' &&
            sortBy === 'Sort By Down'
        ) {
            const sort = filterQueueNumber.sort((a, b) => {
                const findQueueA = a.data.find(data => data?.filterBy === 'Queue Number')
                const findQueueB = b.data.find(data => data?.filterBy === 'Queue Number')
                const checkQueue = Number(findQueueA?.name) - Number(findQueueB?.name)
                return checkQueue
            })
            return sort
        }

        return []
    }

    function resultFilterBy() {
        if (
            filterBy === 'Date of Birth' &&
            sortBy === 'Sort By'
        ) {
            return filterByDate
        }
        if (
            filterBy !== 'Filter By' &&
            sortBy !== 'Sort By'
        ) {
            if (sortBy === 'Sort By Up') {
                return sortByUp()
            } else if (sortBy === 'Sort By Down') {
                return sortByDown()
            }
        }

        return dataColumns
    }

    const resultFilter = resultFilterBy().filter(patient => {
        const findItem = patient.data.filter(data =>
            data.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchTxt?.replace(spaceString, '')?.toLowerCase()) ||
            data?.firstDesc?.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchTxt?.replace(spaceString, '')?.toLowerCase())
        )

        return findItem.length > 0
    })

    return {
        dataFilter: resultFilter,
        totalData: dataColumns
    }
}

module.exports = { filterTableCounterInfo }