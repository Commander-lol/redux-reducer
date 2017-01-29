module.exports = function(initial, handlers) {
    return function(state = initial, {type, ...action}) {
        if (handlers.hasOwnProperty(type)) {
            return handlers[type](state, action)
        }
        return state
    }
}
