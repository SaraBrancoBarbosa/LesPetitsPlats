const map = new Map()

export const debounce = (callback, delay) => {
    
    let timeoutId = map.get(callback)

    return (...args) => {

        if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                callback(...args)
                clearTimeout(timeoutId)
                timeoutId = null
                map.set(callback, null)
            }, delay > 0 ? delay : 500 + Math.ceil(Math.random() * 1500))

            map.set(callback, timeoutId)

    }

}