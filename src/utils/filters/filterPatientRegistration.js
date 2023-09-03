const { createDateFormat } = require("../formats/createDateNormalFormat")
const { spaceString } = require("../regex/spaceString")
const { specialCharacter } = require("../regex/specialCharacter")

const filterPatientRegistration = (
    searchText,
    filterBy,
    selectDate,
    sortBy,
    patientData
)=>{
    const filterByDate = patientData?.length > 0 ? patientData.filter(patient => {
        function onFilterDate() {
            if (selectDate.length > 0) {
                const findDate = patient.data.filter(data =>
                    data.filterBy?.toLowerCase() === filterBy.toLowerCase() &&
                    data.name === createDateFormat(selectDate))
                return findDate
            } else if (filterBy !== 'Filter By') {
                const findDate = patient.data.filter(data =>
                    data.filterBy?.toLowerCase() === filterBy.toLowerCase())
                return findDate
            }
        }

        const findDate = onFilterDate()

        return Array.isArray(findDate) && findDate.length > 0
    }) : []

    const checkFilterByDate = () => {
        if (filterBy !== 'Filter By') {
            return filterByDate
        }

        return patientData
    }

    // sort by up
    const sortByUp = (
        onClock,
    ) => {
        const sort = filterByDate.sort((p1, p2) => {
            const getSort = (new Date(getSortDateAfterFilterByDate(p1, p2, filterBy.toLowerCase(), onClock).dateTwo)).valueOf() - (new Date(getSortDateAfterFilterByDate(p1, p2, filterBy.toLowerCase(), onClock).dateOne)).valueOf()

            return getSort
        })
        return sort
    }

    // sort by down
    const sortByDown = (
        onClock
    ) => {
        const sort = filterByDate.sort((p1, p2) => {
            const getSort = (new Date(getSortDateAfterFilterByDate(p1, p2, filterBy.toLowerCase(), onClock).dateOne)).valueOf() - (new Date(getSortDateAfterFilterByDate(p1, p2, filterBy.toLowerCase(), onClock).dateTwo)).valueOf()

            return getSort
        })
        return sort
    }

    // sort after filter by date
    const sortDate = sortBy === 'Sort By Up' && filterByDate?.length > 0 ? sortByUp(
        filterBy !== 'Filter by' && filterBy !== 'Submission Date' ? false : true
    ) : sortBy === 'Sort By Down' && filterByDate?.length > 0 ? sortByDown(
        filterBy !== 'Filter by' && filterBy !== 'Submission Date' ? false : true
    ) : []

    function getSortDateAfterFilterByDate(
        p1,
        p2,
        chooseFilterByDate,
        onClock
    ) {
        const findDateOnSelectDateP1 = p1.data.find(data =>
            data?.filterBy?.toLowerCase() === chooseFilterByDate
        )
        const findDateOnSelectDateP2 = p2.data.find(data =>
            data?.filterBy?.toLowerCase() === chooseFilterByDate
        )

        if (onClock) {
            const dateOne = `${findDateOnSelectDateP1?.name} ${findDateOnSelectDateP1?.clock}`
            const dateTwo = `${findDateOnSelectDateP2?.name} ${findDateOnSelectDateP2?.clock}`

            return { dateOne, dateTwo }
        } else {
            const dateOne = `${findDateOnSelectDateP1?.name}`
            const dateTwo = `${findDateOnSelectDateP2?.name}`

            return { dateOne, dateTwo }
        }
    }

    const checkSortSubmissionDate = () => {
        if (sortBy !== 'Sort By') {
            return sortDate
        }

        return checkFilterByDate()
    }

    // filter on search text
    const filterText = checkSortSubmissionDate().length > 0 ? checkSortSubmissionDate().filter(patient => {
        const findItem = patient.data.filter(data => 
            data.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()) ||
            data?.firstDesc?.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase())
            )

        return findItem.length > 0
    }) : []
    return filterText
}

module.exports = {filterPatientRegistration}