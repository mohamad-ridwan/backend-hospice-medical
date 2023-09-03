const { createDateFormat } = require("../formats/createDateNormalFormat")
const { spaceString } = require("../regex/spaceString")
const { specialCharacter } = require("../regex/specialCharacter")

const filterConfirmPatient = (
    searchTxt,
    roomBy,
    filterBy,
    selectDate,
    sortBy,
    patientData
) => {
    // filter by room
    function filterByRoom() {
        if (
            patientData.length > 0 &&
            roomBy !== 'Filter By Room'
        ) {
            const findPatientByRoom = patientData.filter(patient => {
                const getRoom = patient.data.find(data => data.name === roomBy)
                return getRoom
            })
            return findPatientByRoom
        }
        return patientData
    }
    const resultFilterByRoom = filterByRoom()

    // filter by date
    function onFilterByDate() {
        if (selectDate.length > 0) {
            const findPatient = resultFilterByRoom.filter(patient => {
                const getData = patient.data.filter(data =>
                    data.filterBy === filterBy &&
                    data.name === createDateFormat(selectDate)
                )
                return getData.length > 0
            })
            return findPatient
        }
        return resultFilterByRoom
    }
    function filterByDate() {
        if (
            resultFilterByRoom.length > 0 &&
            filterBy !== 'Filter By'
        ) {
            return onFilterByDate()
        }
        return resultFilterByRoom
    }
    const resultFilterByDate = filterByDate()

    // sort by Appointment
    function sortByUpAppointment(){
        const sortPatient = resultFilterByDate.sort((p1, p2) => {
            const findAppointment1 = p1.data.find(data => data.filterBy === 'Appointment Date')
            const findAppointment2 = p2.data.find(data => data.filterBy === 'Appointment Date')

            const getDateApp1 = findAppointment1?.name
            const getDateApp2 = findAppointment2?.name

            const getConfirmHour1 = findAppointment1?.confirmHour
            const getConfirmHour2 = findAppointment2?.confirmHour

            return (new Date(`${getDateApp2} ${getConfirmHour2}`).valueOf()) - (new Date(`${getDateApp1} ${getConfirmHour1}`).valueOf())
        })

        return sortPatient
    }

    function sortByDownAppointment() {
        const sortPatient = resultFilterByDate.sort((p1, p2) => {
            const findAppointment1 = p1.data.find(data => data.filterBy === 'Appointment Date')
            const findAppointment2 = p2.data.find(data => data.filterBy === 'Appointment Date')

            const getDateApp1 = findAppointment1?.name
            const getDateApp2 = findAppointment2?.name

            const getConfirmHour1 = findAppointment1?.confirmHour
            const getConfirmHour2 = findAppointment2?.confirmHour

            return (new Date(`${getDateApp1} ${getConfirmHour1}`).valueOf()) - (new Date(`${getDateApp2} ${getConfirmHour2}`).valueOf())
        })

        return sortPatient
    }

    function sortByAppointmentDate() {
        if (filterBy === 'Appointment Date' && sortBy === 'Sort By Down') {
            return sortByDownAppointment()
        } else if (filterBy === 'Appointment Date' && sortBy === 'Sort By Up') {
            return sortByUpAppointment()
        }
    }
    const resultSortByAppointmentDate= sortByAppointmentDate()

    // sort by confirmation date
    function sortByUpConfirmDate() {
        const sortPatient = resultFilterByDate.sort((p1, p2) => {
            const findConfirmDate1 = p1.data.find(data => data.filterBy === 'Confirmation Date')
            const findConfirmDate2 = p2.data.find(data => data.filterBy === 'Confirmation Date')

            const getDateConfirm1 = findConfirmDate1?.name
            const getDateConfirm2 = findConfirmDate2?.name

            const getConfirmHour1 = findConfirmDate1?.confirmHour?.split('-')[0]
            const getConfirmHour2 = findConfirmDate2?.confirmHour?.split('-')[0]

            return (new Date(`${getDateConfirm2} ${getConfirmHour2}`).valueOf()) - (new Date(`${getDateConfirm1} ${getConfirmHour1}`).valueOf())
        })

        return sortPatient
    }
    function sortByDownConfirmDate() {
        const sortPatient = resultFilterByDate.sort((p1, p2) => {
            const findConfirmDate1 = p1.data.find(data => data.filterBy === 'Confirmation Date')
            const findConfirmDate2 = p2.data.find(data => data.filterBy === 'Confirmation Date')

            const getDateConfirm1 = findConfirmDate1?.name
            const getDateConfirm2 = findConfirmDate2?.name

            const getConfirmHour1 = findConfirmDate1?.confirmHour?.split('-')[0]
            const getConfirmHour2 = findConfirmDate2?.confirmHour?.split('-')[0]

            return (new Date(`${getDateConfirm1} ${getConfirmHour1}`).valueOf()) - (new Date(`${getDateConfirm2} ${getConfirmHour2}`).valueOf())
        })

        return sortPatient
    }

    function sortByConfirmationDate(){
        if (filterBy === 'Confirmation Date' && sortBy === 'Sort By Down') {
            return sortByDownConfirmDate()
        } else if (filterBy === 'Confirmation Date' && sortBy === 'Sort By Up') {
            return sortByUpConfirmDate()
        }
    }
    const resultSortByConfirmationDate= sortByConfirmationDate()

    // sort by date of birth
    function sortByUpDateOfBirth() {
        const sortPatient = resultFilterByDate.sort((p1, p2) => {
            const findDateOfBirth1 = p1.data.find(data => data.filterBy === 'Date of Birth')
            const findDateOfBirth2 = p2.data.find(data => data.filterBy === 'Date of Birth')

            const getDateOfBirth1 = findDateOfBirth1?.name
            const getDateOfBirth2 = findDateOfBirth2?.name

            return (new Date(getDateOfBirth2).valueOf()) - (new Date(getDateOfBirth1).valueOf())
        })

        return sortPatient
    }

    function sortByDownDateOfBirth() {
        const sortPatient = resultFilterByDate.sort((p1, p2) => {
            const findDateOfBirth1 = p1.data.find(data => data.filterBy === 'Date of Birth')
            const findDateOfBirth2 = p2.data.find(data => data.filterBy === 'Date of Birth')

            const getDateOfBirth1 = findDateOfBirth1?.name
            const getDateOfBirth2 = findDateOfBirth2?.name

            return (new Date(getDateOfBirth1).valueOf()) - (new Date(getDateOfBirth2).valueOf())
        })

        return sortPatient
    }

    function sortByDateOfBirth(){
        if (filterBy === 'Date of Birth' && sortBy === 'Sort By Down') {
            return sortByDownDateOfBirth()
        } else if (filterBy === 'Date of Birth' && sortBy === 'Sort By Up') {
            return sortByUpDateOfBirth()
        }
    }
    const resultSortByDateOfBirth= sortByDateOfBirth()

    function getFilterText(dataFilter) {
        const filter = dataFilter.filter(patient => {
            const findItem = patient.data.find(data =>
                data.name.replace(specialCharacter)?.replace(spaceString)?.toLowerCase()?.includes(searchTxt?.replace(spaceString, '')?.toLowerCase()) ||
                data?.firstDesc?.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchTxt?.replace(spaceString, '')?.toLowerCase())
            )
            return findItem
        })
        return filter
    }

    const resultFilter = 
    Array.isArray(resultSortByAppointmentDate) &&
            resultSortByAppointmentDate.length > 0
            ? getFilterText(resultSortByAppointmentDate) :
            Array.isArray(resultSortByConfirmationDate) &&
                resultSortByConfirmationDate.length > 0 ?
                getFilterText(resultSortByConfirmationDate) :
                Array.isArray(resultSortByDateOfBirth) &&
                    resultSortByDateOfBirth.length > 0 ?
                    getFilterText(resultSortByDateOfBirth) :
                    resultFilterByDate.length > 0 ?
                        getFilterText(resultFilterByDate) : []

    return resultFilter
}

module.exports = { filterConfirmPatient }