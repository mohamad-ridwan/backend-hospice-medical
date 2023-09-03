const { spaceString } = require("../regex/spaceString")
const { specialCharacter } = require("../regex/specialCharacter")

const filterOurDoctor = (
    data,
    rooms,
    searchText,
    filterBy,
    selectSpecialist
) => {
    function getOurDoctor(){
        if(data.length > 0 && rooms.length > 0){
            const newDataDoctor = data.map(doctor=>{
                const findRoom = rooms.find(room => room.id === doctor.room)

                return {
                    id: doctor.id,
                    data: [
                        {
                            name: doctor.name,
                            image: doctor.image
                        },
                        {
                            name: doctor.deskripsi
                        },
                        {
                            name: doctor.email
                        },
                        {
                            name: doctor.phone
                        },
                        {
                            name: findRoom?.room
                        },
                        {
                            name: doctor?.doctorActive ?? '-'
                        },
                        {
                            name: doctor.id
                        },
                        {
                            name: ''
                        },
                    ]
                }
            })
            return newDataDoctor
        }else{
            return []
        }
    }

    const dataColumns = getOurDoctor()

    function onFilterSpecialist() {
        if (
            filterBy === 'Specialist' &&
            selectSpecialist !== 'Select Specialist'
        ) {
            const filterSpecialist = dataColumns.filter(items => items.data[1].name === selectSpecialist)
            return filterSpecialist
        }
        return dataColumns
    }

    function onFilterRooms() {
        if (
            filterBy === 'Rooms' &&
            selectSpecialist !== 'Select Room'
        ) {
            const filterRooms = dataColumns.filter(items => items.data[4].name === selectSpecialist)
            return filterRooms
        }
        return dataColumns
    }

    function getFilterText() {
        if (
            filterBy === 'Specialist' &&
            selectSpecialist !== 'no filter' &&
            selectSpecialist !== 'Select Specialist'
        ) {
            const filterText = onFilterSpecialist().filter(items => {
                const findItem = items.data.filter(data => data.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()))

                return findItem
            })

            return filterText
        } else if (
            filterBy === 'Rooms' &&
            selectSpecialist !== 'no filter' &&
            selectSpecialist !== 'Select Room'
        ) {
            const filterText = onFilterRooms().filter(items => {
                const findItem = items.data.filter(data => data.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()))

                return findItem
            })

            return filterText
        }

        const filterText = dataColumns.filter(items => {
            const findItem = items.data?.filter(data => data?.name?.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()))

            return findItem.length > 0
        })

        return filterText
    }

    const resultFilterData = getFilterText()

    return {
        totalData: dataColumns,
        filterData: resultFilterData
    }
}

module.exports = { filterOurDoctor }