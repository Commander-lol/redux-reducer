module.exports = function (initial, handlers) {
	return function (state, action) {
		if (state == null) state = initial
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action)
		}
		return state
	}
}
