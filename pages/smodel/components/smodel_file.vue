<template>
	<view>

		<div class="u-flex u-col-center u-h-100" v-if="mode=='field'">
			<span class="u-rela hover-up u-m-r-20" v-for="(f,i) in showList">
				<el-image style="width: 50px; height: 50px;" :preview-src-list="[get_cover_image(f)]"
					:src="f.url|cover_image(f)" fit="cover">
					<div slot="error" class="image-slot" v-if="!f.fileType">
						<i class="el-icon-document"></i>
					</div>
				</el-image>
				<div class="delete u-abso u-w-full u-cursor-pointer u-flex u-row-center" @click="removePic(f)">
					<i type="primary" class="el-icon-delete u-white-color"></i>
				</div>
			</span>
			<el-button type="primary" size="mini" @click="showDialog()">
				上传{{typeName}}<i class="el-icon-upload el-icon--right"></i>
			</el-button>
		</div>

		<el-dialog :title="title" :visible.sync="dialogVisible" append-to-body width="1140px">
			<view class="u-flex u-col-top" v-loading="loading">
				<view>
					<el-menu default-active="0" class="u-w-400" @select="handleSelect">
						<el-menu-item index="0">
							<view class="u-flex u-row-between">
								<view>
									<i class="el-icon-files"></i>
									全部
								</view>
								<i class="el-icon-plus" @click.stop="addTab"></i>
							</view>
						</el-menu-item>
						<el-menu-item :index="''+ft.value" v-for="(ft,index) in fileTabs">
							<view class="u-flex u-row-between">
								<view>
									<i class="el-icon-folder"></i>
									{{ft.name}}
								</view>
								<el-dropdown>
									<i class="el-icon-more-outline"></i>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item icon="el-icon-edit">
											<span @click.stop="modifyTab(ft,index)">修改分组名</span>
										</el-dropdown-item>
										<el-dropdown-item icon="el-icon-delete">
											<span @click.stop="deleteTab(ft,index)">删除分组</span>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</view>
						</el-menu-item>
					</el-menu>
				</view>
				<view class="u-flex-col u-m-l-20 u-w-full">
					<view class="u-flex u-row-between u-m-b-30">
						<view class="">
							<el-button type="primary" size="small" :loading="uploading" @click="uploadPic">
								上传{{typeName}}
							</el-button>
							<el-button type="success" :disabled="choosed.length==0" size="small" @click="choosePics">
								使用选中{{typeName}}{{choosed.length>0?'('+choosed.length+')':''}}</el-button>
						</view>
						<view class="">
							<el-button type="danger" :disabled="choosed.length==0" size="small" @click="deletePics">
								删除{{typeName}}{{choosed.length>0?'('+choosed.length+')':''}}</el-button>
							<el-select class="u-m-l-20" v-model="moveTab" clearable :disabled="choosed.length==0"
								:placeholder="typeName+'移动至'" @change="movePics" size="small">
								<el-option v-for="item in fileTabs" :key="item.value" :label="item.name"
									:value="item.value">
								</el-option>
							</el-select>
						</view>
					</view>
					<view class="u-flex u-flex-wrap" style="gap:10px;">
						<div v-if="modelData.lists.length==0" class="u-w-full">
							<el-empty :image-size="100"></el-empty>
						</div>
						<span v-else class="u-rela" v-for="(file,i) in modelData.lists" @click="choose(file)">
							<el-card :body-style="{ padding: '0px' }" class="u-box-sizing" shadow="hover">
								<el-image lazy fit="cover" style="width: 100px; height: 100px"
									:src="file.url|cover_image(file)">
									<div slot="error" class="image-slot font60" v-if="!file.fileType">
										<i class="el-icon-document"></i>
									</div>
								</el-image>
								<div class="u-p-10 u-line-1 u-w-200 u-box-sizing u-cursor-pointer">
									{{file.name}}
								</div>
							</el-card>
							<view class="u-abso" style="top:5px;right:5px;" v-if="choosed.indexOf(file)>-1">
								<el-button type="danger" icon="el-icon-check" size="mini" circle></el-button>
							</view>
						</span>
					</view>
					<view class="u-m-t-30">
						<el-pagination background @size-change="paginationSizeChange"
							@current-change="paginationCurrentChange" @prev-click="paginationCurrentChange"
							@next-click="paginationCurrentChange" :hide-on-single-page="true"
							:current-page="currentPage" :page-sizes="[24, 240, 2400]" :page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="modelData.total">
						</el-pagination>
					</view>
				</view>
			</view>
		</el-dialog>
	</view>
