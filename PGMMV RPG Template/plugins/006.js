(function(){
    var obj = {};
    obj.locale = null;
    obj.internal = {};

    obj.getInfo = function(category){
        if(category == 'name'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return '表示言語を取得';
            } else if(obj.locale == 'zh_CN'){
                return '获取语言';
            } else {
                return 'Get the Display Language';
            }
        } else if(category == 'description'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return '表示言語を取得します。';
            } else if(obj.locale == 'zh_CN'){
                return '获取语言。';
            } else {
                return 'Get the Display Language.';
            }
        } else if(category == 'author'){
            return 'Keiji Agusa';
        } else if(category == 'help'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return '表示言語を取得して変数に格納します。\n※0:English, 1:Français, 2:Deutsch, 3:Español, 4:Italiano, 5:한국어, 6:中文(簡体), 7:中文(繁体), 8:Português, 9:Nederlands, 10,Русский, 11:日本語';
            } else if(obj.locale == 'zh_CN'){
                return '获取语言并将其储存为变量。\n*0:英语, 1:法语, 2:德语, 3:西班牙语, 4:意大利语, 5:韩语, 6:中文（简体）, 7:中文（繁体）, 8:葡萄牙语, 9:荷兰语, 10,俄语, 11:日语';
            } else {
                return "Get the Display Language and store it as a Variable.\n*0:English, 1:Français, 2:Deutsch, 3:Español, 4:Italiano, 5:한국어, 6:中文(簡体), 7:中文(繁体), 8:Português, 9:Nederlands, 10,Русский, 11:日本語";
            }
        } else if(category == 'parameter'){
            return [];
        } else if(category == 'internal'){
            return obj.internal;
        } else if(category == 'actionCommand'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return [
                    {id: 1, name: '表示言語を取得', description: 'このアクションを実行したタイミングでの表示言語を取得し、変数に格納します。', parameter: [
                        {id: 1, name: '変数:', type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                        {id: 101, name: '', type: 'VariableId', referenceId: 1, withNewButton: true, defaultValue: -1}
                    ]},
                ];
            } else if(obj.locale == 'zh_CN'){
                return [
                    {id: 1, name: '获取语言', description: '在执行动作时，获取语言并将其储存为变量。', parameter: [
                        {id: 1, name: '变量:', type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                        {id: 101, name: '', type: 'VariableId', referenceId: 1, withNewButton: true, defaultValue: -1}
                    ]},
                ];
            } else {
                return [
                    {id: 1, name: 'Get the Display Language', description: 'At the execution of the action, the Display Language is gotten and stored as a Variable.', parameter: [
                        {id: 1, name: 'Variable:', type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                        {id: 101, name: '', type: 'VariableId', referenceId: 1, withNewButton: true, defaultValue: -1}
                    ]},
                ];
            }
        }
        return null;
    };
    obj.initialize = function(settings){
        obj.localeList = [
            "en_US",
            "fr_FR",
            "de_DE",
            "es_ES",
            "it_IT",
            "ko_KR",
            "zh_CN",
            "zh_TW",
            "pt_BR",
            "nl_NL",
            "ru_RU",
            "ja_JP"
        ];
    };
    obj.finalize = function(){
    };

    obj.setLocale = function(_locale){
        obj.locale = _locale;
    };

    obj.setInternal = function(settings){
    };
    obj.call = function(name, param1, param2){
    };

    obj.execActionCommand = function(index, valueJson, objectId, instanceId, actionId, commandId){
        var objId = valueJson[0].value;
        var varId = valueJson[1].value;
        var variable = null;
        var instance = Agtk.objectInstances.get(instanceId);
        if(objId == Agtk.constants.switchVariableObjects.ProjectCommon){
            variable = Agtk.variables.get(varId);
        } else if(objId == Agtk.constants.switchVariableObjects.SelfObject){
            variable = instance.variables.get(varId);
        } else if(objId == Agtk.constants.switchVariableObjects.ParentObject){
            var parentInstanceId = instance.variables.get(Agtk.constants.objects.variables.ParentObjectInstanceIDId);
            var parentInstance = Agtk.objectInstances.get(parentInstanceId);
            variable = parentInstance.variables.get(varId);
        }
        if(variable !== null){
            variable.setValue(obj.localeList.indexOf(obj.locale));
        }
    };

    obj.update = function(dt){
    };

    return obj;
}())
