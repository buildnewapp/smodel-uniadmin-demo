<template>
	<view class="smodel" v-loading="loading">

		<view class="u-flex u-row-between">
			<view class="">
				<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">添加</el-button>
				<el-button size="small" icon="el-icon-upload2" @click="importBtn">导入</el-button>
				<el-button size="small" icon="el-icon-tickets" @click="viewJsonList('json')" v-if="form.type=='db'">
					JSON模型</el-button>
				<el-button size="small" icon="el-icon-tickets" @click="viewJsonList('db')"
					v-else-if="form.type=='json'">数据模型</el-button>
			</view>
			<view class="u-flex">
				<el-input placeholder="搜索模型名称" clearable size="mini" v-model="form.name" class="u-m-r-20"></el-input>
				<el-button size="mini" @click="init">搜索</el-button>
				<el-button size="mini" type="text" @click="showHelp=!showHelp">帮助</el-button>
			</view>
		</view>
		<view class="table">
			<el-table :data="modelData.lists" border style="width: 100%">
				<el-table-column label="ID" width="100">
					<template slot-scope="scope">
						<el-tooltip effect="dark" :content="scope.row._id" placement="top-start">
							<span class="u-w-150 u-line-1 u-inline-block u-cursor-pointer"
								@click="copy(scope.row._id)"><i
									class="el-icon-copy-document el-icon--right"></i>{{ scope.row._id }}</span>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column label="模型">
					<template slot-scope="scope">
						<span>{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="名称">
				</el-table-column>
				<el-table-column prop="type" label="类型" width="90">
					<template slot-scope="scope">
						{{ typeEnums[scope.row.type] }}
					</template>
				</el-table-column>
				<el-table-column label="创建日期" width="110">
					<template slot-scope="scope">
						{{ scope.row.create_time|time_format}}
					</template>
				</el-table-column>
				<el-table-column label="列表功能配置" width="280">
					<template slot-scope="scope" v-if="scope.row.type=='db'">
						<el-button type="text" size="mini" :disabled="scope.row.searchFields.length==0">搜索</el-button>
						<el-button type="text" size="mini" :disabled="!scope.row.addBtn">新增</el-button>
						<el-button type="text" size="mini" :disabled="!scope.row.editBtn">编辑</el-button>
						<el-button type="text" size="mini" :disabled="!scope.row.multBtn">批量</el-button>
						<el-button type="text" size="mini" :disabled="!scope.row.delBtn">删除</el-button>
						<el-button type="text" size="mini" :disabled="!scope.row.importBtn">导入</el-button>
						<el-button type="text" size="mini" :disabled="!scope.row.exportBtn">导出</el-button>
					</template>
				</el-table-column>
				<el-table-column label="模型功能" width="260">
					<template slot-scope="scope">
						<template v-if="scope.row.type=='db'">
							<el-button size="mini" type="text" @click="handleQuickMenu(scope.$index, scope.row)">快速菜单
							</el-button>
							<SmodelSpage
								:option="{smodel:scope.row.name,title:scope.row.title,value:'_id',text:'name'}">
							</SmodelSpage>
							<el-button size="mini" type="text" @click="handleCopy(scope.$index, scope.row)">复制
							</el-button>
							<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
							<el-button size="mini" type="text" @click="handleSmodelDeploy(scope.$index, scope.row)">部署
							</el-button>
							<el-button size="mini" type="text" @click="handleExport(scope.$index, scope.row)">导出
							</el-button>
						</template>
						<template v-else-if="scope.row.type=='json'">
							<el-button size="mini" type="text" @click="handleCopy(scope.$index, scope.row)">复制
							</el-button>
							<el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除
							</el-button>
							<el-button size="mini" type="text" @click="handleExport(scope.$index, scope.row)">导出
							</el-button>
						</template>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="240" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleFieldManage(scope.$index, scope.row)">字段</el-button>
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" @click="handleSmodelData(scope.row)" v-if="scope.row.type=='db'">数据
						</el-button>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</view>

		<view v-if="showHelp">
			<el-card shadow="never">
				<div slot="header" class="u-flex u-row-between">
					<span>模型帮助 <i class="el-icon-question u-m-l-10"></i> </span>
					<el-button type="text" @click="showHelp=false">关闭提醒</el-button>
				</div>
				<div>
					<div class="u-font-lg">1 模型使用流程</div>
					<div class="u-font-sm u-m-l-20 u-line-height-20">
						1) 添加数据表：添加->输入模型标识+名称<br />
						2) 添加表字段：操作->字段，添加功能，模型中需要有status、create_time字段，完善所有表字段<br />
						3) 创建表结构：数据->部署，下载数据库文件 xxx.schema.json，拷贝到uniCloud/database目录，上传DB Schema<br />
						4) 访问页面：2种模式（参数访问模式、单页访问模式），参考部署配置项目
					</div>
				</div>
				<div class="u-m-t-40">
					<div class="u-font-lg">2 模型功能介绍</div>
					<div class="u-font-sm u-m-l-20 u-line-height-20">
						CRUD<br />
						快速创建数据表、数据字段，通过界面配置列表和编辑表单，支持20+种数据类型
					</div>
				</div>
				<div class="u-m-t-40">
					<div class="u-font-lg">3 模型表单配置</div>
					<div class="u-font-sm u-m-l-20 u-line-height-20">
						1) 表单模式，支持普通表单、分组表单、分步表单，分组、分步表单支持配置名称<br />
						2) 表单字段支持布局配置，支持拖拽排序字段先后<br />
						3) 字段根据类型渲染不同组件，<a href="https://element.eleme.cn/#/zh-CN/component/input"
							target="_blank">字段配置</a>支持json格式配置文件，支持自定义显示和字段<br />
						4) 表单配置<a href="https://element.eleme.cn/#/zh-CN/component/form" target="_blank">文档</a>
					</div>
				</div>
				<div class="u-m-t-40">
					<div class="u-font-lg">4 模型列表配置</div>
					<div class="u-font-sm u-m-l-20 u-line-height-20">
						1) 支持配置表格显示字段，可配置名称、宽度、对齐，支持排序（后端），支持函数（后端全局函数）<br />
						2) 表格配置字段会选择合适的显示方式，如枚举、图片、文件等<br />
						3) 表格支持搜索，可配置简单搜索+高级搜索字段<br />
						4) 表格功能区受属性配置影响，可配置新增、编辑、删除、批量、导入、导出功能<br />
						5) 表格配置<a href="https://element.eleme.cn/#/zh-CN/component/table" target="_blank">文档</a>
					</div>
				</div>
				<div class="u-m-t-40">
					<div class="u-font-lg">5 模型字段配置</div>
					<div class="u-font-sm u-m-l-20 u-line-height-20">
						1) 字段必填3要素，标识、标题、类型，支持26种常见类型，每种会自动渲染相应组件<br />
						2) 字段默认值：新增填充进表单，输入备注：输入placeholder，输入提示：字段tip，布局值：0~24；<br />字段配置值：json对象
						<a href="https://element.eleme.cn/#/zh-CN/component/input"
							target="_blank">文档</a>，JSON对象：特殊组件配置项（如selectone、chooseone），
						JSON数组：特殊组件配置参数（如radio、select等），关联模型：字段所属模型<br />
						3) 其他字段按照字面意思理解<br />
						4) 数据类型，参考文档<a href="https://element.eleme.cn/#/zh-CN/component/input"
							target="_blank">文档</a><br />
					</div>
				</div>
			</el-card>
		</view>

		<SmodelQuickmenu ref="quickMenu"></SmodelQuickmenu>
		<SmodelDelete ref="smodelDelete"></SmodelDelete>
		<SmodelInOut ref="smodelInOut"></SmodelInOut>
	</view>
