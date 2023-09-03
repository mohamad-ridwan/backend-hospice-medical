const { createDateNormalFormat, createDateFormat } = require("../formats/createDateNormalFormat")
const { spaceString } = require("../regex/spaceString")
const { specialCharacter } = require("../regex/specialCharacter")

const filterFinishTreatment = (
    dataPatientRegis,
    dataFinishTreatment,
    dataConfirmationPatients,
    dataDrugCounter,
    dataLoket,
    searchText,
    filterBy,
    selectDate,
    sortBy,
) => {
    function getData() {
        if (dataPatientRegis.length > 0) {
            const findRegistration = dataPatientRegis.filter(patient => {
                const findPatientFT = dataFinishTreatment?.find(patientFT =>
                    patientFT.patientId === patient.id
                )

                return findPatientFT
            })

            if(findRegistration.length > 0){
                const newPatient = findRegistration.map(patient=>{
                    const patientFT = dataFinishTreatment?.find(patientFT =>
                        patientFT.patientId === patient.id
                    )
                    const status = patientFT?.isCanceled ? 'Canceled' : 'Completed'
                    const statusColor = status === 'Completed' ? '#288bbc' : '#ff296d'

                    // find url to patient detail
                    const confirmPatient = dataConfirmationPatients?.find(confirmPatient =>
                        confirmPatient.patientId === patient.id
                    )
                    const counterPatient = dataDrugCounter?.find(counterP =>
                        counterP.patientId === patient.id
                    )
                    const currentCounter = dataLoket?.find(counter => counter.id === counterPatient?.loketInfo?.loketId)
                    const patientName = patient.patientName?.replace(specialCharacter, '')?.replace(spaceString, '')
                    const confirmPatientUrl = `/patient/patient-registration/personal-data/${confirmPatient ? 'confirmed' : 'not-yet-confirmed'}/${patientName}/${patient.id}`
                    const confirmAndCounterUrl = `${confirmPatientUrl}/counter/${currentCounter?.loketName}/${counterPatient?.isConfirm?.confirmState ? 'confirmed' : 'not-yet-confirmed'}/${counterPatient?.queueNumber}`

                    const currentURL = !counterPatient ? confirmPatientUrl : confirmAndCounterUrl

                    return {
                        id: patient.id,
                        url: currentURL,
                        data: [
                            {
                                name: patient.patientName
                            },
                            {
                                colorName: statusColor,
                                fontWeightName: 'bold',
                                filterBy: status,
                                clock: `${patientFT?.confirmedTime?.dateConfirm} ${patientFT?.confirmedTime?.confirmHour}`,
                                name: status.toUpperCase()
                            },
                            {
                                firstDesc: createDateNormalFormat(patientFT?.confirmedTime?.dateConfirm),
                                colorName: '#777',
                                marginBottom: '4.5px',
                                fontSize: '12px',
                                filterBy: 'Confirmation Date',
                                clock: patientFT?.confirmedTime?.confirmHour,
                                name: patientFT?.confirmedTime?.dateConfirm
                            },
                            {
                                name: patientFT?.confirmedTime?.confirmHour
                            },
                            {
                                name: patient.emailAddress
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
                                name: patient.phone
                            },
                            {
                                name: ''
                            }
                        ]
                    }
                })
                return newPatient
            }
        } else {
            return []
        }
    }

    const dataColumns = getData()

    // filter table
    // filter completed
    function filterStatus(
        statusFilter
    ) {
        if (filterBy === statusFilter) {
            if (selectDate.length > 0) {
                const completed = dataColumns.filter(patient => {
                    const filterBy = patient.data.find(data =>
                        data.filterBy === statusFilter
                    )
                    const checkTime = Date.parse(createDateFormat(new Date((filterBy?.clock)))) === Date.parse(createDateFormat(selectDate))
                    return checkTime
                })

                return completed
            } else {
                const completed = dataColumns.filter(patient => {
                    const filterBy = patient.data.find(data => data.filterBy === statusFilter)
                    return filterBy
                })
                return completed
            }
        }

        return []
    }
    // result filter status
    const resultFilterStatus = filterStatus(filterBy)
    
    // sort by status
    function sortByStatus(
        statusFilter
    ) {
        if (
            filterBy === statusFilter &&
            sortBy !== 'Sort By'
        ) {
            if (sortBy === 'Sort By Up') {
                return sortUpStatus(statusFilter)
            } else if (sortBy === 'Sort By Down') {
                return sortDownStatus(statusFilter)
            }
        } else if (
            filterBy === statusFilter &&
            sortBy === 'Sort By'
        ) {
            return resultFilterStatus
        }

        return []
    }
    // sort up (status)
    function sortUpStatus(
        statusFilter
    ){
        const sort = resultFilterStatus.sort((a, b) => {
            const dateB = b.data.find(data =>
                data.filterBy === statusFilter
            )
            const dateA = a.data.find(data =>
                data.filterBy === statusFilter
            )
            const compareDate = (new Date(dateB?.clock)).valueOf() - (new Date(dateA?.clock)).valueOf()
            return compareDate
        })

        return sort
    }
    // sort down (status)
    function sortDownStatus(
        statusFilter
    ) {
        const sort = resultFilterStatus.sort((a, b) => {
            const dateA = a.data.find(data =>
                data.filterBy === statusFilter
            )
            const dateB = b.data.find(data =>
                data.filterBy === statusFilter
            )
            const compareDate = (new Date(dateA?.clock)).valueOf() - (new Date(dateB?.clock)).valueOf()
            return compareDate
        })

        return sort
    }

    const resultSortByStatus = sortByStatus(filterBy)

    // filter by confirmation date (only)
    function filterConfirmationDate() {
        if (filterBy === 'Confirmation Date') {
            if (selectDate.length > 0) {
                const confirmDate = dataColumns.filter(patient => {
                    const filterBy = patient.data.find(data => data.filterBy === 'Confirmation Date')
                    const checkTime = Date.parse(filterBy?.name) === Date.parse(createDateFormat(selectDate))
                    return checkTime
                })
                return confirmDate
            } else {
                const confirmDate = dataColumns.filter(patient => {
                    const filterBy = patient.data.find(data => data.filterBy === 'Confirmation Date')
                    return filterBy
                })
                return confirmDate
            }
        }

        return []
    }

    const resultFilterConfirmDate = filterConfirmationDate()

    // sort by confirmation date (only)
    function sortByConfirmDate() {
        if (
            filterBy === 'Confirmation Date' &&
            sortBy !== 'Sort By'
        ) {
            if (sortBy === 'Sort By Up') {
                return sortUpConfirmDate()
            } else if (sortBy === 'Sort By Down') {
                return sortDownConfirmDate()
            }
        } else if (
            filterBy === 'Confirmation Date' &&
            sortBy === 'Sort By'
        ) {
            return resultFilterConfirmDate
        }

        return []
    }

    // sort up confirmation date (only)
    function sortUpConfirmDate() {
        const sort = resultFilterConfirmDate.sort((a, b) => {
            const filterB = b.data.find(data => data.filterBy === 'Confirmation Date')
            const filterA = a.data.find(data => data.filterBy === 'Confirmation Date')
            const compareDate =
                (new Date(`${filterB?.name} ${filterB?.clock}`)).valueOf() -
                (new Date(`${filterA?.name} ${filterA?.clock}`)).valueOf()
            return compareDate
        })

        return sort
    }

    // sort down confirmation date (only)
    function sortDownConfirmDate(){
        const sort = resultFilterConfirmDate.sort((a, b) => {
            const filterA = a.data.find(data => data.filterBy === 'Confirmation Date')
            const filterB = b.data.find(data => data.filterBy === 'Confirmation Date')
            const compareDate =
                (new Date(`${filterA?.name} ${filterA?.clock}`)).valueOf() -
                (new Date(`${filterB?.name} ${filterB?.clock}`)).valueOf()
            return compareDate
        })

        return sort
    }

    const resultSortByConfirmDate = sortByConfirmDate()

    function filterText(){
        if (
            filterBy === 'Completed' ||
            filterBy === 'Canceled'
        ) {
            const search = resultSortByStatus.filter(patient => {
                const name = patient.data.find(data =>
                    data.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()) ||
                    data?.firstDesc?.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase())
                )
                return name
            })
            return search
        } else if (
            filterBy === 'Confirmation Date'
        ) {
            const search = resultSortByConfirmDate.filter(patient => {
                const name = patient.data.find(data =>
                    data.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()) ||
                    data?.firstDesc?.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase())
                )
                return name
            })
            return search
        }

        const search = dataColumns.filter(patient => {
            const name = patient.data.find(data =>
                data.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()) ||
                data?.firstDesc?.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase())
            )
            return name
        })
        return search
    }
    
    const filterResult = filterText()

    return {
        totalData: dataColumns,
        filterData: filterResult
    }
}

module.exports = { filterFinishTreatment }