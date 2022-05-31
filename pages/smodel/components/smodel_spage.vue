<template>
	<span class="u-m-r-10 u-m-l-10">
		<el-tag v-for="choose in chooses" :key="choose[option.value]" class="u-m-r-10" size="medium" closable
			@close="closeTag(choose)">
			{{choose[option.text]}}
		</el-tag>
		<el-button type="text" size="mini" @click="show()">@选择</el-button>
		<el-dialog :title="'选择' + title" :visible.sync="dialogSpage" @opened="opened" width="80%">
			<SpageList ref="spageList" @chooseModelData="chooseModelData"></SpageList>
		</el-dialog>
	</span>
</template>

<script>
	import {
		fetchSmodelpage
	} from '../api/spage_api.js'
	import {
		smodel_log
	} from '../config.js'
	import SpageList from '../../spage/list.vue'
	export default {
		name: 'SmodelSpage',
		props: {
			value: String,
			option: {
				type: Object,
				default () {
					return {
						smodel: 'sfield',
						value: '_id',
						text: 'name',
						max: 1
					}
				}
			}
		},
		watch: {
			content(n) {
				this.$emit('input', n)
			},
			value(n) {
				smodel_log('SmodelSpage value', n)
				this.fetchSmodelpage(n)
			}
		},
		components: {
			SpageList
		},
		data() {
			return {
				title: '',
				content: this.value,
				chooses: [],
				dialogSpage: false
			}
		},
		methods: {
			chooseModelData(ches) {
				smodel_log('chooseModelData', ches)
				this.chooses = ches
				this.dialogSpage = false
				this.parseData()
			},
			closeTag(row) {
				let index = this.chooses.indexOf(row)
				if (index > -1) {
					this.chooses.splice(index, 1)
				} else {
					this.chooses.push(row)
				}
				this.parseData()
			},
			parseData() {
				if (this.chooses.length == 0) this.content = ''
				else {
					let ids = []
					this.chooses.forEach((v, i) => {
						ids.push(v[this.option.value])
					})
					smodel_log('this.chooses', this.chooses, ids)
					this.content = ids.join(',')
				}
			},
			show() {
				if (!this.option.max) this.option.max = 1
				if (this.option.title) this.title = this.option.title
				this.dialogSpage = true
				
			},
			opened(){
				smodel_log('SmodelSpage open')
				this.$nextTick(() => {
					this.$refs.spageList.showSelectone(this.option)
				})
				
			},
			async fetchSmodelpage(query) {
				this.chooses = await fetchSmodelpage(this.option, query, this)
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';

	.code {
		min-height: 100rpx;
		line-height: 32rpx;
		border: 1px solid;
		border-radius: 8rpx;
	}
</style>
