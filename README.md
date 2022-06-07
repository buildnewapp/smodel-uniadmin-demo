# bna-smodel

### [smodel unicloud dcloud 市场](https://ext.dcloud.net.cn/plugin?id=8356) 
### [github smodel unicloud](https://github.com/buildnewapp/smodel-unicloud)
### [smodel-uniadmin-demo unicloud](https://github.com/buildnewapp/smodel-uniadmin-demo)

Smodel-超级模型-UniAdmin低代码模型管理(支持uniadmin+vkadmin)

bna-smodel

通过界面配置管理后台增删改查功能，支持unicloud，支持26种常见类型

smodel,超级模型,低代码,模型管理
# 一 安装运行

## 1 安装插件
- 本插件是[Uni Admin](https://uniapp.dcloud.io/uniCloud/admin.html)扩展功能
- 先安装[Uni Admin](https://uniapp.dcloud.io/uniCloud/admin.html)或[VK Admin](https://ext.dcloud.net.cn/plugin?id=5043)
- [smodel unicloud dcloud 市场](https://ext.dcloud.net.cn/plugin?id=8356)实用Hbuilder X导入插件
- 或者[github smodel unicloud](https://github.com/buildnewapp/smodel-unicloud)源码安装，源码目录：doc/bna-smodel
```
pages --拷贝到项目pages目录
	smodel
	spage
uniCloud-aliyun
	cloudfunctions --拷贝到项目cloudfunctions目录
		smodel
		spage
		sfile
menu.json
package.json
pages.json --合并项目pages.json文件
```

## 2 安装依赖
进入项目，命令行安装前端npm依赖
```
npm i element-ui -s
npm i vuedraggable -s

main.js添加代码：
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

## 3 安装云对象
 - 1) uniCloud > cloudfunctions 上传所有云函数：
 
 | 数据表明 | 功能 | 是否必须 | 说明 |
 | --- | --- | --- | --- |
 | smodel | 模型表 | 必须 | 核心表，记录模型记录和配置|
 | sfield | 模型字段表 | 必须 |核心表，记录模型字段和字段配置 |
 | sfile | 文件记录表 | 否 |插件表，文件管理器，记录上传文件信息|
 | sconfig | 通用配置表 | 否 |插件表，所有插件配置记录，k-v|

 |  云对象 | 功能 | 是否必须 | 说明 |
 | --- | --- | --- | --- |
 | smodel | 超级模型 | 必须 | 核心云对象，模型CRUD等功能|
 | spage | 数据模型 | 必须 | 核心云对象，数据CRUD等功能 |
 | sfile | 文件模型 | 否 |文件管理云对象|


## 4 添加页面配置和菜单
正常情况，页面配置可以自动合并到项目pages.json，如果确实手动添加即可：
- 1) 手动添加页面到pages.json，配置项：
```
{
  "path": "pages/smodel/list",
  "style": {
    "navigationBarTitleText": "模型列表"
  }
},
{
  "path": "pages/smodel/add",
  "style": {
    "navigationBarTitleText": "模型新增"
  }
},
{
  "path": "pages/smodel/edit",
  "style": {
    "navigationBarTitleText": "模型编辑"
  }
},
{
  "path": "pages/spage/list",
  "style": {
    "navigationBarTitleText": "数据列表"
  }
},
{
  "path": "pages/spage/edit",
  "style": {
    "navigationBarTitleText": "数据修改"
  }
}
```

## 5 初始化数据
访问页面：/pages/smodel/list，如果第一次进入，点击：初始化基础数据+测试数据：
![初始化基础数据+测试数据](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_init.png)

## 6 演示地址

[演示地址](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/admin/#/pages/smodel/list)

https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/admin/

账户：admin

密码：123456

# 二 配置文档
## 1 模型使用流程
- 1) 添加数据表：添加->输入模型标识+名称
- 2) 添加表字段：操作->字段，添加功能，模型中需要有status、create_time字段，完善所有表字段
- 3) 访问页面：2种模式（参数访问模式、单页访问模式），参考部署配置项目

## 2 模型使用流程
### CRUD
快速创建数据表、数据字段，通过界面配置列表和编辑表单，支持20+种数据类型

## 3 模型表单配置
- 1) 表单模式，支持普通表单、分组表单、分步表单，分组、分步表单支持配置名称
- 2) 表单字段支持布局配置，支持拖拽排序字段先后
- 3) 字段根据类型渲染不同组件，<a href="https://element.eleme.cn/#/zh-CN/component/input" target="_blank">字段配置</a>支持json格式配置文件，支持自定义显示和字段
- 4) 表单配置<a href="https://element.eleme.cn/#/zh-CN/component/form" target="_blank">文档</a>

## 4 模型列表配置
- 1) 支持配置表格显示字段，可配置名称、宽度、对齐，支持排序（后端），支持函数（后端全局函数）
- 2) 表格配置字段会选择合适的显示方式，如枚举、图片、文件等
- 3) 表格支持搜索，可配置简单搜索+高级搜索字段
- 4) 表格功能区受属性配置影响，可配置新增、编辑、删除、批量、导入、导出功能
- 5) 表格配置<a href="https://element.eleme.cn/#/zh-CN/component/table" target="_blank">文档</a>

## 5 模型字段配置
- 1) 字段必填3要素，标识、标题、类型，支持26种常见类型，每种会自动渲染相应组件
- 2) 字段默认值：新增填充进表单，输入备注：输入placeholder，输入提示：字段tip，布局值：0~24，字段配置值：json对象<a href="https://element.eleme.cn/#/zh-CN/component/input" target="_blank">文档</a>，JSON对象：特殊组件配置项（如selectone、chooseone），JSON数组：特殊组件配置参数（如radio、select等），关联模型：字段所属模型
- 3) 其他字段按照字面意思理解
- 4) 数据类型，参考文档<a href="https://element.eleme.cn/#/zh-CN/component/input" target="_blank">文档</a>

# 三 交流
添加开发者微信：liuxx_1933，备注：smodel

# 四 插件截图

![模型列表](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_list.png)
![模型字段](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_1.png)
![模型表单](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_2.png)
![模型表格](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_3.png)
![模型属性配置](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_4.png)
![模型选择器](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_choose.png)
![模型删除](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_del.png)
![模型字段](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_fields.png)
![字段编辑](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/sfield_edit.png)
![快速菜单](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_menus.png)
![导出模型](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/smodel_out.png)
![数据列表](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/spage_list.png)
![分组示例1](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/spage_1.png)
![分组示例2](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/spage_2.png)
![分组示例3](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/spage_3.png)
![文件插件](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/screenshot/sfile.png)


