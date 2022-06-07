<template>
	<view class="smodel">

		<el-form ref="form" :model="form" :rules="rules" label-width="200rpx" :status-icon="true">
			<el-tabs v-model="activeTab" @tab-click="tabClick">
				<el-tab-pane label="基础信息" name="base">
					<el-form-item label="模型标识" prop="name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="关联集合" prop="collection">
						<el-input v-model="form.collection"></el-input>
					</el-form-item>
					<el-form-item label="模型名称" prop="title">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="模型类型" prop="type">
						<el-radio-group v-model="form.type">
							<el-tooltip content="真实数据表/集合,需要查库" placement="top">
								<el-radio label="db">数据模型</el-radio>
							</el-tooltip>
							<el-tooltip content="JSON字段配置,只需要配置字段和表单即可" placement="top">
								<el-radio label="json">JSON模型</el-radio>
							</el-tooltip>
						</el-radio-group>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="模型配置" name="detail">
					<el-form-item label="模型字段" prop="fields">
						<el-card shadow="hover">
							<div slot="header" class="u-flex u-row-between">
								<span>模型字段</span>
								<el-button type="text" @click="fieldManage">管理字段</el-button>
							</div>
							<view class="u-flex u-flex-wrap">
								<view v-for="(field,index) in fields" :key="index" class="u-m-b-10 u-m-r-10">
									<el-button class=" u-w-600" @click="fieldEdit(field)">
										{{field.name + '-' + field.title + '-' + field.type}}
									</el-button>
								</view>
							</view>
						</el-card>
					</el-form-item>

					<el-form-item label="模型表单">

						<el-card shadow="hover">
							<div slot="header" class="u-flex u-row-between">
								<view class="">
									<el-radio-group v-model="form.formType" size="small">
										<el-radio-button label="base">普通表单</el-radio-button>
										<el-radio-button label="tab">分组表单</el-radio-button>
										<el-radio-button label="step">分步表单</el-radio-button>
										<el-radio-button label="mainsub">主辅表单</el-radio-button>
									</el-radio-group>
								</view>
								<view>
									<el-button type="text" @click="formGroupAdd()">添加分组/分步</el-button>
									<el-button type="text">表单配置</el-button>
								</view>
							</div>
							<view class="u-flex u-col-top u-flex-wrap">
								<view class="u-m-r-10" v-for="(group,gindex) in formGroups" :key="gindex">
									<view class=""
										v-show="form.formType=='tab'||form.formType=='step'||form.formType=='mainsub'">
										<el-input size="mini" placeholder="请输入分组/分步名" suffix-icon="el-icon-edit"
											v-model="group.name">
											<template slot="prepend">
												{{form.formType == 'step' ? ('第'+(gindex+1)+'步') : '分组'}}
											</template>
											<template slot="append">
												<el-popconfirm title="确定删除此分组(字段进入第一分组)？"
													@confirm="formGroupDelete(group,gindex)">
													<i class="el-icon-delete" slot="reference"></i>
												</el-popconfirm>
											</template>
										</el-input>
									</view>

									<view class=" u-text-center u-w-1000">
										<el-row :gutter="5">
											<draggable :list="formGroups[gindex].fieldDatas" group="people">
												<el-col v-for="(field,index) in formGroups[gindex].fieldDatas"
													:span="field.col" :key="'groupfield'+field.name"
													class="u-m-b-10 u-cursor-pointer">
													<el-card shadow="hover" :body-style={padding:0}
														class="u-box-sizing u-line-1">
														{{field.name + '-' + field.title + '-' + field.type}}
													</el-card>
												</el-col>
												<view class="u-h-50"></view>
											</draggable>
										</el-row>
									</view>
								</view>

							</view>

						</el-card>
					</el-form-item>

					<el-form-item label="模型表格" prop="gird">
						<el-card shadow="hover">
							<div slot="header" class="u-flex u-row-between">
								<view>
									表格
								</view>
								<view>
									<el-button type="text" @click="chooseFieldShow=true;">添加字段</el-button>
									<el-button type="text" @click="gridAction('addOp')">添加操作</el-button>
									<el-button type="text" @click="girdPropsShow=!girdPropsShow">表格配置</el-button>
								</view>
							</div>

							<el-table :data="girdData" style="width: 100%" v-show="!girdPropsShow">
								<view class="" slot="empty">
									请添加表格字段
								</view>
								<el-table-column label="类型" width="120">
									<template slot-scope="scope">
										<el-select size="mini" v-model="scope.row.type" placeholder="请选择">
											<el-option v-for="item in girdTypes" :key="item.value" :label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column label="字段" width="120">
									<template slot-scope="scope">
										<el-input v-model="scope.row.field" size="mini" placeholder="请输入内容"></el-input>
									</template>
								</el-table-column>
								<el-table-column label="前端函数" width="150" :render-header="renderJsfunHeader">
									<template slot-scope="scope">
										<el-autocomplete size="mini" class="inline-input" v-model="scope.row.jsfun"
											:fetch-suggestions="girdFunSuggestions" placeholder="前端函数">
											<template slot-scope="{ item }">
												<view class="u-font-sm u-line-height-15">
													<view>{{ item.value }}</view>
													<view>{{ item.title }}</view>
												</view>
											</template>
										</el-autocomplete>
									</template>
								</el-table-column>
								<el-table-column label="后端函数" width="150" :render-header="renderApifunHeader">
									<template slot-scope="scope">
										<el-autocomplete size="mini" class="inline-input" v-model="scope.row.apifun"
											:fetch-suggestions="girdFunSuggestions" placeholder="后端函数">
											<template slot-scope="{ item }">
												<view class="u-font-sm u-line-height-15">
													<view>{{ item.value }}</view>
													<view>{{ item.title }}</view>
												</view>
											</template>
										</el-autocomplete>
									</template>
								</el-table-column>
								<el-table-column label="名称" width="120">
									<template slot-scope="scope">
										<el-input v-model="scope.row.label" size="mini" placeholder="请输入内容"></el-input>
									</template>
								</el-table-column>
								<el-table-column label="宽度" width="120">
									<template slot-scope="scope">
										<el-input v-model="scope.row.width" size="mini" placeholder="数字/auto/空">
										</el-input>
									</template>
								</el-table-column>
								<el-table-column label="对齐方式" width="120">
									<template slot-scope="scope">
										<el-select size="mini" v-model="scope.row.align" placeholder="请选择">
											<el-option v-for="item in alignTypes" :key="item.value" :label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column label="排序" width="60">
									<template slot-scope="scope">
										<el-switch v-model="scope.row.sortable"></el-switch>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="180">
									<template slot-scope="scope">
										<el-button-group>
											<el-button round size="mini"
												@click="gridAction('up', scope.$index,scope.row)" icon="el-icon-top">
											</el-button>
											<el-button round size="mini"
												@click="gridAction('down', scope.$index,scope.row)"
												icon="el-icon-bottom"></el-button>
											<el-button round size="mini"
												@click="gridAction('del', scope.$index,scope.row)"
												icon="el-icon-delete"></el-button>
										</el-button-group>
									</template>
								</el-table-column>
							</el-table>

							<view class="" v-show="girdPropsShow">
								<el-form ref="form" :model="girdProps" style="width:800rpx;" label-width="120px"
									size="mini">
									<el-form-item label="活动区域">
										<el-select v-model="girdProps.region" placeholder="请选择活动区域">
											<el-option label="区域一" value="shanghai"></el-option>
											<el-option label="区域二" value="beijing"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="特殊资源">
										<el-radio-group v-model="girdProps.resource">
											<el-radio border label="线上品牌商赞助"></el-radio>
											<el-radio border label="线下场地免费"></el-radio>
										</el-radio-group>
									</el-form-item>
								</el-form>


							</view>

							<view class="u-flex u-flex-wrap" v-if="false">
								<el-input type="textarea" :rows="2" placeholder="请输入内容" />
							</view>
						</el-card>
					</el-form-item>
					<el-form-item label="普通搜索字段">
						<el-select v-model="form.searchFields" style="width:100%;" multiple placeholder="请选择">
							<el-option v-for="(item,index) in fields" :key="index" :label="item.title + '-' + item.name"
								:value="item.name">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="高级搜索字段">
						<el-select v-model="form.searchFormFields" style="width:100%;" multiple placeholder="请选择">
							<el-option v-for="(item,index)  in fields" :key="index"
								:label="item.title + '-' + item.name" :value="item.name">
							</el-option>
						</el-select>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="属性配置" name="prop">
					<el-row>
						<el-col :span="8">
							<el-form-item label="新增功能">
								<el-radio-group v-model="form.addBtn" size="mini">
									<el-radio-button :label="0">关闭</el-radio-button>
									<el-radio-button :label="1">新页打开</el-radio-button>
									<el-radio-button :label="2">弹框打开</el-radio-button>
									<el-radio-button :label="3">抽屉打开</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="编辑功能">
								<el-radio-group v-model="form.editBtn" size="mini">
									<el-radio-button :label="0">关闭</el-radio-button>
									<el-radio-button :label="1">新页打开</el-radio-button>
									<el-radio-button :label="2">弹框打开</el-radio-button>
									<el-radio-button :label="3">抽屉打开</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="批量功能">
								<el-switch v-model="form.multBtn" active-text="开启" inactive-text="关闭">
								</el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="删除功能">
								<el-switch v-model="form.delBtn" active-text="开启" inactive-text="关闭">
								</el-switch>
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="导出功能">
								<el-switch v-model="form.exportBtn" active-text="开启" inactive-text="关闭">
								</el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="导入功能">
								<el-switch v-model="form.importBtn" active-text="开启" inactive-text="关闭">
								</el-switch>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="每页数量">
								<el-input-number v-model="form.pageSize" :min="1" :max="1000" label="默认10" size="mini"></el-input-number>
							</el-form-item>
						</el-col>
					</el-row>


				</el-tab-pane>
				<el-tab-pane label="其他配置" name="other">
					<el-form-item label="部署" prop="gird">
						<el-collapse>
							<el-collapse-item title="1、下载/更新数据库文件" name="1">
								<view>
									<el-button type="text" @click="otherSchemaAction('gen')">重新生成</el-button>
									<el-button type="text" @click="otherSchemaAction('copy')">复制代码</el-button>
									<el-button type="text" @click="otherSchemaAction('down')">下载文件</el-button>
								</view>
								<pre :contenteditable="true" ref="schemaCode" style="line-height:36rpx;">
								{{schemaCode}}
								</pre>
							</el-collapse-item>
							<el-collapse-item title="2、参数访问模式" name="2">
								<div>通过参数方式访问模型功能</div>
								<div>入口地址：/pages/spage/list?spage={{form.name}}</div>
								<div>或在[模型列表->数据->快速菜单]配置菜单</div>
							</el-collapse-item>
							<el-collapse-item title="3、单页访问模式" name="3">
								<div>1）复制spage目录到pages下，重命名{{form.name}}</div>
								<div>2）添加页面配置到pages.json：</div>
								<pre :contenteditable="true" style="line-height:36rpx;">{{smodelPages}}</pre>
								<div>3）修改pages/{{form.name}}/list、pages/{{form.name}}/edit中配置spage:'{{form.name}}'</div>
								<div>4）[模型列表->数据->快速菜单]配置菜单</div>
							</el-collapse-item>
						</el-collapse>
					</el-form-item>
				</el-tab-pane>
			</el-tabs>

			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">修改</el-button>
				<el-button @click="refreshForm('form')">刷新</el-button>
			</el-form-item>
		</el-form>

		<el-dialog title="选择需要的字段" :visible.sync="chooseFieldShow" width="1400rpx" center>
			<view class="u-flex u-flex-wrap">
				<el-row :gutter="10">
					<el-checkbox-group v-model="fieldChecks">
						<el-col :span="12" v-for="(field,index) in fields" :key="field.name">
							<el-checkbox border class="u-m-b-10 u-w-full" :label="field.name">
								{{field.name + '-' + field.title + '-' + field.type}}
							</el-checkbox>
						</el-col>
					</el-checkbox-group>
				</el-row>
				<view>

				</view>
			</view>
			<span slot="footer" class="dialog-footer">
				<el-button @click="chooseFieldShow = false">取 消</el-button>
				<el-button type="primary" @click="chooseField">确 定</el-button>
			</span>
		</el-dialog>
	</view>
