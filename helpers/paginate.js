export const Paginate = (data, currentPage, pageSize) => {

    const startIndex = (currentPage - 1) * pageSize;

    return data.slice(startIndex, startIndex + pageSize)
}