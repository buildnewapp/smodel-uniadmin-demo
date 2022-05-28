# bna-smodel

# 一 安装运行

## 1 安装依赖
进入项目，命令行安装前端npm依赖
```
npm i element-ui -s
npm i vuedraggable -s

main.js添加代码：
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

## 2 安装数据库+云函数
 - 1) uniCloud > database 右键：上传所有 DB Schema（主要表：smodel、sfield、sfile、sconfig、deme、test）
 - 2) uniCloud > database > smodel_db_init.json 初始化云数据库
 - 3) uniCloud > cloudfunctions 上传Smodel云函数
 
 | 表明 | 功能 | 是否必须 | 说明 |
 | --- | --- | --- | --- |
 | smodel | 模型表 | 必须 | 核心表，记录模型记录和配置|
 | sfield | 模型字段表 | 必须 |核心表，记录模型字段和字段配置 |
 | sfile | 文件记录表 | 否 |插件表，文件管理器，记录上传文件信息|
 | sconfig | 通用配置表 | 否 |插件表，所有插件配置记录，k-v|



## 3 添加页面配置和菜单
正常情况，页面配置可以自动合并到项目；菜单需要手动添加；
- 1) 添加页面到pages.json，配置项：
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
- 2) 手动添加菜单，系统配置>菜单管理>新增一级菜单 ：
```
	{
		"menu_id": "smodel",
		"name": "超级模型",
		"icon": "uni-icons-list",
		"url": "/pages/smodel/list",
		"sort": 100,
		"permission": []
	}
```

## 4 运行项目
插件安装成功会添加 模型管理 顶级菜单

## 5 演示地址

[演示地址](https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/admin/#/pages/smodel/list)

https://static-c06967d5-acd2-4fa0-b35f-29ec612ce5cc.bspapp.com/admin/

账户：admin

密码：123456

# 二 配置文档
## 1 模型使用流程
- 1) 添加数据表：添加->输入模型标识+名称
- 2) 添加表字段：操作->字段，添加功能，模型中需要有status、create_time字段，完善所有表字段
- 3) 创建表结构：数据->部署，下载数据库文件 xxx.schema.json，拷贝到uniCloud/database目录，上传DB Schema
- 4) 访问页面：2种模式（参数访问模式、单页访问模式），参考部署配置项目

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


