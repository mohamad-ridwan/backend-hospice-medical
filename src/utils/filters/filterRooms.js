const { spaceString } = require("../regex/spaceString")
const { specialCharacter } = require("../regex/specialCharacter")

const filterRooms = (
    roomsData,
    searchText,
    filterRoom,
    filterRoomActive
) => {
    function loadGetRoomsData(
        roomsData
    ) {
        if (roomsData.length > 0) {
            const rooms = roomsData.map((room, idx) => {
                return {
                    id: room.id,
                    data: [
                        {
                            name: room.room
                        },
                        {
                            name: room?.roomType ?? '-'
                        },
                        {
                            name: room?.dates?.procurementDate ?? ''
                        },
                        {
                            name: room?.dates?.procurementHours ?? '-'
                        },
                        {
                            name: room?.roomActive ?? '-'
                        },
                        {
                            name: room.id
                        },
                        {
                            name: ''
                        }
                    ]
                }
            })
            return rooms
        } else {
            return []
        }
    }

    const dataColumns = loadGetRoomsData(roomsData)

    // filter room
    function getFilterRoom() {
        if (filterRoom !== 'Select Room Type') {
            const findRoom = dataColumns.filter(room => {
                const data = room.data.find(item =>
                    item.name === filterRoom
                )
                return data
            })
            return findRoom
        }
        return dataColumns
    }
    const resultFilterRoom = getFilterRoom()

    // filter by room active
    function getFilterRoomActive(){
        if(filterRoomActive !== 'Select Room Active'){
            const findRoom = resultFilterRoom.filter(room => {
                const data = room.data.find(item =>
                    item.name === filterRoomActive
                )
                return data
            })
            return findRoom
        }

        return resultFilterRoom
    }
    const resultFilterRoomActive = getFilterRoomActive()

    const filterText = resultFilterRoomActive.length > 0 ? resultFilterRoomActive.filter(room => {
        const names = room.data.filter(roomData => roomData.name.replace(specialCharacter, '')?.replace(spaceString, '')?.toLowerCase()?.includes(searchText?.replace(spaceString, '')?.toLowerCase()))
        return names.length > 0
    }) : []

    return {
        totalData: dataColumns,
        filterResult: filterText
    }
}

module.exports = { filterRooms }