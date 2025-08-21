<template>
	<canvas v-if="!offscreen" type="2d" :id="canvasId"
		:style="{ position:'fixed',top:top + 'px',width: width + 'px', height: height + 'px' }"></canvas>
</template>

<script>
	let cache = null;
	let imgMap = {};
	import {
		loadImage,
		drawMultilineText
	} from '../../libs/utils/canvas.js'
	export default {
		props: {
			offscreen: {
				type: Boolean,
				default: true
			},
			canvasId: {
				type: String,
				default: 'c-canvas'
			},
			width: {
				type: Number,
				default: 750
			},
			height: {
				type: Number,
				default: 1150
			},
			top: {
				type: Number,
				default: 60
			}
		},
		data() {
			return {

			}
		},
		computed: {},
		mounted() {},
		destroyed() {
			cache = null
			imgMap = {}
		},
		methods: {
			customDraw(handle, {
				width = this.width,
				height = this.height,
				tempConfig
			} = {}) {
				return new Promise(async (resolve, reject) => {
					try {
						const {
							canvas,
							ctx
						} = await this.getCtx()
						// 初始化并清空画布
						canvas.width = width
						canvas.height = height
						ctx.clearRect(0, 0, width, height)

						await handle({
							canvas,
							ctx,
							instance: this
						})

						if (ctx.draw) await new Promise(r => ctx.draw(void 0, r))
						wx.canvasToTempFilePath({
							...tempConfig,
							canvas,
							success: (res) => resolve(res.tempFilePath),
							fail: reject
						})
					} catch (e) {
						console.error(e)
						reject(e)
					}
				})
			},
			draw(list = [], {
				width = this.width,
				height = this.height,
				tempConfig
			} = {}) {
				return new Promise(async (resolve, reject) => {
					if (!(list instanceof Array)) return console.error('The first parameter must be an array')
					try {
						const {
							canvas,
							ctx
						} = await this.getCtx()
						// 初始化并清空画布
						canvas.width = width
						canvas.height = height
						ctx.clearRect(0, 0, width, height)

						for (let i = 0, len = list.length; i < len; i++) {
							const item = list[i]
							if (item.type === 'image') await this.drawImage(ctx, item, canvas)
							if (item.type === 'text') this.drawText(ctx, item)
							if (item.type === 'dash') this.drawDash(ctx, item)
							if (item.type === 'roundRect') this.drawRoundRect(ctx, item)
						}

						if (ctx.draw) await new Promise(r => ctx.draw(void 0, r))
						wx.canvasToTempFilePath({
							...tempConfig,
							canvas,
							success: (res) => resolve(res.tempFilePath),
							fail: reject
						})
					} catch (e) {
						console.error(e)
						reject(e)
					}
				})
			},
			drawRoundRect(ctx, item) {
				ctx.save()
				ctx.beginPath();
				ctx.roundRect(item.x, item.y, item.width, item.height, item.radius);
				if (item.fillStyle) {
					ctx.fillStyle = item.fillStyle
					ctx.fill()
				}
				if (item.strokeStyle) {
					ctx.strokeStyle = item.strokeStyle;
					ctx.stroke();
				}
				ctx.restore()
			},
			drawDash(ctx, item) {
				ctx.save()
				ctx.setLineDash([4, 4]); // 10px线段 + 5px间隙
				// 绘制直线
				ctx.beginPath();
				ctx.moveTo(item.x, item.y); // 起点
				ctx.lineTo(item.x + item.width, item.y); // 终点
				ctx.lineWidth = item.lineWidth; // 线宽
				ctx.strokeStyle = item.strokeStyle; // 颜色
				ctx.stroke(); // 绘制虚线
				ctx.restore()
			},
			drawText(ctx, item) {
				ctx.save()
				ctx.font = item.font;
				ctx.fillStyle = item.fillStyle;
				drawMultilineText({
					ctx,
					...item
				})
				ctx.restore()
			},
			async drawImage(ctx, item, canvas) {
				const image = await loadImage(item.src, canvas, imgMap)
				if (item.arc) {
					ctx.save()
					const half = item.width / 2
					ctx.beginPath();
					ctx.arc(item.x + half, item.y + half, half, 0, Math.PI * 2); // 绘制完整圆形
					ctx.closePath();
					ctx.clip();
					// 将图片拉伸至52x52px，填满Canvas（裁剪后只显示圆形部分）
					ctx.drawImage(image, item.x, item.y, item.width, item.height);
					if (item.border) {
						ctx.strokeStyle = item.border.color; // 边框颜色
						ctx.lineWidth = item.border.lineWidth; // 边框宽度
					}
					ctx.stroke(); // 绘制边框（基于第一步的圆形路径）
					ctx.restore()
				} else {
					if (item.width) ctx.drawImage(image, item.x, item.y, item.width, item.height)
					else ctx.drawImage(image, item.x, item.y)
				}
			},
			loadImage(src, canvas) {
				return new Promise((r, j) => {
					if (imgMap[src]) return r(imgMap[src])
					const image = canvas.createImage()
					image.onload = () => {
						imgMap[src] = image
						r(image)
					}
					image.onerror = j
					image.src = src
				})
			},
			getCtx() {
				return new Promise((resolve, reject) => {
					if (cache) return resolve(cache)

					if (this.offscreen) {
						const canvas = wx.createOffscreenCanvas({
							type: '2d',
						})
						const ctx = canvas.getContext('2d')
						cache = {
							canvas,
							ctx
						}
						return resolve(cache)
					}

					const query = wx.createSelectorQuery().in(this)
					query.select('#' + this.canvasId)
						.fields({
							node: true,
							size: true
						})
						.exec((res) => {
							const canvas = res[0].node
							const ctx = canvas.getContext('2d')
							cache = {
								canvas,
								ctx
							}
							resolve(cache)
						})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>