</template>

<script>
	function _cover_image(file) {
		if (file.fileType == 'video')
			return `${file.url}?x-oss-process=video/snapshot,t_1000,f_jpg,w_200,h_200,m_fast`;
		else if (file.fileType == 'image') return file.url
		return ''
	}

	import {
		smodel_log
	} from '../config.js'
	import {
		getFileList,
		saveSfile,
		deleteSfile,
		updateGroup
	} from '../api/sfile_api.js'
	import {
		getSfileGroup,
		saveSfileGroup
	} from '../api/sconfig_api.js'
	export default {
		name: 'SmodelFile',
		emits: ['input'],
		props: {
			mode: {
				type: String,
				default: 'field',
			},
			value: {
				type: [Object, Array]
			},
			type: {
				type: String,
				default: 'image' //image video  all
			},
			max: {
				type: Number,
				default: 1
			},
			title: {
				type: String,
				default: '上传图片'
			}
		},
		data() {
			return {
				tab: '0',
				moveTab: '',
				dialogVisible: false,
				currentPage: 1,
				pageSize: 24,
				form: {},
				choosed: [],
				showList: [],
				modelData: {
					total: 0,
					lists: []
				},
				fileTabs: [],
				uploading: false,
				loading: true,
				inited: false
			}
		},
		watch: {
			value(n) {
				this.showList = this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : []
			}
		},
		filters: {
			json2str(val) {
				return JSON.stringify(val)
			},
			cover_image(val, file) {
				return _cover_image(file)
			}
		},
		computed: {
			typeName() {
				if (this.type == 'image') return '图片'
				else if (this.type == 'video') return '视频'
				else return '文件'
			}
		},
		mounted() {
			//this.showList = this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [],
			//console.log('showList',this.showList)
		},
		methods: {
			get_cover_image(file) {
				return _cover_image(file)
			},
			async getFiles() {
				this.loading = true
				let req = {
					'status': 1
				}
				if (this.type == 'image') req['fileType'] = 'image'
				else if (this.type == 'video') req['fileType'] = 'video'
				if (this.tab > 0) req['group'] = this.tab * 1
				this.modelData = await getFileList(req, this.currentPage, this.pageSize, this)
				this.loading = false
			},
			async initFileGroup() {
				this.fileTabs = await getSfileGroup(this)
			},
			saveFileGroup() {
				saveSfileGroup(this.fileTabs, this)
			},
			saveFile(files) {
				const processAll = []
				for (let i = 0; i < files.length; i++) {
					let f = files[i]
					let file = {
						group: this.tab * 1,
						name: f.name,
						url: f.url,
						fileType: f.fileType,
						type: f.type,
						cloudPath: f.cloudPath,
						size: f.size,
						status: 1
					}
					if (f.fileType == 'video') {
						file['duration'] = f.duration + ''
						file['height'] = f.height
						file['width'] = f.width
					}
					smodel_log('upload sfile', file)
					let upTask = saveSfile(file)
					processAll.push(upTask)
				}
				Promise.all(processAll).then((fileList) => {
					this.getFiles()
					this.$message.success('上传成功')
					this.uploading = false
				})
			},
			choosePics() {
				try {
					if (this.choosed.length > this.max) return this.$message.error('最多选择' + this.max + '条数据!')
					this.showList = this.choosed.concat()
					this.choosed = []
					if (this.max == 1) this.$emit('input', this.showList[0])
					else this.$emit('input', this.showList)
					this.$emit('choose', this.showList)
					this.dialogVisible = false
				} catch (e) {}
			},
			deletePics() {
				this.$confirm('删除' + this.choosed.length + '张图片, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					for (let f of this.choosed) {
						await deleteSfile(f._id)
						this.$message.success('删除' + f.name + '成功')
					}
					this.choosed = []
					this.$message.success('删除成功!')
					this.getFiles()
				});
			},
			uploadPic() {
				let that = this
				uniCloud.chooseAndUploadFile({
					type: this.type,
					onUploadProgress(progressEvent) {
						that.uploading = true
						var percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						smodel_log('onUploadProgress', progressEvent, percentCompleted);
					}
				}).then(res => {
					smodel_log('chooseAndUploadFile', res)
					if (res.errMsg == 'chooseAndUploadFile:ok') this.saveFile(res.tempFiles)
					else this.$message.error(res.errMsg)
				})
			},
			choose(row) {
				if (this.choosed.length >= this.max) this.choosed.splice(0, 1)
				let index = this.choosed.indexOf(row)
				if (index > -1) {
					this.choosed.splice(index, 1)
				} else {
					this.choosed.push(row)
				}
			},
			removePic(row) {
				let index = this.showList.indexOf(row)
				if (index > -1) {
					this.showList.splice(index, 1)
				}
			},
			movePics() {
				this.$confirm('移动' + this.choosed.length + '张图片, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					for (let f of this.choosed) {
						await updateGroup(f._id, this.moveTab * 1)
						this.$message.success('移动图片' + f.name + '成功')
					}
					this.choosed = []
					this.$message.success('移动成功!')
				});
			},
			handleSelect(key, keyPath) {
				this.tab = key
				this.getFiles()
			},
			addTab() {
				this.$prompt('请输入', '填写分组名', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then((ret) => {
					if (ret.value) {
						this.addTabAction(ret.value)
					}
				})
			},
			addTabAction(name) {
				let max = 0
				for (let f of this.fileTabs) {
					if (f.value > max) max = f.value
				}
				max++
				this.fileTabs.push({
					'name': name,
					value: max
				})
				this.saveFileGroup()
			},
			handleCommand(command) {
				this.$message('click on item ' + command);
			},
			modifyTab(ft, index) {
				smodel_log('modifyTab')
				this.$prompt('请输入', '修改分组名', {
					inputValue: ft.name,
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then((ret) => {
					if (ret.value) {
						this.fileTabs[index].name = ret.value
						this.saveFileGroup()
					}
				})
			},
			deleteTab(ft, index) {
				this.$confirm('此操作将删除该分组,分组文件移动至全部, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.fileTabs.splice(index, 1)
					this.saveFileGroup()
				});
			},
			paginationSizeChange(val) {
				smodel_log(`每页 ${val} 条`);
				this.pageSize = val
				this.currentPage = 1
				this.getFiles()
			},
			paginationCurrentChange(val) {
				smodel_log(`当前页: ${val}`);
				this.currentPage = val
				this.getFiles()
			},
			showDialog() {
				if (!this.inited) {
					this.initFileGroup()
					this.getFiles()
					this.inited = true
				}
				this.dialogVisible = true
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';

	.hover-up {
		width: 50px;
		height: 50px;
		overflow: hidden;
		border: 1px dashed #d7dae2;
		border-radius: 4px;
	}

	.hover-up .delete {
		height: 20px;
		background: rgba(0, 0, 0, 0.5);
		display: none;
		bottom: 0;
	}

	.hover-up:hover .delete {
		display: flex;
	}



	::v-deep {
		.image-slot {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			i {
				font-size: 30px;
				color: #409eff;
			}
		}

		.font60 i {
			font-size: 60px;
		}

		.el-pagination .btn-next,
		.el-pagination .btn-prev {
			border: none;
		}

		.el-pagination .btn-next,
		.el-pagination .btn-prev,
		.el-pagination span:not([class*=suffix]) {
			display: inline-block;
			font-size: 12px;
			min-width: 35.5px;
			height: 28px;
			line-height: 28px;
			vertical-align: top;
			box-sizing: border-box;
		}

	}
</style>
