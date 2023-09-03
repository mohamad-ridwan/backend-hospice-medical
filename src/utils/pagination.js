const pagination = (
    currentPage,
    pageSize,
    data
)=>{
    const firstPage = (currentPage - 1) * pageSize
    const lastPage = firstPage + pageSize
    return data.slice(firstPage, lastPage)
}

const lastPage = (data, pageSize)=>{
    const lastPage = data.length < 5 ? 1 : Math.ceil(data.length / pageSize)
    return lastPage
}

module.exports = {pagination, lastPage}