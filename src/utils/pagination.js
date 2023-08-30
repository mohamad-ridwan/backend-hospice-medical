const pagination = (
    currentPage,
    pageSize,
    data
)=>{
    const firstPage = (currentPage - 1) * pageSize
    const lastPage = firstPage + pageSize
    return data.slice(firstPage, lastPage)
}

module.exports = {pagination}