const runningDebouncedList = new Map()

export const debounce = (callback, delay) => {
    
    let timeoutId = runningDebouncedList.get(callback)

    return (...args) => {

        if (timeoutId) clearTimeout(timeoutId)

            timeoutId = setTimeout(() => {
                callback(...args)
                clearTimeout(timeoutId)
                timeoutId = null
                runningDebouncedList.set(callback, null)
            }, delay > 0 ? delay : 500 + Math.ceil(Math.random() * 500))

            runningDebouncedList.set(callback, timeoutId)

    }

}