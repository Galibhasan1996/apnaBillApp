export const getApiData = async (url) => {
    const res = await fetch(url)
    const result = await res.json()
    return result

}



export const getApiCall = (url) => {
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            res.map((item) => {
                item.qty = 1
            })
            return (res)
        })
}