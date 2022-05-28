<template>
	<div>
		<div :id="'editor'+name">
		</div>
		<SmodelFile ref="file" mode="api" @choose="chooseFile" v-model="pics" type="image" :max="9"></SmodelFile>
	</div>
</template>

<script>
	import SmodelFile from './smodel_file.vue'
	//http://tinymce.ax-z.cn/integrations/integrate-index.php
	import E from './wangEditor.min.js' //https://www.wangeditor.com/v4/

	let editor;
	export default {
		name: 'SmodelEditor',
		emits: ['input'],
		props: {
			value: {
				type: [String]
			},
			name: {
				type: String
			}
		},
		watch: {
			value(n) {
				//console.log('watch', n)
				var h = editor.txt.html()
				if (h != n) editor.txt.html(n)
			}
		},
		data() {
			return {
				pics: []
			}
		},
		beforeDestroy() {
			editor.destroy()
			editor = null
		},
		mounted() {
			let that = this
			const menuKey = 'alertMenuKey'
			E.registerMenu(menuKey, AlertMenu)

			editor = new E("#editor" + this.name)
			editor.config.customAlert = function(s, t) {
				this.$message({
					message: s,
					type: t
				})
			}
			editor.config.uploadImgFromMedia = function() {
				that.$refs.file.showDialog()
			}
			editor.config.onchange = function(newHtml) {
				//console.log('editor', newHtml)
				that.$emit('input', newHtml)
			};
			editor.config.onchangeTimeout = 1000;
			editor.config.zIndex = 2
			editor.create()
			editor.txt.html(this.value)
		},
		computed: {},
		methods: {
			chooseFile(files) {
				console.log('chooseFile', files)
				let html = ''
				for (let file of files) {
					if (file.fileType == 'image') html +=
						`<img src="${file.url}" alt="${file.name}" style="max-width:100%;"/>`
				}
				editor.cmd.do('insertHTML', html)
			},
			close() {
				try {} catch (e) {}
			}
		},
		components: {
			SmodelFile
		},
	}
	const {
		$,
		BtnMenu,
		DropListMenu,
		PanelMenu,
		DropList,
		Panel,
		Tooltip
	} = E
	class AlertMenu extends BtnMenu {
		constructor(editor) {
			const $elem = E.$(
				`<div class="w-e-menu" data-title="查看源码">
	               <i class="el-icon-view"></i>
	           </div>`
			)
			super($elem, editor)
		}
		clickHandler() {

		}
		// 菜单是否被激活（如果不需要，这个函数可以空着）
		// 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
		// 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
		tryChangeActive() {
			// 激活菜单
			// 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
			// 2. this.this.isActive === true
			//this.active()

			// // 取消激活菜单
			// // 1. 菜单 DOM 节点会删掉 .w-e-active
			// // 2. this.this.isActive === false
			// this.unActive()
		}
	}
</script>
<style lang="scss" scoped>
	@import 'smodel.scss';

	::v-deep {}
</style>
