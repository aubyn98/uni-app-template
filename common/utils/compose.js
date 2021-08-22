export function compose(...fns) {
	return fns.reduce(
		(l, r) =>
		function(...argv) {
			return r.call(this, () => l.apply(this, argv), ...argv)
		}
	)
}
export default compose
