<template>
	<view>
		<el-drawer :title="title" :size="960" :visible.sync="editDrawer" direction="rtl">
			<SpageEdit ref="spageEdit"></SpageEdit>
		</el-drawer>
		<el-dialog :title="title" :visible.sync="editDialog" width="960px">
			<SpageEdit ref="spageEdit"></SpageEdit>
		</el-dialog>
	</view>
</template>

<script>
	import {
		build_http_url
	} from './sfield.js'
	import SpageEdit from '../../spage/edit.vue'

	export default {
		name: 'SpageEditBtn',
		props: {},
		data() {
			return {
				title: '',
				editDialog: false,
				editDrawer: false
			}
		},
		components: {
			SpageEdit
		},
		computed: {},
		methods: {
			show(type, id, spage, form) {
				// if (this.smodel) {
				// 	if (this._id) this.title = '编辑' + this.smodel.title + '数据'
				// 	else this.title = '新增' + this.smodel.title + '数据'
				// }
				form = Object.assign({}, {
					id: id,
					spage: spage
				}, form)
				if (type == 1) {
					uni.navigateTo({
						'url': build_http_url('./edit', form)
					})
				} else if (type == 2) {
					this.editDialog = true
					this.$nextTick(() => {
						this.$refs.spageEdit.init(form)
					})
				} else if (type == 3) {
					this.editDrawer = true
					this.$nextTick(() => {
						this.$refs.spageEdit.init(form)
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import 'smodel.scss';
</style>
