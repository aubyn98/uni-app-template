<template>
	<view class="meal-setting-single">
		<view class="_declare-meal radius">
			<c-cell line bold :borderBottom="false" height="50rpx">
				发布报餐
			</c-cell>
			<c-cell class="_declare-meal-cell" @click="(isEffective && isAdd) && (calendarShow = !calendarShow)">
				报餐日期
				<template #right>
					<view class="_bold">
						<input class="cutom-cell-input" :placeholder="isAdd ? '请选择日期' : ''" disabled placeholder-class="cutom-cell-input-placeholder"
						 type="text" :value="cacheForm.dateInfo" />
					</view>
				</template>
			</c-cell>
			<c-cell class="_declare-meal-cell" v-if="isEffective">
				是否开启
				<template #right>
					<view style="font-size: 0;">
						<!-- 报餐记录-修改 / 报餐设置-->
						<u-switch v-if="!isAdd" v-model=" cacheForm.isOpen" />
						<u-switch v-else v-model="cacheForm.status" />
					</view>
				</template>
			</c-cell>
			<c-cell class="_declare-meal-cell">
				公告提示
				<template #right>
					<view class="_bold">
						<input class="cutom-cell-input" :placeholder="isAdd ? '请输入公告' : ''" :disabled="!isEffective" placeholder-class="cutom-cell-input-placeholder"
						 type="text" v-model="cacheForm.remark" />
					</view>
				</template>
			</c-cell>
			<c-cell class="_declare-meal-cell" :borderBottom="false">
				报餐时段
				<template #right>
					<c-time-range-picker v-if="isEffective" :value="[cacheForm.effectDate,cacheForm.expireDate]" @change="[cacheForm.effectDate,cacheForm.expireDate] = $event" />
					<view style="color: #333333;font-weight: 700;" v-else>{{cacheForm.effectDate}}-{{cacheForm.expireDate}}</view>
				</template>
			</c-cell>
		</view>
		<!-- xxx -->
		<template v-if="(!isAdd ? cacheForm.isOpen : cacheForm.status)  ||  !isEffective">
			<view class="_meal-container" v-if="isEffective">
				<view class="_meal" :class="[{'_meal-open':eatModel.status,'_meal-close':!eatModel.status,'_meal-pad-bottom':eatModel.status,'_meal-bottom-radius':index < cacheForm.eatModelRequests.length-1 && !eatModel.status  && cacheForm.eatModelRequests[index + 1].status}]"
				 v-for="(eatModel,index) in cacheForm.eatModelRequests" :key="eatModel.title">
					<c-cell :height="eatModel.status ? '112rpx' : '104rpx'" :fullBorder="eatModel.status" :borderBottom="eatModel.status">
						<view class="_meal-type-container">
							<text class="_meal-type">{{eatModel.title}}</text><text v-if="!eatModel.status" class="_meal-time">({{eatModel.effectTime}}-{{eatModel.expireTime}})</text>
						</view>
						<template #right>
							<view style="font-size: 0;">
								<!-- 不能用 v-model 修改嵌套数据  界面不会刷新 使用swChange(eatModel)传入引用-->
								<u-switch :key="index" :value="eatModel.status" @change="swChange(eatModel)" />
							</view>
						</template>
					</c-cell>
					<view v-if="eatModel.status">
						<c-cell height="56rpx" :customStyle="{'margin-top':'20rpx'}" :borderBottom="false">
							用餐时间
							<template #right>
								<c-time-range-picker :value="[eatModel.effectTime,eatModel.expireTime]" @change="timePickerChange(eatModel,$event)" />
							</template>
						</c-cell>
						<c-cell height="48rpx" :customStyle="{'margin-top':'32rpx'}" :borderBottom="false">
							餐品
							<template #right>
								<c-button size="add" image="icon_add" @click="addFood(eatModel.foods)">添加</c-button>
							</template>
						</c-cell>
						<view class="_tag-list">
							<c-tag class="_tag-item" plain @click="editFood(eatModel.foods,i)" v-for="(food,i) in eatModel.foods" :key="food">{{food}}</c-tag>
						</view>
					</view>
				</view>
			</view>
			<view class="_meal-expired" v-else>
				<view class="_meal" :class="['_meal-open','_meal-pad-bottom']" v-for="(eatModel,index) in cacheForm.eatModelRequests"
				 :key="eatModel.title">
					<c-cell height="112rpx" fullBorder borderBottom>
						<view class="_meal-type-container">
							<text class="_meal-type">{{eatModel.title}}</text>
						</view>
					</c-cell>
					<view>
						<c-cell height="56rpx" :customStyle="{'margin-top':'20rpx'}" :borderBottom="false">
							用餐时间
							<template #right>
								<view style="color: #333333;font-weight: 700;">{{eatModel.effectTime}}-{{eatModel.expireTime}}</view>
							</template>
						</c-cell>
						<view class="_tag-list">
							<c-tag class="_tag-item" plain v-for="(food,i) in eatModel.foods" :key="food">{{food}}</c-tag>
						</view>
					</view>
				</view>
			</view>
		</template>
		<p-action-sheet v-model="showActionSheet" :list="actionList" @action-click="actionClick" />
		<p-input-modal :inputValue="inputVal" v-model="inputVisible" @confirm="confirmInput" title="添加餐品" placeholder="请输入餐品名"
		 confirmText="添加" />
		<u-calendar v-model="calendarShow" :defaultVal="cacheForm.dateInfo" ref="calendar" @change="cacheForm.dateInfo = $event.result"
		 mode="date" active-bg-color="#FFCB45" :btn-style="{background:'#FFCB45 !important'}" :safe-area-inset-bottom="true"
		 max-date="2050-01-01" />
		<c-info ref="info" />
	</view>
