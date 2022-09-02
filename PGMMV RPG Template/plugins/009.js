(function(){
    var obj = {};
    var pluginParams = {
        axisThreshold: 20,
        runtimeLog: 1
    };
    var locale = {};
    var locale_common = {
        operatorType: [
            {id: 1, name: "＝"},
            {id: 2, name: "＜"},
            {id: 3, name: "≦"},
            {id: 4, name: "＞"},
            {id: 5, name: "≧"},
            {id: 6, name: "≠"}
        ]
    };
    var utils = {
        _getStickVH: function(cId, type){
            var v = 0;
            var h = 0;
            if(type == 1){ // left
                v -= Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyLeftStickUp);
                v += Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyLeftStickDown);
                h -= Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyLeftStickLeft);
                h += Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyLeftStickRight);
            }else if(type == 2){ // right
                v -= Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyRightStickUp);
                v += Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyRightStickDown);
                h -= Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyRightStickLeft);
                h += Agtk.controllers.getOperationKeyValue(cId, Agtk.constants.controllers.OperationKeyRightStickRight);
            }
            return [v, h];
        },
        calcAngleDegrees: function(x, y) {
            return Math.atan2(y, x) * 180 / Math.PI + 90;
        },
        getAngleDegrees: function(ctrlId, stickType){
            var deg = 0;
            
            var vh = this._getStickVH(ctrlId, stickType);
            var v = vh[0];
            var h = vh[1];
            if(Math.abs(vh[0]) < pluginParams.axisThreshold && Math.abs(vh[1]) < pluginParams.axisThreshold){
                return -1;
            }
            if(v == 0 && h == 0){
                return -1;
            }else{
                deg = this.calcAngleDegrees(h, v);
            }
            if (deg < 0) {
                deg += 360;
            }
            return deg;
        },
        getTiltPower: function(ctrlId, stickType){
            var vh = this._getStickVH(ctrlId, stickType);
            var v = Math.abs(vh[0]) < pluginParams.axisThreshold ? 0 : vh[0];
            var h = Math.abs(vh[1]) < pluginParams.axisThreshold ? 0 : vh[1];
            var p = Math.sqrt(Math.pow(h, 2) + Math.pow(v, 2));
            if(p > 1){p = 1;}
            return p;
        }
    }
    
    obj.getInfo = function(category){
        if(category == 'name'){
            return locale.plugin.name;
        } else if(category == 'description'){
            return locale.plugin.desc;
        } else if(category == 'author'){
            return "KADOKAWA / Joe";
        } else if(category == 'help'){
            return locale.plugin.help;
        } else if(category == 'parameter'){
            return [
                {id: 1, name: locale.parameter[0].name, type: "Number", defaultValue: 20, minimumValue: 0, maximumValue: 100},
                {id: 2, name: locale.parameter[1].name, type: "CustomId", customParam: [
                    {id: 0, name: locale.parameter[1].disabled},
                    {id: 1, name: locale.parameter[1].enabled}
                ], defaultValue: 1}
            ];
        } else if(category == 'internal'){
            return null;
        } else if(category == 'actionCommand'){
            return [
                //{id: 0, name: 'debug', description: '', parameter: []},
                // getTilt
                {id: 1, name: locale.actionCommand[1].name, description: locale.actionCommand[1].desc, parameter: [
                    {id: 1, name: locale.common.selectStick, type: 'CustomId', customParam: locale.customParams.selectStick, defaultValue: -1},
                    {id: 0, name: locale.common.selectController, type: 'Embedded'},
                    {id: 2, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 21, name: locale.common.selectVariable, type: 'VariableId', referenceId: 2, defaultValue: -1},
                    {id: 0, name: locale.common.destination, type: 'Embedded'},
                    {id: 3, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 31, name: locale.common.selectVariable, type: 'VariableId', referenceId: 3, defaultValue: -1}
                ]}, // getAngle
                {id: 2, name: locale.actionCommand[2].name, description: locale.actionCommand[2].desc, parameter: [
                    {id: 1, name: locale.common.selectStick, type: 'CustomId', customParam: locale.customParams.selectStickLeftOrRight, defaultValue: -1},
                    {id: 0, name: locale.common.selectController, type: 'Embedded'},
                    {id: 2, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 21, name: locale.common.selectVariable, type: 'VariableId', referenceId: 2, defaultValue: -1},
                    {id: 0, name: locale.common.destination, type: 'Embedded'},
                    {id: 3, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 31, name: locale.common.selectVariable, type: 'VariableId', referenceId: 3, defaultValue: -1}
                ]}, // moveAngle
                {id: 3, name: locale.actionCommand[3].name, description: locale.actionCommand[3].desc, parameter: [
                    {id: 1, name: locale.common.selectStick, type: 'CustomId', customParam: locale.customParams.selectStickLeftOrRight, defaultValue: -1},
                    {id: 0, name: locale.common.selectController, type: 'Embedded'},
                    {id: 2, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 21, name: locale.common.selectVariable, type: 'VariableId', referenceId: 2, defaultValue: -1},
                    {id: 0, name: locale.actionCommand[3].moveSettings, type: 'Embedded'},
                    {id: 3, name: locale.actionCommand[3].animeDirection, type: 'CustomId', customParam: locale.customParams.selectAnimeDirection, defaultValue: -2}
                ]}, // moveAngleByVariable
                {id: 4, name: locale.actionCommand[4].name, description: locale.actionCommand[4].desc, parameter: [
                    {id: 1, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 11, name: locale.common.selectVariable, type: 'VariableId', referenceId: 1, defaultValue: -1},
                    {id: 2, name: locale.actionCommand[3].animeDirection, type: 'CustomId', customParam: locale.customParams.selectAnimeDirection, defaultValue: -2}
                ]}
            ]
        } else if(category == 'linkCondition'){
            return [
                {id: 1, name: locale.linkCondition[1].name, description: locale.linkCondition[1].desc, parameter: [
                    {id: 1, name: locale.common.selectStick, type: 'CustomId', customParam: locale.customParams.selectStick, defaultValue: -1},
                    {id: 0, name: locale.common.selectController, type: 'Embedded'},
                    {id: 2, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 21, name: locale.common.selectVariable, type: 'VariableId', referenceId: 2, defaultValue: -1},
                    {id: 0, name: locale.linkCondition[1].target, type: 'Embedded'},
                    {id: 3, name: locale.linkCondition[1].operatorType, type: 'CustomId', customParam: locale_common.operatorType, defaultValue: 1},
                    {id: 0, name: locale.linkCondition[1].selectTarget, type: 'Embedded'},
                    {id: 4, name: locale.common.enterNumber, type: 'Number', defaultValue: 0, decimals: 2, minimumValue: -1},
                    {id: 5, name: locale.common.selectObjectWithPriority, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 15, name: locale.common.selectVariable, type: 'VariableId', referenceId: 5, defaultValue: -1}
                ]},
                {id: 2, name: locale.linkCondition[2].name, description: locale.linkCondition[2].desc, parameter: [
                    {id: 1, name: locale.common.selectStick, type: 'CustomId', customParam: locale.customParams.selectStickLeftOrRight, defaultValue: -1},
                    {id: 0, name: locale.common.selectController, type: 'Embedded'},
                    {id: 2, name: locale.common.selectObject, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 21, name: locale.common.selectVariable, type: 'VariableId', referenceId: 2, defaultValue: -1},
                    {id: 0, name: locale.linkCondition[1].target, type: 'Embedded'},
                    {id: 3, name: locale.linkCondition[1].operatorType, type: 'CustomId', customParam: locale_common.operatorType, defaultValue: 1},
                    {id: 0, name: locale.linkCondition[1].selectTarget, type: 'Embedded'},
                    {id: 4, name: locale.common.enterNumber, type: 'Number', defaultValue: 0, decimals: 2, minimumValue: -1},
                    {id: 5, name: locale.common.selectObjectWithPriority, type: 'SwitchVariableObjectId', option: ['SelfObject'], defaultValue: -1},
                    {id: 15, name: locale.common.selectVariable, type: 'VariableId', referenceId: 5, defaultValue: -1}
                ]}
            ];
        }
        return null;
    };
    obj.initialize = function(settings){
    };
    obj.finalize = function(){
    };
    obj.setLocale = function(_locale){
        if(_locale.substr(0, 2) == 'ja'){
            locale = { // JA
                plugin: {
                    name: "アナログスティックの傾き",
                    desc: "アナログスティックの傾きに関連するコマンドを追加します。",
                    help: "アナログスティックの傾きを取得して変数に格納する実行アクションと、\n直接数値や変数と比較するリンク条件を追加します。\n\n※コントローラIDについて: プリセット共通変数のコントローラIDは、コントローラ入力があった後に自動的に割り当てられます。"
                },
                parameter: [
                    { // axis threshold
                        name: "傾きの認識しきい値"
                    },
                    { // runtime log
                        name: "実行ログ表示",
                        enabled: "有効",
                        disabled: "無効"
                    }
                ],
                actionCommand: [
                    {}, // 0: debug
                    {   // 1: getTilt
                        name: "[アナログスティック]スティックの傾きを取得",
                        desc: "アナログスティックの傾きを指定した変数に取得します。\n傾きの範囲: 0 - 100\n※しきい値未満の傾きは0を返します。"
                    },
                    {   // 2: getAngle
                        name: "[アナログスティック]スティックの方位角を取得",
                        desc: "アナログスティックの方位角(方向)を指定した変数に取得します。\n角度の範囲: 0.00 - 359.99\n入力がない場合は-1。"
                    },
                    {   // 3: moveAngle
                        name: "[アナログスティック]表示方向を指定してスティック方向へ移動",
                        desc: "このオブジェクトがアナログスティックの入力方向に移動します。",
                        animeDirection: "表示方向:",
                        moveSettings: "[移動設定]"
                    },
                    {   // 4: moveAngleByVariable
                        name: "[アナログスティック]表示方向を指定して方位角へ移動",
                        desc: "このオブジェクトが指定した変数値の方位角に移動します。\n角度の範囲: 0.00 - 359.99"
                    }
                ],
                linkCondition: [
                    {}, // 0: debug
                    {   // 1: tilt
                        name: "[アナログスティック]スティックの傾き",
                        desc: "アナログスティックの傾きを指定の数値と比較します。\n傾きの範囲: 0 - 100\n※しきい値未満の傾きは0を返します。",
                        operatorType: "演算方法:",
                        target: "[比較する対象を指定]"
                    },
                    {   // 2: angle
                        name: "[アナログスティック]スティックの方位角",
                        desc: "アナログスティックの方位角(方向)を指定の数値と比較します。\n角度の範囲: 0.00 - 359.99\n入力がない場合は-1。"
                    }
                ],
                common: {
                    selectObject: "オブジェクトを選択:",
                    selectObjectWithPriority: "オブジェクトを選択(優先):",
                    selectVariable: "変数を選択:",
                    selectController: "[コントローラIDを指定]",
                    selectStick: "スティックを選択:",
                    selectCondition: "[条件を指定]",
                    enterNumber: "数値を入力:",
                    destination: "[格納先の変数を指定]"
                },
                customParams: {
                    selectStick: [
                        {id: -1, name: "設定なし"},
                        {id: 1, name: "左スティック"},
                        {id: 2, name: "右スティック"},
                        {id: 13, name: "左スティック(↑)"}, // Agtk.constants.controllers
                        {id: 14, name: "左スティック(↓)"},
                        {id: 15, name: "左スティック(←)"},
                        {id: 16, name: "左スティック(→)"},
                        {id: 17, name: "右スティック(↑)"},
                        {id: 18, name: "右スティック(↓)"},
                        {id: 19, name: "右スティック(←)"},
                        {id: 20, name: "右スティック(→)"}
                    ],
                    selectStickLeftOrRight: [
                        {id: -1, name: "設定なし"},
                        {id: 1, name: "左スティック"},
                        {id: 2, name: "右スティック"}
                    ],
                    selectAnimeDirection: [
                        {id: -2, name: "移動方向に合わせる"},
                        {id: 1, name: "↓"},
                        {id: 5, name: "↑"},
                        {id: 2, name: "←"},
                        {id: 3, name: "→"}
                    ]
                },
                error: {
                    invalidCtrlVar: "[アナログスティック]コントローラIDの取得に失敗しました。",
                    invalidStickId: "[アナログスティック]取得するスティックが指定されていません。",
                    invalidCtrlId: "[アナログスティック]無効なコントローラIDです。",
                    invalidVariable: "[アナログスティック]変数の取得に失敗しました。",
                    invalidStick: "[アナログスティック]スティック情報の取得に失敗しました。"
                }
            };
        }else if(_locale.substr(0, 2) == 'zh'){
            locale = { // CN
                plugin: {
                    name: "模拟摇杆倾斜度",
                    desc: "增加与倾斜模拟摇杆有关的命令。",
                    help: "添加一个动作命令，获得模拟摇杆的倾斜度并将其存储在一个变量中，并添加一个链接条件，直接与一个数字或变量进行比较。\n\n*控制器ID：预设公共变量控制器ID在控制器的任何按钮被按下后会自动分配。"
                },
                parameter: [
                    { // axis threshold
                        name: "倾斜度识别阈值"
                    },
                    { // runtime log
                        name: "调试功能有效化",
                        enabled: "启用",
                        disabled: "禁用"
                    }
                ],
                actionCommand: [
                    {}, // 0: debug
                    {   // 1: getTilt
                        name: "[模拟摇杆]获得模拟摇杆倾斜度",
                        desc: "获取并存储模拟摇杆的倾斜度到变量中。\n倾斜度取值范围: 0 - 100\n *倾斜度小于轴阈值返回0。"
                    },
                    {   // 2: getAngle
                        name: "[模拟摇杆]获得模拟摇杆的方位角",
                        desc: "获取并存储模拟摇杆的方位角度到变量中。\n角度取值范围: 0.00 - 359.99\n若无输入则取值-1。"
                    },
                    {   // 3: moveAngle
                        name: "[模拟摇杆]设置移动方向到摇杆方位角的方向上",
                        desc: "将此物体移动到模拟摇杆方位角度所指的方向上。",
                        animeDirection: "移动方向:",
                        moveSettings: "[移动设置]"
                    },
                    {   // 4: moveAngleByVariable
                        name: "[模拟摇杆]设置移动方向到变量所指的方向上",
                        desc: "将此物体移动到变量值所指的方向上。\n角度取值范围: 0.00 - 359.99"
                    }
                ],
                linkCondition: [
                    {}, // 0: debug
                    {   // 1: tilt
                        name: "[模拟摇杆]模拟摇杆倾斜度",
                        desc: "将模拟摇杆的倾斜度与指定的数字或变量进行比较。\n倾斜度取值范围: 0 - 100\n*倾斜度小于轴阈值返回0。",
                        operatorType: "运算符类型：",
                        target: "[指定要比较的目标]"
                    },
                    {   // 2: angle
                        name: "[模拟摇杆]模拟摇杆的方位角",
                        desc: "将摇杆的方位角与指定的数字或变量进行比较。\n角度取值范围: 0.00 - 359.99\n若无输入则取值-1。"
                    }
                ],
                common: {
                    selectObject: "对象：",
                    selectObjectWithPriority: "对象(更高优先级)：",
                    selectVariable: "变量：",
                    selectController: "[指定控制器ID]",
                    selectStick: "摇杆：",
                    selectCondition: "[指定条件]",
                    enterNumber: "序号：",
                    destination: "[指定目标变量]"
                },
                customParams: {
                    selectStick: [
                        {id: -1, name: "未设置"},
                        {id: 1, name: "左摇杆"},
                        {id: 2, name: "右摇杆"},
                        {id: 13, name: "左摇杆(↑)"}, // Agtk.constants.controllers
                        {id: 14, name: "左摇杆(↓)"},
                        {id: 15, name: "左摇杆(←)"},
                        {id: 16, name: "左摇杆(→)"},
                        {id: 17, name: "右摇杆(↑)"},
                        {id: 18, name: "右摇杆(↓)"},
                        {id: 19, name: "右摇杆(←)"},
                        {id: 20, name: "右摇杆k(→)"}
                    ],
                    selectStickLeftOrRight: [
                        {id: -1, name: "未设置"},
                        {id: 1, name: "左摇杆"},
                        {id: 2, name: "右摇杆"}
                    ],
                    selectAnimeDirection: [
                        {id: -2, name: "匹配移动方向"},
                        {id: 1, name: "↓"},
                        {id: 5, name: "↑"},
                        {id: 2, name: "←"},
                        {id: 3, name: "→"}
                    ]
                },
                error: {
                    invalidCtrlVar: "[模拟摇杆]控制器ID的变量无效。",
                    invalidStickId: "[模拟摇杆]摇杆ID无效。",
                    invalidCtrlId: "[模拟摇杆]控制器ID无效。",
                    invalidVariable: "[模拟摇杆]获取变量失败。",
                    invalidStick: "[模拟摇杆]获取摇杆失败。"
                }
            };
        }else{
            locale = { // EN
                plugin: {
                    name: "Analog Stick Tilt",
                    desc: "Add commands related to tilting the analog stick.",
                    help: "Add an action command that gets the tilt of the analog stick and stores it in a variable, and a link condition that compare directly with a number or a variable.\n\n*Controller ID: The controller ID of the preset common variable is automatically assigned after any button of the controller is pressed."
                },
                parameter: [
                    { // axis threshold
                        name: "Axis Threshold"
                    },
                    { // runtime log
                        name: "Show Runtime Log",
                        enabled: "Enabled",
                        disabled: "Disabled"
                    }
                ],
                actionCommand: [
                    {}, // 0: debug
                    {   // 1: getTilt
                        name: "[Analog Stick]Get Analog Stick Tilt",
                        desc: "Get and store the analog stick tilt to the variable.\nTilt Range: 0 - 100\n※The tilt less than axis threshold returns 0."
                    },
                    {   // 2: getAngle
                        name: "[Analog Stick]Get Analog Stick Azimuth",
                        desc: "Get and store the analog stick azimuth(angle) to the variable.\nAngle Range: 0.00 - 359.99\n-1 if there is no input."
                    },
                    {   // 3: moveAngle
                        name: "[Analog Stick]Set Move Direction And Move To The Direction Of The Stick Angle",
                        desc: "Move this object to the input direction of the analog stick angle.",
                        animeDirection: "Motion Direction:",
                        moveSettings: "[Move Settings]"
                    },
                    {   // 4: moveAngleByVariable
                        name: "[Analog Stick]Set Move Direction And Move To The Angle Of The Variable Value",
                        desc: "Move this object to the angle of the variable value.\nAngle Range: 0.00 - 359.99"
                    }
                ],
                linkCondition: [
                    {}, // 0: debug
                    {   // 1: tilt
                        name: "[Analog Stick]Analog Stick Tilt",
                        desc: "Compare the analog stick tilt with the specified number or the variable.\nTilt Range: 0 - 100\n※The tilt less than axis threshold returns 0.",
                        operatorType: "Operator Type:",
                        target: "[Specify The Target To Be Compared]"
                    },
                    {   // 2: angle
                        name: "[Analog Stick]Analog Stick Azimuth",
                        desc: "Compare the analog stick azimuth(angle) with the specified number or the variable.\nAngle Range: 0.00 - 359.99\n-1 if there is no input."
                    }
                ],
                common: {
                    selectObject: "Object:",
                    selectObjectWithPriority: "Object(Higher Priority):",
                    selectVariable: "Variable:",
                    selectController: "[Specify The Controller ID]",
                    selectStick: "Stick:",
                    selectCondition: "[Specify The Condition]",
                    enterNumber: "Number:",
                    destination: "[Specify The Destination]"
                },
                customParams: {
                    selectStick: [
                        {id: -1, name: "Not Set"},
                        {id: 1, name: "Left Stick"},
                        {id: 2, name: "Right Stick"},
                        {id: 13, name: "Left Stick(↑)"}, // Agtk.constants.controllers
                        {id: 14, name: "Left Stick(↓)"},
                        {id: 15, name: "Left Stick(←)"},
                        {id: 16, name: "Left Stick(→)"},
                        {id: 17, name: "Right Stick(↑)"},
                        {id: 18, name: "Right Stick(↓)"},
                        {id: 19, name: "Right Stick(←)"},
                        {id: 20, name: "Right Stick(→)"}
                    ],
                    selectStickLeftOrRight: [
                        {id: -1, name: "Not Set"},
                        {id: 1, name: "Left Stick"},
                        {id: 2, name: "Right Stick"}
                    ],
                    selectAnimeDirection: [
                        {id: -2, name: "Match Move Direction"},
                        {id: 1, name: "↓"},
                        {id: 5, name: "↑"},
                        {id: 2, name: "←"},
                        {id: 3, name: "→"}
                    ]
                },
                error: {
                    invalidCtrlVar: "[Analog Stick]Invalid variable of the controller ID.",
                    invalidStickId: "[Analog Stick]Invalid stick type.",
                    invalidCtrlId: "[Analog Stick]Invalid controller ID.",
                    invalidVariable: "[Analog Stick]Failed to get the variable.",
                    invalidStick: "[Analog Stick]Failed to get the stick."
                }
            };
        }
    };
    obj.setParamValue = function(param){
        pluginParams.axisThreshold = obj.getValueJson(param, 1) * 0.01;
        pluginParams.runtimeLog = obj.getValueJson(param, 2);
    };
    obj.setInternal = function(settings){
    };
    obj.call = function(name, param1, param2){
    };
    obj.update = function(dt){
    };
    obj.execActionCommand = function(index, valueJson, objectId, instanceId, actionId, commandId){
        var paramId = obj.getInfo("actionCommand")[index].id;
        valueJson = obj.completeValueJson(index, valueJson, "actionCommand");
        switch(paramId){
            case 0: // debug
                break;
            case 1: // getTilt
                var params = {
                    stickId:    obj.getValueJson(valueJson, 1),
                    ctrlObjId:  obj.getValueJson(valueJson, 2),
                    ctrlVarId:  obj.getValueJson(valueJson, 21),
                    destObjId:  obj.getValueJson(valueJson, 3),
                    destVarId:  obj.getValueJson(valueJson, 31)
                };

                var ctrlVar = obj.getVariable(params.ctrlObjId, params.ctrlVarId, instanceId);
                if(!ctrlVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlVar);
                    break;
                }

                if(params.stickId == -1){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidStickId);
                    break;
                }
                
                var destVar = obj.getVariable(params.destObjId, params.destVarId, instanceId);
                if(!destVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidVariable);
                    break;
                }

                var ctrlId = ctrlVar.getValue()|0;
                if(ctrlId <= 0){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlId);
                    break;
                }

                var tilt;
                if (params.stickId > 2) {
                    tilt = Agtk.controllers.getOperationKeyValue(ctrlId, params.stickId);
                }else{
                    tilt = utils.getTiltPower(ctrlId, params.stickId);
                }
                if(tilt == null){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidStick);
                    break;
                }else{
                    tilt = Math.floor(tilt * 100);
                    destVar.setValue(tilt);
                }

                break;
            case 2: // getAngle
                var params = {
                    stickType:  obj.getValueJson(valueJson, 1), // 1: left / 2: right
                    ctrlObjId:  obj.getValueJson(valueJson, 2),
                    ctrlVarId:  obj.getValueJson(valueJson, 21),
                    destObjId:  obj.getValueJson(valueJson, 3),
                    destVarId:  obj.getValueJson(valueJson, 31)
                };

                var ctrlVar = obj.getVariable(params.ctrlObjId, params.ctrlVarId, instanceId);
                if(!ctrlVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlVar);
                    break;
                }

                if(params.stickType == -1){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidStickId);
                    break;
                }
                
                var destVar = obj.getVariable(params.destObjId, params.destVarId, instanceId);
                if(!destVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidVariable);
                    break;
                }

                var ctrlId = ctrlVar.getValue()|0;
                if(ctrlId <= 0){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlId);
                    break;
                }

                var deg = utils.getAngleDegrees(ctrlId, params.stickType);

                destVar.setValue(deg);

                break;
            case 3: // moveAngle
                var params = {
                    stickType:  obj.getValueJson(valueJson, 1), // 1: left / 2: right
                    ctrlObjId:  obj.getValueJson(valueJson, 2),
                    ctrlVarId:  obj.getValueJson(valueJson, 21),
                    animeDirId:  obj.getValueJson(valueJson, 3)
                };

                var ctrlVar = obj.getVariable(params.ctrlObjId, params.ctrlVarId, instanceId);
                if(!ctrlVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlVar);
                    break;
                }

                if(params.stickType == -1){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidStickId);
                    break;
                }

                var ctrlId = ctrlVar.getValue()|0;
                if(ctrlId <= 0){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlId);
                    break;
                }

                var deg = utils.getAngleDegrees(ctrlId, params.stickType);
                if(deg == -1){break;}

                var thisInstance = Agtk.objectInstances.get(instanceId);
                var args = {
                    direction: deg,
                    directionId: params.animeDirId,
                    moveDistance: 0,
                    moveDistanceEnabled: false
                };
                thisInstance.execCommandDirectionMove(args);

                break;
            case 4: // moveAngleByVariable
                var params = {
                    angleObjId:  obj.getValueJson(valueJson, 1),
                    angleVarId:  obj.getValueJson(valueJson, 11),
                    animeDirId:  obj.getValueJson(valueJson, 2)
                };

                var angleVar = obj.getVariable(params.angleObjId, params.angleVarId, instanceId);
                if(!angleVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidVariable);
                    break;
                }

                var deg = angleVar.getValue();
                if(deg >= 0){
                    deg %= 360;
                }else{
                    break;
                }

                var thisInstance = Agtk.objectInstances.get(instanceId);
                var args = {
                    direction: deg,
                    directionId: params.animeDirId,
                    moveDistance: 0,
                    moveDistanceEnabled: false
                };
                thisInstance.execCommandDirectionMove(args);

                break;
        }
        return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
    };
    obj.execLinkCondition = function(index, valueJson, objectId, instanceId, actionLinkId){
        var paramId = obj.getInfo("linkCondition")[index].id;
        valueJson = obj.completeValueJson(index, valueJson, "linkCondition");
        switch(paramId){
            case 0: // debug
                break;
            case 1: // tilt
                var params = {
                    stickId:    obj.getValueJson(valueJson, 1),
                    ctrlObjId:  obj.getValueJson(valueJson, 2),
                    ctrlVarId:  obj.getValueJson(valueJson, 21),
                    operatorType:  obj.getValueJson(valueJson, 3),
                    enteredNumber:  obj.getValueJson(valueJson, 4),
                    targetObjId:  obj.getValueJson(valueJson, 5),
                    targetVarId:  obj.getValueJson(valueJson, 15)
                };

                var ctrlVar = obj.getVariable(params.ctrlObjId, params.ctrlVarId, instanceId);
                if(!ctrlVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlVar);
                    break;
                }

                if(params.stickId == -1){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidStickId);
                    break;
                }

                var ctrlId = ctrlVar.getValue()|0;
                if(ctrlId <= 0){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlId);
                    break;
                }

                var num = 0;
                if(params.targetObjId != -1 && params.targetVarId != -1){
                    var numVar = obj.getVariable(params.targetObjId, params.targetVarId, instanceId);
                    if(!numVar){
                        if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidVariable);
                        break;
                    }
                    num = numVar.getValue();
                }else{
                    num = params.enteredNumber;
                }

                var tilt;
                if (params.stickId > 2) {
                    tilt = Agtk.controllers.getOperationKeyValue(ctrlId, params.stickId);
                }else{
                    tilt = utils.getTiltPower(ctrlId, params.stickId);
                }
                if(tilt == null){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidStick);
                    break;
                }

                tilt = Math.floor(tilt * 100);

                var op = params.operatorType;
                if(op == 1){
                    return tilt == num;
                }else if(op == 2){
                    return tilt < num;
                }else if(op == 3){
                    return tilt <= num;
                }else if(op == 4){
                    return tilt > num;
                }else if(op == 5){
                    return tilt >= num;
                }else if(op == 6){
                    return tilt != num;
                } 
                break;
            case 2: // angle
                var params = {
                    stickType:    obj.getValueJson(valueJson, 1),
                    ctrlObjId:  obj.getValueJson(valueJson, 2),
                    ctrlVarId:  obj.getValueJson(valueJson, 21),
                    operatorType:  obj.getValueJson(valueJson, 3),
                    enteredNumber:  obj.getValueJson(valueJson, 4),
                    targetObjId:  obj.getValueJson(valueJson, 5),
                    targetVarId:  obj.getValueJson(valueJson, 15)
                };

                var ctrlVar = obj.getVariable(params.ctrlObjId, params.ctrlVarId, instanceId);
                if(!ctrlVar) {
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlVar);
                    break;
                }

                if(params.stickType == -1){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidStickId);
                    break;
                }

                var ctrlId = ctrlVar.getValue()|0;
                if(ctrlId <= 0){
                    if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidCtrlId);
                    break;
                }

                var num = 0;
                if(params.targetObjId != -1 && params.targetVarId != -1){
                    var numVar = obj.getVariable(params.targetObjId, params.targetVarId, instanceId);
                    if(!numVar){
                        if(pluginParams.runtimeLog > 0) Agtk.log(locale.error.invalidVariable);
                        break;
                    }
                    num = numVar.getValue();
                }else{
                    num = params.enteredNumber;
                }

                var deg = utils.getAngleDegrees(ctrlId, params.stickType);

                var op = params.operatorType;
                if(op == 1){
                    return deg == num;
                }else if(op == 2){
                    return deg < num;
                }else if(op == 3){
                    return deg <= num;
                }else if(op == 4){
                    return deg > num;
                }else if(op == 5){
                    return deg >= num;
                }else if(op == 6){
                    return deg != num;
                }
                break;
        }
        return false;
    };

    obj.getVariable = function(objectId, variableId, instanceId){
        if(objectId == 0){
            return Agtk.variables.get(variableId);
        }else if(objectId == -2){
            var selfObj = Agtk.objectInstances.get(instanceId);
            return selfObj.variables.get(variableId);
        }else if(objectId != -1){
            var refObj = Agtk.objects.get(objectId);
            var refInsId = Agtk.objectInstances.getIdByName(objectId, refObj.name);
            var refIns = Agtk.objectInstances.get(refInsId);
            return refIns.variables.get(variableId);
        }else{
            return null;
        }
    };

    obj.completeValueJson = function(index, valueJson, type){
        var vj = obj.getInfo(type)[index];
        var parameter = vj.parameter;
        if(!!parameter){
            var paramLen = parameter.length;
            for(var i=0; i<paramLen; i++){
                var id = parameter[i].id;
                var found = false;
                var valueLen = valueJson.length;
                for(var j=0; j<valueLen; j++){
                    if(valueJson[j].id == id){
                        found = true;
                        break;
                    }
                }
                if(!found){
                    valueJson.push({id: id, value: parameter[i].defaultValue});
                }
            }
        }
        return valueJson;
    };
    obj.getValueJson = function(valueJson, id){
        var len = valueJson.length;
        for(var i=0; i<len; i++){
            if(valueJson[i].id == id){
                return valueJson[i].value;
            }
        }
        return null;
    };

    return obj;
}())