</template>

<script>
	import SmodelQuickmenu from '../smodel/components/smodel_quickmenu.vue'
	import SmodelSpage from './components/smodel_spage.vue'
	import SmodelDelete from './components/smodel_delete.vue'
	import SmodelJson from './components/smodel_json.vue'
	import SmodelInOut from './components/smodel_inout.vue'


	import {
		formatDate
	} from './components/date-format.js'
	import {
		smodel_log
	} from './config.js'
	import {
		getSmodelList,
		copySmodel
	} from './api/smodel_api.js'

	export default {
		data() {
			return {
				file: {},
				form: {
					page: 1,
					pageSize: 10,
					name: '',
					type: 'db'
				},
				loading: true,
				modelData: {
					total: 0,
					lists: []
				},
				typeEnums: {
					db: '数据模型',
					json: 'JSON模型'
				},
				showHelp: false,
			};
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			this.init(options);

			this.loading = false
			uni.$on('smodel_add_ok', () => this.init())
		},
		onUnload() {
			uni.$off('smodel_add_ok')
		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {},
		// 函数
		methods: {
			viewJsonList() {
				this.form.type = this.form.type == 'db' ? 'json' : 'db'
				this.init()
			},
			importBtn() {
				this.$refs.smodelInOut.showImport()
			},
			handleExport(index, row) {
				this.$refs.smodelInOut.showExport(row.name)
			},
			handleEdit(index, row) {
				uni.navigateTo({
					'url': `./edit?spage=${row.name}`
				})
			},
			handleDelete(index, row) {
				this.$refs.smodelDelete.show(row)
			},
			handleQuickMenu(index, row) {
				this.$refs.quickMenu.show(row)
			},
			handleCopy(index, row) {
				smodel_log('handleCopy', row)
				this.$prompt('请输入模型名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue: row.name,
					inputErrorMessage: '模型名称必须'
				}).then((ret) => {
					this.copySmodel(row.name, ret.value)
				}).catch(() => {
					this.$message.info('取消输入');
				});
			},
			async copySmodel(spage, npage) {
				this.loading = true
				await copySmodel(spage, npage, this)
				await this.init()
				this.loading = false
			},
			handleSmodelDeploy(index, row) {
				uni.navigateTo({
					'url': `./edit?spage=${row.name}&tab=other`
				})
			},
			// 页面数据初始化函数
			async init() {
				this.modelData = await getSmodelList(this.form.name, this.form.type)
				this.loading = false
			},
			handleFieldManage(index, row) {
				uni.navigateTo({
					'url': `../spage/list?spage=sfield&smodel_id=${row._id}`
				})
			},
			handleSmodelData(row) {
				uni.navigateTo({
					'url': `../spage/list?spage=${row.name}`
				})
			},
			copy(text) {
				uni.setClipboardData({
					data: text,
					success: function() {}
				});
			},
			// 获取当前选中的行的数据
			getCurrentRow() {

			},
			// 监听 - 行的选中高亮事件
			currentChange(val) {},
			// 当选择项发生变化时会触发该事件
			selectionChange(list) {},
			// 显示添加页面
			addBtn() {
				uni.navigateTo({
					'url': './add'
				})
			},
		},
		// 监听属性
		watch: {

		},
		// 过滤器
		filters: {
			time_format(v) {
				return formatDate(new Date(v), 'MM-dd hh:mm')
			}
		},
		// 计算属性
		computed: {

		},
		components: {
			SmodelQuickmenu,
			SmodelSpage,
			SmodelDelete,
			SmodelJson,
			SmodelInOut
		}
	};
</script>
<style lang="scss" scoped>
	@import './components/smodel.scss';

	.smodel {
		padding: 40rpx;

		.table {
			margin-top: 40rpx;
		}

		.pagination {
			margin-top: 40rpx;
		}
	}
</style>