</template>

<script>
	export default {
		props: {
			// 表单
			form: {
				type: Object,
				default: () => {}
			},
			// 用于判断是添加还是编辑
			type: {
				type: String,
				default: 'add'
			},
			// 可编辑
			isEffective: {
				type: Boolean,
				default: true
			},
		},
		computed: {
			// 是添加
			isAdd() {
				return this.type === 'add'
			}
		},
		data() {
			return {
				inputVisible: false, // 添加就餐类型的弹窗
				inputVal: '', // 就餐类型
				cacheForm: {}, // 缓存数据
				curFoods: null, // 当前点击的食物
				curFoodIndex: null, // 当前点击的食物索引
				calendarShow: false, // 展示日历
				actionList: [{ // 动作列表
					text: '编辑',
					action: 'edit'
				}, {
					text: '删除',
					action: 'del'
				}],
				showActionSheet: false, // 展示动作列表弹窗

			}
		},
		watch: {
			// 监听父组件列表变化
			form: {
				handler(val) {
					this.cacheForm = JSON.parse(JSON.stringify(val || {
						eatModelRequests: []
					}))
				},
				immediate: true,
			}
		},
		methods: {
			// 就餐时间段修改
			timePickerChange(eatModel, val) {
				[eatModel.effectTime, eatModel.expireTime] = val
			},
			// 就餐类型状态开关
			swChange(eatModel) {
				eatModel.status = !eatModel.status
			},
			// 返回最终结果
			submit() {
				return JSON.parse(JSON.stringify(this.cacheForm))
			},
			// 展示input模态框
			showInput(val) {
				this.inputVisible = true
				this.inputVal = val
			},
			// 修改餐品列表
			confirmInput(val) {
				if (!val) return
				if (this.curFoodIndex === null) this.curFoods.push(val)
				else this.curFoods.splice(this.curFoodIndex, 1, val)
				this.inputVal = ''
			},
			// 餐品动作列表
			actionClick({
				action
			}) {
				if (action === 'edit') return this.inputVisible = true
				if (action === 'del') return this.curFoods.splice(this.curFoodIndex, 1)
			},
			// 编辑餐品
			editFood(curFoods, i) {
				this.curFoodIndex = i
				this.curFoods = curFoods
				this.inputVal = curFoods[i]
				this.showActionSheet = true
			},
			// 添加餐品
			addFood(curFoods) {
				this.curFoodIndex = null
				this.curFoods = curFoods
				this.showInput('')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.meal-setting-single {

		._declare-meal {
			background-color: white;
		}

		._declare-meal {
			padding: 32rpx 0 14rpx;

			._declare-meal-cell:nth-of-type(n+3) {
				margin-top: 12rpx;
			}

			._bold {
				color: #333;
				font-weight: 700;
			}
		}

		._meal-container {}

		._meal {
			&:first-child {
				margin-top: 16rpx;
			}

			&:last-child {
				margin-bottom: 16rpx;
			}

			background-color: white;

			._tag-list {
				display: flex;
				flex-wrap: wrap;
				padding: 0 32rpx;

				._tag-item {
					margin-top: 26rpx;
					margin-left: 24rpx;
				}

				._tag-item:first-child {
					margin-left: 0;
				}
			}
		}


		._meal-open {
			margin-top: 16rpx;

			&+._meal {
				margin-top: 16rpx;
			}
		}

		._meal-close {
			position: relative;

			&::after {
				content: '';
				position: absolute;
				display: block;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 622rpx;
				height: 1px;
				background: #f0f0f0;
			}

			&:first-child {
				@include top-radius;
			}

			&:last-child {
				@include bottom-radius;

				&::after {
					content: none;
				}
			}
		}


		._meal-open+._meal-close {
			@include top-radius;
		}

		._meal-pad-bottom {
			@include bottom-radius;
			@include top-radius;
			padding-bottom: 36rpx;
		}

		._meal-bottom-radius {
			@include bottom-radius;

			&::after {
				content: none;
			}
		}

		._meal-type-container {
			font-size: 0;
			line-height: 48rpx;

			._meal-type {
				color: #333;
				font-size: 36rpx;
				font-weight: 700;
				line-height: 1;
				vertical-align: middle;
			}

			._meal-time {
				color: #999999;
				font-size: 30rpx;
				font-weight: 400;
				margin-left: 12rpx;
				line-height: 1;
				vertical-align: middle;
			}
		}

		._meal-expired {
			._meal {
				._tag-list {
					._tag-item {
						margin-top: 34rpx;
					}
				}
			}

		}
	}
</style>
