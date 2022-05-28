<template>
	<view>
		<el-input placeholder="请输入内容" :value="value|json2str" :readonly="true">
			<template slot="append">
				<view class="u-cursor-pointer" @click="jsonDataVisible=true">{{title}}</view>
			</template>
		</el-input>
		<el-dialog :title="title" :visible.sync="jsonDataVisible" width="30%">
			<el-tabs type="border-card" v-model="activeTab">
				<el-tab-pane label="JSON" name="ui">
					<el-alert v-if="fields.length == 0" title="未配置JSON Schema字段" type="warning">
					</el-alert>
					<view class="" v-for="(form,findex) in forms">
						<el-form :model="form" label-width="150rpx" size="small">
							<el-form-item :label="field.title" :prop="field.name" v-for="(field,findex) in fields"
								:key="findex">
								<view>
									<el-input v-model="form[field.name]" v-if="['string','text'].indexOf(field.type)>-1"
										clearable>
									</el-input>
									<SmodelSelectone v-else-if="field.type=='selectone'" v-model="form[field.name]"
										:option="{smodel:field.json.smodel,value:field.json.value,text:field.json.text}">
									</SmodelSelectone>
									<SmodelSpage v-else-if="field.type=='chooseone'" v-model="form[field.name]"
										:option="{smodel:field.json.smodel,value:field.json.value,text:field.json.text}">
									</SmodelSpage>
									<el-rate v-model="form[field.name]" v-else-if="field.type=='rate'"></el-rate>
									<el-switch v-model="form[field.name]" v-else-if="field.type=='switch'">
									</el-switch>
									<view class="colorpicker" v-else-if="field.type=='colorpicker'">
										<el-color-picker v-model="form[field.name]"></el-color-picker>
									</view>
									<el-time-picker v-model="form[field.name]" v-else-if="field.type=='timepicker'"
										class="u-w-full" value-format="HH:mm:ss">
									</el-time-picker>
									<el-date-picker v-model="form[field.name]" v-else-if="field.type=='datepicker'"
										type="date" class="u-w-full">
									</el-date-picker>
									<el-date-picker v-model="form[field.name]" value-format="timestamp"
										v-else-if="field.type=='datetimepicker'" type="datetime" class="u-w-full">
									</el-date-picker>
									<smodel-json v-model="form[field.name]" title="查看JSON"
										v-else-if="field.type=='json'">
									</smodel-json>
									<smodel-json v-model="form[field.name]" title="查看Array"
										v-else-if="field.type=='jsonarray'">
									</smodel-json>
									<el-cascader v-model="form[field.name]" v-else-if="field.type=='cascader'"
										class="u-w-full" :options="field.jsonarray" :props="{ expandTrigger: 'hover' }">
									</el-cascader>
									<el-slider v-model="form[field.name]" v-else-if="field.type=='slider'" show-input>
									</el-slider>
									<el-slider v-model="form[field.name]" v-else-if="field.type=='sliderrange'" range>
									</el-slider>
									<el-select v-model="form[field.name]" class="u-w-full"
										v-else-if="['radio','select','checkbox','multiselect'].indexOf(field.type)>-1"
										clearable>
										<el-option v-for="item in field.jsonarray" :key="item.value" :label="item.text"
											:value="item.value">
											<view class="u-flex u-row-between">
												<view>{{ item.text }}</view>
												<view class="u-font-xs">{{ item.value }}</view>
											</view>
										</el-option>
									</el-select>
									<el-input v-model="form[field.name]" v-else-if="field.type=='int'" clearable>
									</el-input>
								</view>
							</el-form-item>
							<el-form-item v-if="option.type=='array'">
								<el-button size="mini" type="text" @click="addJSON(findex)">添加</el-button>
								<el-button size="mini" type="text" @click="removeJSON(findex)">删除</el-button>
							</el-form-item>
						</el-form>
					</view>
				</el-tab-pane>
				<el-tab-pane label="源码" name="source">
					<pre :contenteditable="true" class="code" ref="code">
					{{jsonview()}}
					</pre>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" @click="jsonDataVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="close()">确 定</el-button>
			</span>
		</el-dialog>
	</view>
</template>

<script>
	import SmodelSelectone from './smodel_selectone.vue'
	import SmodelSpage from './smodel_spage.vue'
	import {
		smodel_log
	} from '../config.js'
	import debounce from './debounce.js'
	import {
		getSmodelInfo
	} from '../api/smodel_api.js'
	export default {
		name: 'SmodelJson',
		emits: ['input'],
		props: {
			value: {
				type: [Object, Array]
			},
			title: {
				type: String,
				default: 'JSON View'
			},
			option: {
				type: Object,
				default () {
					return {
						type: 'object', // object/array
						smodel: ''
					}
				}
			}
		},
		data() {
			return {
				activeTab: 'source',
				jsonStr: '',
				jsonDataVisible: false,
				smodel: [],
				fieldMap: {},
				fields: [],
				forms: [{}],
			}
		},
		mounted() {},
		watch: {
			option: {
				handler: function(v, o) {
					smodel_log('json watch option', v, o)
					this.initSmodelFields()
				},
				immediate: true
			},
			value(n) {
				smodel_log('json watch value', n)
			}
		},
		filters: {
			json2str(val) {
				return JSON.stringify(val)
			}
		},
		computed: {},
		methods: {
			async initSmodelFields() {
				if (!this.option || !this.option.smodel) return
				let res = await getSmodelInfo(this.option.smodel)
				this.smodel = res.smodel
				this.fields = res.fields
				this.fieldMap = res.fieldMap
				this.activeTab = 'ui'
			},
			jsonview() {
				if (this.option.smodel == '') return this.value
				if (this.option.type == 'array') return this.forms
				else return this.forms[0]
			},
			addJSON(i) {
				this.forms.splice(i, 0, {})
			},
			removeJSON(i) {
				this.forms.splice(i, 1)
			},
			close() {
				let jsonStr = this.$refs.code.innerText
				try {
					let json = JSON.parse(jsonStr)
					this.$emit('input', json)
					console.log('smodel_json', json)
					this.jsonDataVisible = false
				} catch (e) {
					let json = JSON.parse(jsonStr)
					this.$notify.error({
						title: 'JSON格式错误',
						message: e
					});
				}
			}
		},
		components: {
			SmodelSpage,
			SmodelSelectone
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
