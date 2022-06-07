<template>
  <view class="smodel">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="u-p-20">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/pages/'+smodel.name+'/list' }">{{smodel.title}}列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{ (id ? '编辑 ':'新增 ')}}{{smodel.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" :rules="formRules()" label-width="200rpx" :status-icon="true" size="small"
             :class="smodel.formType + '-form'">
      <el-steps :active="formTab*1" finish-status="success" simple style="margin-top: 20px"
                v-if="smodel.formType == 'step'">
        <el-step :title="group.name" v-for="(group,gindex) in formGroups" :key="gindex"></el-step>
      </el-steps>
      <el-tabs v-model="formTab">
        <el-tab-pane v-for="(group,gindex) in formGroups" :key="gindex"
                     :label=" smodel.formType == 'tab' ? group.name : ''" :name="gindex+''" class="u-p-50"
                     :class="smodel.formType+gindex">
          <SfieldEdit v-if="spage=='sfield'" @sfield_edit_event="sfieldEditEvent"></SfieldEdit>
          <el-row>
            <el-col v-for="(field,findex) in group.fieldDatas" :span="field.col" :key="'groupfield'+findex"
                    v-if="is_show(field)">
              <view class="" v-if="['alert'].indexOf(field.type)>-1">
                <el-form-item>
                  <el-alert v-if="field.type=='alert'" :closable="field.config.closable"
                            :title="field.config.title" :type="field.config.type"
                            :description="field.config.description">
                  </el-alert>
                </el-form-item>
              </view>
              <el-form-item :label="field.title" :prop="field.name" v-else>
                <!-- {{field.type}}-{{field.name}}-{{field.config}} -->
                <view>
                  <el-tooltip :content="field.remark" placement="top" :disabled="!field.remark">
                    <el-input v-model="form[field.name]" :readonly="is_readonly(field)"
                              :placeholder="placeholder(field)" v-if="field.type=='string'" clearable>
                    </el-input>
                    <SmodelSelectone v-else-if="field.type=='selectone'" v-model="form[field.name]"
                                     :option="{smodel:field.json.smodel,value:field.json.value,text:field.json.text}">
                    </SmodelSelectone>
                    <SmodelSpage v-else-if="field.type=='chooseone'" v-model="form[field.name]"
                                 :option="{smodel:field.json.smodel,value:field.json.value,text:field.json.text}">
                    </SmodelSpage>
                    <el-radio-group v-model="form[field.name]" v-else-if="field.type=='radio'">
                      <view>
                        <el-radio :label="item.value" v-for="(item,i) in field.jsonarray"
                                  :key="i">
                          {{item.text}}
                        </el-radio>
                      </view>
                    </el-radio-group>
                    <el-select v-model="form[field.name]" v-else-if="field.type=='select'" clearable
                               style="width:100%;">
                      <el-option v-for="(item,i) in field.jsonarray" :key="item.value"
                                 :label="item.text" :value="item.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="form[field.name]" multiple
                               v-else-if="field.type=='multiselect'" clearable style="width:100%;">
                      <el-option v-for="(item,i) in field.jsonarray" :key="item.value"
                                 :label="item.text" :value="item.value">
                      </el-option>
                    </el-select>
                    <el-checkbox-group v-model="form[field.name]"
                                       v-else-if="field.type=='checkbox'">
                      <el-checkbox v-for="(item,i) in field.jsonarray" :key="item.value"
                                   :label="item.value">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <el-input-number v-model="form[field.name]" v-else-if="field.type=='int'">
                    </el-input-number>
                    <el-rate v-model="form[field.name]" v-else-if="field.type=='rate'">
                    </el-rate>
                    <el-switch v-model="form[field.name]" v-else-if="field.type=='switch'">
                    </el-switch>
                    <view class="colorpicker" v-else-if="field.type=='colorpicker'">
                      <el-color-picker v-model="form[field.name]"></el-color-picker>
                    </view>
                    <el-time-picker v-model="form[field.name]" v-else-if="field.type=='timepicker'"
                                    value-format="HH:mm:ss">
                    </el-time-picker>
                    <el-date-picker v-model="form[field.name]" v-else-if="field.type=='datepicker'"
                                    format="yyyy-MM-dd" type="date">
                    </el-date-picker>
                    <el-date-picker v-model="form[field.name]" value-format="timestamp"
                                    v-else-if="field.type=='datetimepicker'" type="datetime">
                    </el-date-picker>
                    <el-slider v-model="form[field.name]" v-else-if="field.type=='slider'"
                               show-input>
                    </el-slider>
                    <el-slider v-model="form[field.name]" v-else-if="field.type=='sliderrange'"
                               range>
                    </el-slider>
                    <SmodelFile v-model="form[field.name]" v-else-if="field.type=='file'" type="all"
                                :max="1"></SmodelFile>
                    <SmodelFile v-model="form[field.name]" v-else-if="field.type=='files'"
                                type="all" :max="9"></SmodelFile>
                    <SmodelFile v-model="form[field.name]" v-else-if="field.type=='image'"
                                type="image" :max="1"></SmodelFile>
                    <SmodelFile v-model="form[field.name]" v-else-if="field.type=='images'"
                                type="image" :max="9"></SmodelFile>
                    <el-input v-model="form[field.name]" v-else-if="field.type=='text'"
                              type="textarea" :rows="1"></el-input>
                    <smodel-json v-model="form[field.name]" :option="field.config" title="查看JSON"
                                 v-else-if="field.type=='json'">
                    </smodel-json>
                    <smodel-json v-model="form[field.name]" :option="field.config" title="查看Array"
                                 v-else-if="field.type=='jsonarray'"></smodel-json>
                    <el-cascader v-model="form[field.name]" v-else-if="field.type=='cascader'"
                                 :options="field.jsonarray" :props="{ expandTrigger: 'hover' }">
                    </el-cascader>
                    <SmodelEditor v-model="form[field.name]" v-else-if="field.type=='editor'"
                                  :name="field.name"></SmodelEditor>
                    <pre :contenteditable="true" v-else-if="field.type=='test'"
                         style="line-height:36rpx;">{{form[field.name]}}</pre>
                    <view v-else>
                      {{field.type}}-{{field.name}}-{{field.jsonarray}}
                    </view>
                  </el-tooltip>
                </view>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>

      <el-form-item v-if="smodel.formType != 'step'">
        <el-button type="primary" @click="submitForm('form')">修改</el-button>
        <el-button v-if="showBackBtn" @click="navigateBack()">返回</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" v-show="formTab!=0" @click="formTab = (formTab*1-1)+''">上一步</el-button>
        <el-button type="primary" v-show="formTab!=formGroups.length-1" @click="formTab = (formTab*1+1)+''">下一步
        </el-button>

        <el-button type="primary" v-show="formTab==formGroups.length-1" @click="submitForm('form')">修改
        </el-button>
        <el-button v-if="showBackBtn" @click="navigateBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </view>
