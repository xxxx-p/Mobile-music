function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(all) {
    let _all = [].concat(all)
    for (let i = 0; i < _all.length; i++) {
        let j = getRandomInt(0, i)
        let t = _all[i]
        _all[i] = _all[j]
        _all[j] = t
    }
    return _all
}

export function debounce(func, delay) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => { func.apply(this, args) }, delay)
    }
}