</template>

<script>
	import {
		smodel_log
	} from './config.js'
	import draggable from 'vuedraggable'
	import {
		download
	} from './components/smodel'
	import {
		typeJsonMap
	} from './components/sfield.js'
	import {
		getSmodelInfo,
		updateSmodel
	} from './api/smodel_api.js'
	export default {
		data() {
			return {
				id: '',
				spage: '',
				activeTab: 'detail',
				form: {
					name: '',
					title: '',
					type: 'db',
					formType: 'base',
					formGroups: [{
						name: '基础',
						fields: []
					}],
					girdData: [],
					searchFields: [],
					searchFormFields: [],
					addBtn: false,
					editBtn: false,
					multBtn: false,
					delBtn: false,
					exportBtn: false,
					importBtn: false,
				},
				formGroups: [],
				fieldMap: {},
				fields: [],
				girdData: [],
				girdTypes: [{
						value: 'field',
						label: '字段'
					},
					{
						value: 'fun',
						label: '前端函数'
					},
					{
						value: 'action',
						label: '操作区'
					},
				],
				alignTypes: [{
						value: 'left',
						label: '靠左'
					},
					{
						value: 'center',
						label: '居中'
					},
					{
						value: 'right',
						label: '靠右'
					},
				],
				chooseFieldShow: false,
				fieldChecks: [],
				girdPropsShow: false,
				girdProps: {},
				rules: {},
				schemaCode: {},
			}
		},
		onLoad(option) {
			if (!option.spage) {
				this.$message.error('参数错误');
				uni.navigateBack({
					animationDuration: 1500
				})
			}
			if (option.tab) this.activeTab = option.tab
			this.spage = option.spage
			this.init()
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
			async init() {
				await this.initSmodelFields()
				this.preHandleSmodel()
			},
			async initSmodelFields() {
				let res = await getSmodelInfo(this.spage)
				this.form = res.smodel
				this.id = res.smodel._id
				this.fields = res.fields
				this.fieldMap = res.fieldMap
			},
			preHandleSmodel() {
				//空字段处理
				if (!this.form.formType) this.form.formType = 'base'
				if (!this.form.formGroups) this.form.formGroups = [{
					name: '基础',
					fields: []
				}]
				// 模型表单预处理：填充表单字段+填充新增字段
				let groupFields = [] //已在分组字段
				for (let group of this.form.formGroups) {
					groupFields = groupFields.concat(group.fields)
					let fieldDatas = []
					for (let f of group.fields) {
						if (this.fieldMap[f]) fieldDatas.push(this.fieldMap[f])
					}
					group['fieldDatas'] = fieldDatas
					// this.formGroups.push(group)
					//上面方法，因为drag排序无效
					this.formGroups.push({
						'name': group.name,
						'fields': group.fields,
						'fieldDatas': fieldDatas
					})
					smodel_log('push', group.name, fieldDatas)
				}
				let allFields = Object.keys(this.fieldMap)
				//新增字段，总字段有但分组字段没有
				let newFields = allFields.filter(v => {
					return groupFields.indexOf(v) === -1
				})
				let newFieldDatas = []
				for (let f of newFields) {
					newFieldDatas.push(this.fieldMap[f])
				}
				this.formGroups[0].fieldDatas.push(...newFieldDatas)
				smodel_log('this.formGroups', groupFields, allFields, newFields, this.formGroups)

				this.girdData = this.form.girdData
			},
			formGroupAdd() {
				if (this.form.formType == 'mainsub' && this.formGroups.length > 1) {
					return this.$message.error('主辅表单最多2个分组：主+辅')
				}
				this.formGroups.push({
					name: '表单',
					fields: [],
					fieldDatas: []
				})
			},
			formGroupDelete(group, index) {
				if (index == 0) return this.$message.error('第一个分组不能删除，可修改为普通表单')
				this.formGroups.splice(index, 1)
				this.formGroups[0].fieldDatas.push(...group.fieldDatas)
			},
			chooseField() {
				smodel_log(this.fieldChecks)
				this.chooseFieldShow = false
				for (let f of this.fieldChecks) {
					let field = this.fieldMap[f]
					this.girdData.push({
						type: 'field',
						field: field.name,
						fun: '',
						label: field.title
					})
				}
			},
			gridAction(action, index, row) {
				smodel_log(action, index, row)
				if (action == 'up') {
					if (index != 0) {
						this.girdData[index] = this.girdData.splice(index - 1, 1, this.girdData[index])[0]
					}
				} else if (action == 'down') {
					if (index != this.girdData.length - 1) {
						this.girdData[index] = this.girdData.splice(index + 1, 1, this.girdData[index])[0]
					}
				} else if (action == 'del') {
					this.girdData.splice(index, 1)
				} else if (action == 'addOp') {
					this.girdData.push({
						type: 'action',
						field: '',
						fun: '',
						label: '操作'
					})
				}
			},
			girdFunSuggestions(queryString, cb) {
				let funs = [{
					"value": "show_rectangle_image_field",
					"title": "单图长方形显示"
				},{
					"value": "show_square_image_field",
					"title": "单图正方形显示"
				}, {
					"value": "copy_field",
					"title": "拷贝内容"
				}];
				var results = queryString ? funs.filter((fun) => {
					return (fun.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
				}) : funs;

				cb(results);
			},
			renderJsfunHeader(h, { column, $index }){
				return h('el-tooltip',{props:{'content':'参看示例:smodel/components/spage_jsfun.vue，类型选择前端函数','placement':'top'}},[h('div','前端函数(?)')])
			},
			renderApifunHeader(h, { column, $index }) {
				return h('el-tooltip',{props:{'content':'参看示例:cloudfunctions/spage/spage_apifun.js,只要填写就会执行','placement':'top'}},[h('div','后端函数(?)')])
			},
			girdFunHandleSelect(item) {
				smodel_log(item);
			},
			submitForm(formName) {
				let formGroups = []
				for (let group of this.formGroups) {
					let fields = []
					for (let field of group.fieldDatas) {
						fields.push(field.name)
					}
					formGroups.push({
						name: group.name,
						fields: fields
					})
				}
				this.form.formGroups = formGroups
				this.form.girdData = this.girdData
				smodel_log('submit!', this.form);
				delete this.form['_id']
				this.$refs[formName].validate(async (valid, obj) => {
					if (valid) {
						updateSmodel(this.id, this.form).then(res => {
							this.$message.success('修改模型成功');
						}).catch(err => {
							console.error('update model error:', err)
							this.$message.error('修改模型错误');
						})
					} else {
						for (let k in obj) {
							return this.$message.error(obj[k][0]['message'])
						}
						return false;
					}
				});
			},
			otherSchemaAction(action) {
				if (action == 'copy') {
					uni.setClipboardData({
						data: this.$refs['schemaCode'].innerHTML,
						success: function() {}
					});
				} else if (action == 'gen') {
					let code = {
						"bsonType": "object",
						"required": [],
						"properties": {
							"_id": {
								"description": "ID，系统自动生成"
							}
						}
					}

					for (let field of this.fields) {
						let bsonType = typeJsonMap[field.type]['bsonType']
						code.properties[field.name] = {
							"bsonType": bsonType,
							"label": field.title,
							"description": field.remark,
						}
					}
					smodel_log(typeJsonMap, this.fields, code)
					this.schemaCode = code
				} else if (action == 'down') {
					download(this.$refs['schemaCode'].innerHTML, this.form.name + ".schema.json", "text/plain")
				}

			},
			refreshForm(formName) {
				this.init()
			},
			tabClick(tab, event) {
				if (this.activeTab == 'other') this.otherSchemaAction('gen')
			},
			fieldManage() {
				uni.navigateTo({
					'url': `../spage/list?spage=sfield&smodel_id=${this.id}`
				})
			},
			fieldEdit(field) {
				uni.navigateTo({
					'url': `../spage/edit?spage=sfield&id=${field._id}`
				})
			}
		},
		// 过滤器
		filters: {

		},
		// 计算属性
		computed: {
			smodelPages() {
				return [{
						path: `pages/${this.form.name}/list`,
						style: {
							navigationBarTitleText: `${this.form.title}列表`
						}
					},
					{
						path: `pages/${this.form.name}/edit`,
						style: {
							navigationBarTitleText: `${this.form.title}修改`
						}
					},
				]
			}
		},
		components: {
			draggable
		}
	}
</script>
<style lang="scss" scoped>
	@import './components/smodel.scss';

	.smodel {
		padding: 40rpx;
	}
</style>