</template>

<script>
import {
  getSmodelInfo
} from '../smodel/api/smodel_api.js'
import {
  fetchSpageData,
  addData,
  updateData
} from '../smodel/api/spage_api.js'
import {
  smodel_log,
  navigateBack
} from '../smodel/config.js'
import {
  initFields,
  initField,
  typeJsonMap
} from '../smodel/components/sfield.js'
import {
  formatDate
} from '../smodel/components/date-format.js'
import SmodelJson from '../smodel/components/smodel_json.vue'
import SfieldEdit from '../smodel/components/sfield_edit.vue'
import SmodelSpage from '../smodel/components/smodel_spage.vue'
import SmodelFile from '../smodel/components/smodel_file.vue'
import SmodelEditor from '../smodel/components/smodel_editor.vue'
import SmodelSelectone from '../smodel/components/smodel_selectone.vue'

export default {
  name: 'SpageEdit',
  data() {
    return {
      spage: 'sfield',
      smodel: {},
      id: '',
      formTab: '0',
      form: {},
      formGroups: [],
      fieldMap: {},
      fields: [],
      array: []
    }
  },
  onLoad(option) {
    this.init(option)
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {},
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow() {

  },
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide() {

  },
  // 函数
  methods: {
    // 页面数据初始化函数
    async init(option) {
      if (option.id) this.id = option.id
      if (option.spage) this.spage = option.spage
      this.form = Object.assign({}, this.form, option)
      await this.initSmodelFields()
      this.initPageData()
    },
    async initPageData() {
      if (this.id) {
        this.form = await fetchSpageData(this.smodel.collection, this.id)
        smodel_log('initPageData', this.form)
      }
    },
    async initSmodelFields() {
      let res = await getSmodelInfo(this.spage)
      this.smodel = res.smodel
      this.fields = res.fields
      // 模型字段预处理
      for (let field of this.fields) {
        let bsonType = typeJsonMap[field.type]['bsonType']
        if (bsonType == 'array') {
          this.$set(this.form, field.name, [])
        }
        if (field.type == 'sliderrange') this.$set(this.form, field.name, [0, 1])
        if (field.defaultValue) {
          let defaultValue = isNaN(field.defaultValue) ? field.defaultValue : field.defaultValue * 1
          if (bsonType == 'array') {
            this.$set(this.form, field.name, [defaultValue])
          } else {
            this.$set(this.form, field.name, defaultValue)
          }
        }
        this.fieldMap[field.name] = field
      }
      smodel_log('this.form', this.form)
      this.formGroups = []
      for (let group of this.smodel.formGroups) {
        let fieldDatas = []
        for (let f of group.fields) {
          fieldDatas.push(this.fieldMap[f])
        }
        group['fieldDatas'] = fieldDatas
        this.formGroups.push(group)
      }
      smodel_log('formGroups', this.formGroups)
    },
    submitForm(formName) {
      smodel_log('submit!', this.spage, this.form);
      delete this.form['_id']
      delete this.form['spage']
      this.$refs[formName].validate(async (valid, obj) => {
        if (valid) {
          this.saveOrUpdate(this.id, this.form)
        } else {
          for (let k in obj) {
            return this.$message.error(obj[k][0]['message'])
          }
        }
      });
    },
    saveOrUpdate(id, data) {
      data = Object.assign({}, data)
      for (let field of this.fields) {
        if (field.type == 'datepicker') {
          if (typeof data[field.name] == 'string') {
            data[field.name] = new Date(data[field.name])
          }
        }
      }
      if (id) {
        updateData(this.spage, this.id, data).then(res => {
          smodel_log('saveOrUpdate update', res)
          this.$message.success('修改' + this.smodel.title + '成功')
        }).catch(err => {
          console.error('saveOrUpdate update', err)
          this.$message.error('修改' + this.smodel.title + '失败,' + err)
        })
      } else {
        addData(this.spage, data).then(res => {
          this.$message.success('新增' + this.smodel.title + '成功')
          if (this.showBackBtn) navigateBack(1, 1000)
		  else uni.$emit(`${this.spage}_add_ok`, {})
        }).catch(err => {
          smodel_log('saveOrUpdate add', err)
          this.$message.error('新增' + this.smodel.title + '失败,' + err)
        })
      }
    },
    tabClick(tab, event) {
      smodel_log('tabClick', tab, event);
    },
    is_readonly(field) {
      if (field.is_readonly == 1) return false
      else if (field.is_readonly == 2) return this.id ? false : true
      else if (field.is_readonly == 3) return this.id ? true : false
      else return true
    },
    is_show(field) {
      if (field.is_show == 1) return true
      else if (field.is_show == 2) return this.id ? false : true
      else if (field.is_show == 3) return this.id ? true : false
      else return false
    },
    placeholder(field) {
      if (field.placeholder) return field.placeholder
      else return `请输入${field.title}`
    },
    is_must(field) {
      if (field.is_must == 1) return false
      else if (field.is_must == 2) return this.id ? false : true
      else if (field.is_must == 3) return this.id ? true : false
      else return true
    },
    formRules() {
      //console.log('this.formGroups', this.formGroups)
      let rules = {}
      for (let group of this.formGroups) {
        for (let field of group['fieldDatas']) {
          if (this.is_must(field)) rules[field.name] = [{
            required: true,
            trigger: 'blur',
            message: field.title + '必须'
          }]
        }
      }
      return rules
    },
    sfieldEditEvent(event) {
      this.form = Object.assign({}, this.form, event)
    },
    navigateBack
  },
  // 过滤器
  filters: {
    json2str(val) {
      return JSON.stringify(val)
    },
    time_format_ymd(v) {
      return formatDate(new Date(v), 'yyyy-MM-dd')
    }
  },
  // 计算属性
  computed: {
    showBackBtn(){
      if (this.id) return this.smodel.editBtn == 1
      else return this.smodel.addBtn == 1
    }
  },
  components: {
    SmodelJson,
    SfieldEdit,
    SmodelFile,
    SmodelEditor,
    SmodelSpage,
    SmodelSelectone
  }
}
</script>
<style lang="scss" scoped>
@import '../smodel/components/smodel.scss';

.smodel {
  padding: 40rpx;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  ::v-deep {
    .el-form-item__label {
      font-size: 24rpx;
    }

    .el-input {}

    .el-form-item__content {
      margin-right: 100rpx;
      // height: 32px;
    }

    .el-radio {
      margin-bottom: 8px;
    }

    .el-input__inner {
      vertical-align: top
    }

    .el-rate {
      margin-top: 6px;
    }

    .el-checkbox-group {
      line-height: 32px;
    }

    .colorpicker {
      height: 32px;
    }

    .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
		line-height: 33px;
	}

    .base-form {
      .el-tabs__header {
        display: none;
      }
    }

    .step-form {
      .el-tabs__header {
        display: none;
      }
    }

    .mainsub-form {
      .el-tabs__header {
        display: none;
      }

      .mainsub0,.mainsub1 {
        margin: 10px;
        border: 1px solid #f1f3f4;
        display: inline-block !important;
      }

      .mainsub0 {
        width: 65%;
      }

      .mainsub1 {
        width: 35%;
      }

      .el-form-item__content {
        margin-right: 0;
      }

      .el-tabs__content {
        display: flex;
      }

      .el-input {
        width: 100%;
      }
    }
  }

}
</style>
