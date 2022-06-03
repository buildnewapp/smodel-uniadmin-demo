<template>
	<view class="smodel" v-loading="loading">

		<view class="u-flex u-row-between u-col-bottom" v-if="searchFields.length>0 || searchFormFields.length>0">
			<el-form :inline="true" :model="form" label-width="150rpx" size="small" v-if="!formSeniorShow">
				<el-form-item :label="field.title" :prop="field.name" v-for="(field,findex) in searchFields"
					:key="findex">
					<view style="width:250px;">
						<el-input v-model="form[field.name]" v-if="['string','text'].indexOf(field.type)>-1" clearable>
						</el-input>
						<el-input v-model="form[field.name]" v-else-if="['selectone'].indexOf(field.type)>-1" clearable>
						</el-input>
						<el-rate v-model="form[field.name]" v-else-if="field.type=='rate'"></el-rate>
						<el-switch v-model="form[field.name]" v-else-if="field.type=='switch'">
						</el-switch>
						<view class="colorpicker" v-else-if="field.type=='colorpicker'">
							<el-color-picker v-model="form[field.name]"></el-color-picker>
						</view>
						<el-time-picker v-model="form[field.name]" v-else-if="field.type=='timepicker'" class="u-w-full"
							value-format="HH:mm:ss">
						</el-time-picker>
						<el-date-picker v-model="form[field.name]" v-else-if="field.type=='datepicker'" type="date"
							class="u-w-full">
						</el-date-picker>
						<el-date-picker v-model="form[field.name]" value-format="timestamp"
							v-else-if="field.type=='datetimepicker'" type="datetime" class="u-w-full"></el-date-picker>
						<smodel-json v-model="form[field.name]" title="查看JSON" v-else-if="field.type=='json'">
						</smodel-json>
						<smodel-json v-model="form[field.name]" title="查看Array" v-else-if="field.type=='jsonarray'">
						</smodel-json>
						<el-cascader v-model="form[field.name]" v-else-if="field.type=='cascader'" class="u-w-full"
							:options="field.jsonarray" :props="{ expandTrigger: 'hover' }">
						</el-cascader>
						<el-slider v-model="form[field.name]" v-else-if="field.type=='slider'" show-input>
						</el-slider>
						<el-slider v-model="form[field.name]" v-else-if="field.type=='sliderrange'" range>
						</el-slider>
						<el-select v-model="form[field.name]" class="u-w-full"
							v-else-if="['radio','select','checkbox','multiselect'].indexOf(field.type)>-1" clearable>
							<el-option v-for="item in field.jsonarray" :key="item.value" :label="item.text"
								:value="item.value">
								<view class="u-flex u-row-between">
									<view>{{ item.text }}</view>
									<view class="u-font-xs">{{ item.value }}</view>
								</view>
							</el-option>
						</el-select>
						<el-input v-model="form[field.name]" v-else-if="field.type=='int'" clearable></el-input>
					</view>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="form" label-width="150rpx" size="small" v-else>
				<el-form-item :label="field.title" :prop="field.name" v-for="(field,findex) in searchFormFields"
					:key="findex">
					<view style="width:250px;">
						<el-input v-model="form[field.name]" v-if="['string','text'].indexOf(field.type)>-1" clearable>
						</el-input>
						<el-input v-model="form[field.name]" v-else-if="['selectone'].indexOf(field.type)>-1" clearable>
						</el-input>
						<el-rate v-model="form[field.name]" v-else-if="field.type=='rate'"></el-rate>
						<el-switch v-model="form[field.name]" v-else-if="field.type=='switch'">
						</el-switch>
						<view class="colorpicker" v-else-if="field.type=='colorpicker'">
							<el-color-picker v-model="form[field.name]"></el-color-picker>
						</view>
						<el-time-picker v-model="form[field.name]" v-else-if="field.type=='timepicker'" class="u-w-full"
							value-format="HH:mm:ss">
						</el-time-picker>
						<el-date-picker v-model="form[field.name]" v-else-if="field.type=='datepicker'" type="date"
							class="u-w-full">
						</el-date-picker>
						<el-date-picker v-model="form[field.name]" value-format="timestamp"
							v-else-if="field.type=='datetimepicker'" type="datetime" class="u-w-full"></el-date-picker>
						<smodel-json v-model="form[field.name]" title="查看JSON" v-else-if="field.type=='json'">
						</smodel-json>
						<smodel-json v-model="form[field.name]" title="查看Array" v-else-if="field.type=='jsonarray'">
						</smodel-json>
						<el-cascader v-model="form[field.name]" v-else-if="field.type=='cascader'" class="u-w-full"
							:options="field.jsonarray" :props="{ expandTrigger: 'hover' }">
						</el-cascader>
						<el-slider v-model="form[field.name]" v-else-if="field.type=='slider'" show-input>
						</el-slider>
						<el-slider v-model="form[field.name]" v-else-if="field.type=='sliderrange'" range>
						</el-slider>
						<el-select v-model="form[field.name]" class="u-w-full"
							v-else-if="['radio','select','checkbox','multiselect'].indexOf(field.type)>-1" clearable>
							<el-option v-for="item in field.jsonarray" :key="item.value" :label="item.text"
								:value="item.value">
								<view class="u-flex u-row-between">
									<view>{{ item.text }}</view>
									<view class="u-font-xs">{{ item.value }}</view>
								</view>
							</el-option>
						</el-select>
						<el-input v-model="form[field.name]" v-else-if="field.type=='int'" clearable></el-input>
					</view>
				</el-form-item>
			</el-form>
			<view class="u-flex u-m-b-35">
				<el-button type="primary" @click="formSubmit" size="small" icon="el-icon-search">查询</el-button>
				<el-button type="text" @click="formSeniorShow=true" size="small" v-show="!formSeniorShow"
					v-if="searchFormFields.length>0">
					展开<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-button type="text" @click="formSeniorShow=false" size="small" v-show="formSeniorShow"
					v-if="searchFormFields.length>0">
					收缩<i class="el-icon-arrow-up el-icon--right"></i>
				</el-button>
			</view>
		</view>
		<view v-if="sfrom == ''">
			<el-row>
				<el-button v-if="smodel.addBtn" type="success" size="small" icon="el-icon-circle-plus-outline"
					@click="handleAdd">添加
				</el-button>
				<el-button v-if="smodel.importBtn" type="success" size="small" icon="el-icon-upload2" @click="">导入
				</el-button>
				<el-button v-if="smodel.exportBtn" type="success" size="small" icon="el-icon-download" @click="">导出本页
				</el-button>
				<el-button v-if="smodel.exportBtn" type="success" size="small" icon="el-icon-takeaway-box" @click="">
					导出全部
				</el-button>
				<el-button v-if="smodel.exportBtn" type="success" size="small" icon="el-icon-document-copy" @click="">
					自定义导出
				</el-button>
			</el-row>
		</view>
		<view class="table">
			<el-table :data="modelData.lists" style="width: 100%" stripe size="medium" :highlight-current-row="true"
				@sort-change="tableSortChange">
				<el-table-column type="selection" width="55" v-if="smodel.multBtn">
				</el-table-column>
				<template v-for="(col, index) in girdData">
					<el-table-column v-if="col.type == 'field'" :prop="col.field" :align="col.align" :label="col.label"
						:width="col.width?col.width:'auto'" :show-overflow-tooltip="true"
						:sortable="col.sortable?'custom':false">
						<template slot-scope="scope">
							<!-- {{col._field.type}} -->
							<view
								v-if="['string','int','text','colorpicker','datepicker','timepicker','slider'].indexOf(col._field.type)>-1">
								{{ scope.row[col.field] }}
							</view>
              <view v-else-if="['datetimepicker'].indexOf(col._field.type)>-1">
                {{ scope.row[col.field]|time_format}}
              </view>
							<el-tag v-else-if="['radio','select'].indexOf(col._field.type)>-1" size="small">
								{{ col._enums[scope.row[col.field]] }}
							</el-tag>
							<view v-else-if="['checkbox','multiselect'].indexOf(col._field.type)>-1">
								<span class="u-m-r-10 u-font-xs"
									v-for="val in scope.row[col.field]">{{col._enums[val]}}</span>
							</view>
							<view v-else-if="['selectone','cascader','sliderrange'].indexOf(col._field.type)>-1">
								{{ scope.row[col.field] }}
							</view>
							<el-tag v-else-if="['json','jsonarray'].indexOf(col._field.type)>-1" size="small">
								查看
							</el-tag>
							<el-switch v-else-if="col._field.type == 'switch'" v-model="scope.row[col.field]" disabled>
							</el-switch>
							<el-rate v-model="scope.row[col.field]" v-else-if="col._field.type=='rate'" disabled>
							</el-rate>
							<el-tag v-else-if="col._field.type == 'selects'" size="small">
								{{ col._enums[scope.row[col.field]] }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column v-else-if="col.type=='fun'" :label="col.label" :show-overflow-tooltip="true">
						<template slot-scope="scope">
							fun
						</template>
					</el-table-column>
					<el-table-column v-else-if="col.type=='action' && sfrom==''" :label="col.label" fixed="right"
						align="center" :width="col.width?col.width:'auto'">
						<template slot-scope="scope">
							<el-button v-if="smodel.editBtn" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
							</el-button>
							<el-button v-if="smodel.delBtn" size="mini" type="danger"
								@click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column v-else-if="sfrom=='selectone'" label="选择" fixed="right" align="center" width="120">
						<template slot-scope="scope">
							<el-button icon="el-icon-circle-check" size="small" type="success" round
								@click="handleChoose(scope.$index, scope.row)">选择
							</el-button>
						</template>
					</el-table-column>
				</template>
			</el-table>
		</view>
		<view class="pagination">
			<el-pagination background @size-change="paginationSizeChange" @current-change="paginationCurrentChange"
				@prev-click="paginationCurrentChange" @next-click="paginationCurrentChange" :hide-on-single-page="true"
				:current-page="currentPage" :page-sizes="[10, 100, 1000, 10000]" :page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper" :total="modelData.total">
			</el-pagination>
		</view>
		<SpageEditBtn ref="spageEditBtn"></SpageEditBtn>
	</view>
</template>

<script>
	import {
		smodel_log
	} from '../smodel/config.js'
  import {
    friendlyDate
  } from '../smodel/components/date-format.js'
	import SmodelJson from '../smodel/components/smodel_json.vue'
	import SpageEditBtn from '../smodel/components/spage_edit_btn.vue'

	import {
		getSmodelInfo
	} from '../smodel/api/smodel_api.js'
	import {
		fetchSpageList
	} from '../smodel/api/spage_api.js'
	export default {
		data() {
			return {
				sfrom: '', //组件模式,selectone选择器
				spage: 'deme',
				smodel: {},
				loading: true,
				fieldMap: {},
				fields: [],
				currentPage: 1,
				pageSize: 10,
				form: {},
				orderBy: ['_id', 'asc'],
				modelData: {
					total: 0,
					lists: []
				},
				girdData: [],
				formSeniorShow: false,
				searchFields: [],
				searchFormFields: [],
				selectone: {
					option: {}, //selectone模式参数
					chooses: [], //已选择s
				}
			};
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			this.init(options);
			uni.$on(`${this.spage}_add_ok`, () => this.init({spage:this.spage,...this.form}))
		},
		onUnload() {
			uni.$off(`${this.spage}_add_ok`)
		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {},
		// 函数
		methods: {
			// 页面数据初始化函数
			async init(option) {
				if (option.spage) {
					this.spage = option.spage
				}
				this.form = Object.assign({}, option, this.form)
				await this.initSmodelFields()
				this.initPageData()
			},
			async initPageData() {
				this.modelData = await fetchSpageList(this.smodel.collection, this.form, this.orderBy,
					this.currentPage, this.pageSize,this)
				this.loading = false
			},
			async initSmodelFields() {
				let res = await getSmodelInfo(this.spage)
				this.smodel = res.smodel
				this.fields = res.fields
				this.fieldMap = res.fieldMap
				this.girdData = this.smodel.girdData
				for (let col of this.girdData) {
					if (col.type == 'field') {
						col['_field'] = this.fieldMap[col.field]
						console.log(col.field, col['_field'], this.fieldMap)
						console.log(col['_field'].type)
						col['_enums'] = {}
						col['_filters'] = []
						if (['radio', 'select', 'checkbox', 'multiselect'].indexOf(col['_field'].type) > -1) {
							col['_filters'] = col['_field']['jsonarray']
							for (let item of col['_field']['jsonarray']) {
								col['_enums'][item.value] = item.text
							}
						}
					}
				}
				for (let f of this.smodel.searchFormFields) {
					let field = this.fieldMap[f]
					this.searchFormFields.push(field)
				}
				for (let f of this.smodel.searchFields) {
					let field = this.fieldMap[f]
					this.searchFields.push(field)
				}
			},
			formSubmit() {
				smodel_log('formSubmit', this.form);
				this.initPageData()
			},
			tableSortChange(option) {
				this.orderBy = ['_id', 'asc']
				if (option.order == 'ascending') this.orderBy = [option.prop, 'asc']
				else if (option.order == 'descending') this.orderBy = [option.prop, 'desc']
				smodel_log('tableSortChange', option.column, option.prop, option.order, this.orderBy)
				this.initPageData()
			},
			// 显示添加页面
			handleAdd() {
				this.$refs.spageEditBtn.show(this.smodel.addBtn, '', this.spage, this.form)
			},
			handleEdit(index, row) {
				this.$refs.spageEditBtn.show(this.smodel.editBtn, row._id, this.spage, {})
			},
			showSelectone(option) {
				this.sfrom = 'selectone'
				this.selectone.option = option
				this.loading = true
				this.init({
					spage: option.smodel
				})
			},
			handleChoose(i, row) {
				let val = this.selectone.option.value
				let max = this.selectone.option.max
				if (max == 1) this.selectone.chooses = []
				let index = this.selectone.chooses.findIndex((currentValue, index, arr) => {
					return currentValue[val] == row[val]
				})
				smodel_log('handleChoose', index, this.selectone.chooses, row)
				if (index > -1) {
					this.selectone.chooses.splice(index, 1)
				} else {
					if (row[this.selectone.option.value]) this.selectone.chooses.push(row)
					else {
						this.$message.error('数据为空，不能选择')
					}
				}
				if (this.selectone.chooses.length >= max) {
					this.$emit("chooseModelData", this.selectone.chooses);
				}
			},
			paginationSizeChange(val) {
				smodel_log(`每页 ${val} 条`);
				this.pageSize = val
				this.currentPage = 1
				this.initPageData()
			},
			paginationCurrentChange(val) {
				smodel_log(`当前页: ${val}`);
				this.currentPage = val
				this.initPageData()
			},
			handleDelete(index, row) {},
		},
		// 监听属性
		watch: {},
		// 过滤器
		filters: {
      time_format(v) {
        return friendlyDate(new Date(v), 'yyyy-MM-dd')
      }
    },
		// 计算属性
		computed: {},
		components: {
			SmodelJson,
			SpageEditBtn
		}
	};
</script>
<style lang="scss" scoped>
	@import '../smodel/components/smodel.scss';

	$smodel-font-size-sm:12px;

	.smodel {
		padding: 40rpx;

		.table {
			margin-top: 40rpx;
		}

		.pagination {
			margin-top: 40rpx;
		}
	}

	::v-deep {
		.el-form-item__label {
			font-size: $smodel-font-size-sm;
		}

		.el-pagination .btn-next,
		.el-pagination .btn-prev {
			border: none;
		}

		.el-pagination .btn-next,
		.el-pagination .btn-prev,
		.el-pagination span:not([class*=suffix]) {
			display: inline-block;
			font-size: $smodel-font-size-sm;
			min-width: 35.5px;
			height: 28px;
			line-height: 28px;
			vertical-align: top;
			box-sizing: border-box;
		}

	}
</style>
