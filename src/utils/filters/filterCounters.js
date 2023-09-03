const { spaceString } = require("../regex/spaceString")
const { specialCharacter } = require("../regex/specialCharacter")

const filterCounters = (
    dataLoket,
    searchText,
    counterType,
    roomActive
) => {
    function loadGetDataLoket(dataLoket) {
        if (dataLoket.length > 0) {
            const loket = dataLoket.map(item => ({
                id: item.id,
                data: [
                    {
                        name: item.loketName
                    },
                    {
                        name: item?.counterType ?? '-'
                    },
                    {
                        name: item?.dates?.procurementDate ?? ''
                    },
                    {
                        name: item?.dates?.procurementHours ?? '-'
                    },
                    {
                        name: item?.roomActive ?? '-'
                    },
                    {
                        name: item.id
                    },
                    {
                        name: ''
                    }
                ]
            }))
            return loket
        }
        return []
    }

    const dataColumns = loadGetDataLoket(dataLoket)

    // filter counter type
    function filterCounterType() {
        if (counterType !== 'Select Counter Type') {
            const findCounter = dataColumns.filter(counter => {
                const data = counter.data.find(item =>
                    item.name === counterType
                )
                return data
            })
            return findCounter
        }
        return dataColumns
    }
    const resultFilterCounterType = filterCounterType()

    // filter room active
    function filterRoomActive(){
        if(roomActive !== 'Select Room Active'){
            const findCounter = resultFilterCounterType.filter(counter => {
                const data = counter.data.find(item =>
                    item.name === roomActive
                )
                return data
            })
            return findCounter
        }
        return resultFilterCounterType
    }
    const resultFilterRoomActive = filterRoomActive()

    const filterText = resultFilterRoomActive.length > 0 ? resultFilterRoomActive.filter(loket => {
        const names = loket.data.filter(loketData => loketData.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()))
        return names.length > 0
    }) : []

    return {
        totalData: dataColumns,
        filterData: filterText
    }
}

module.exports = { filterCounters }