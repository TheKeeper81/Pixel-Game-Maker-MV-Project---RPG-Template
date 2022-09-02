(function(){
    var obj = {};
    obj.locale = null;
    obj.internal = {counter: 0, stageClearCountList: [], stageClearTimeList: []};
    obj.name = '';

    obj.getInfo = function(category){
        obj.internal.counter++;
        if(category == 'name'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return 'ステージクリア情報';
            } else if(obj.locale.substr(0, 2) == 'zh'){
                return '关卡完成信息';
            } else {
                return 'Stage Clear Information';
            }
        } else if(category == 'description'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return 'このプラグインはステージクリア回数とクリアタイム、ベストクリアタイムをプラグイン側で保存します。';
            } else if(obj.locale.substr(0, 2) == 'zh'){
                return '这个插件会在插件中保存关卡完成的次数、时间和最佳时间。';
            } else {
                return 'This Plug-In saves/loads the stage clear count, time, and stage clear best time on the Plug-In side.';
            }
        } else if(category == 'author'){
            return 'Keiji Agusa / Joe';
        } else if(category == 'help'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return 'このプラグインが管理するデータは、ゲームプレイの一般的なセーブ/ロード機能のタイミングでセーブ/ロードされます。\n\nプロジェクト共通変数に次の3つを作成する必要があります。\nPlugIn_StageId\nPlugIn_StageClearTime\nPlugIn_StageClearCount';
            } else if(obj.locale.substr(0, 2) == 'zh'){
                return '由插件管理的数据将在通常保存和加载游玩数据的同时进行保存和加载。\n\n这个插件需要你在项目中创建以下几个公共变量才能运作。\nPlugIn_StageId\nPlugIn_StageClearTime\nPlugIn_StageClearCount';
            } else {
                return '*The data managed by this Plug-In will be saved/loaded at the timing of the general save/load functions of the gameplay.\n\nThis Plug-In needs to create the following three common variables.\nPlugIn_StageId\nPlugIn_StageClearTime\nPlugIn_StageClearCount';
            }
        } else if(category == 'parameter'){
            return [ ];
        } else if(category == 'internal'){
            //console.log('no: getInfo internal: ' + obj.internal.counter + ': ' + JSON.stringify(obj.internal));
            return obj.internal;
        } else if(category == 'actionCommand'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return [
                    {id: 5, name: 'ステージクリア回数の取得', description: 'プラグインに保存したステージクリア回数を"PlugIn_StageClearCount"に取得します。\n"PlugIn_StageId"にステージ番号を設定してからこのアクションを実行してください。\n※ステージ番号は、1～を設定してください。', parameter: [
                    ]},
                    {id: 6, name: 'ステージクリア回数を保存', description: 'ステージクリア回数をプラグインに保存します。\n"PlugIn_StageId"にステージ番号を、\n"PlugIn_StageClearCount"にステージクリア回数を設定してからこのアクションを実行してください。', parameter: [
                    ]},
                    {id: 7, name: 'ステージクリアタイムの取得', description: 'プラグインに保存したステージクリアタイムを"PlugIn_StageClearTime"に取得します。\n"PlugIn_StageId"にステージ番号を設定してからこのアクションを実行してください。\n※ステージクリアタイムは「秒」で格納してください。', parameter: [
                    ]},
                    {id: 8, name: 'ステージクリアタイムを保存', description: 'ステージクリアタイムをプラグインに保存します。\n"PlugIn_StageId"にステージ番号を、"PlugIn_StageClearTime"にステージクリアタイムを設定してからこのアクションを実行してください。', parameter: [
                    ]},
                    {id: 9, name: 'ステージクリアベストタイムを保存', description: '"PlugIn_StageClearTime"の値を、保存されたステージクリアタイムと比較し、前者の値が小さい場合に変数の値をプラグインに保存します。\n"PlugIn_StageId"にステージ番号を、"PlugIn_StageClearTime"にステージクリアタイムを設定してからこのアクションを実行してください。\n※ステージクリアタイムは「秒」で格納してください。', parameter: [
                    ]},
                ];
            } else if(obj.locale.substr(0, 2) == 'zh'){
                return [
                    {id: 5, name: '读取关卡完成次数', description: '从插件中读取关卡完成次数，并将该值写入变量"PlugIn_StageClearCount"。\n执行这个动作前，请在变量"PlugIn_StageId"中设置关卡ID的值。\n*关卡ID的有效值从1开始。', parameter: [
                    ]},
                    {id: 6, name: '保存关卡完成次数', description: '将关卡完成次数保存在插件中。\n在执行这个动作之前，请在变量"PlugIn_StageId"中设置关卡ID的值，\n以及在变量"PlugIn_StageClearCount"中设置关卡完成次数的值。', parameter: [
                    ]},
                    {id: 7, name: '读取关卡完成时间', description: '从插件中读取关卡完成时间，并将该值写入变量"PlugIn_StageClearTime"。\n执行这个动作前，请在变量"PlugIn_StageId"中设置关卡ID的值。\n*关卡完成时间的计数单位为“秒”。', parameter: [
                    ]},
                    {id: 8, name: '保存关卡完成时间', description: '将关卡完成时间保存在插件中。\n在执行这个动作之前，请在变量"PlugIn_StageId"中设置关卡ID的值，\n以及在变量"PlugIn_StageClearTime"中设置关卡完成时间的值。', parameter: [
                    ]},
                    {id: 9, name: '更新关卡完成最佳时间', description: '如果"PlugIn_StageClearTime"保存的值小于当前关卡完成时间，则将该变量的值作为最佳关卡完成时间并保存在插件中。\n在执行这个动作之前，请在变量"PlugIn_StageId"中设置关卡ID的值，\n以及在变量"PlugIn_StageClearTime"中设置关卡完成时间的值。\n*关卡完成时间的计数单位为“秒”。', parameter: [
                    ]},
                ];
            } else {
                return [
                    {id: 5, name: 'Get Stage Clear Count', description: 'Get the number of stage clears saved in the Plug-In to the "PlugIn_StageClearCount" variable.\nThis action need to set the stage ID to "PlugIn_StageId" before executing.\n*The stage ID should be set from 1.', parameter: [
                    ]},
                    {id: 6, name: 'Save Stage Clear Count', description: 'Save the number of stage clears to the Plug-In.\nThis action need to set the stage ID to "PlugIn_StageId" and\n"PlugIn_StageClearCount" to the number of stage clears before executing.', parameter: [
                    ]},
                    {id: 7, name: 'Get Stage Clear Time', description: 'Get the number of stage clear time saved in the Plug-In to the "PlugIn_StageClearTime" variable.\nThis action need to set the stage ID to "PlugIn_StageId" before executing.\n*The stage time should be set in "seconds".', parameter: [
                    ]},
                    {id: 8, name: 'Save Stage Clear Time', description: 'Save the number of stage clear time to the Plug-In.\nThis action need to set the stage ID to "PlugIn_StageId" and\n"PlugIn_StageClearTime" to the number of stage clear time before executing.', parameter: [
                    ]},
                    {id: 9, name: 'Save Best Stage Clear Time', description: 'Save the number of stage clear time to the Plug-In if "PlugIn_StageClearTime" variable is less than the stage clear time.\nThis action need to set the stage ID to "PlugIn_StageId" and\n"PlugIn_StageClearTime" to the number of stage clear time before executing.\n*The stage time should be set in "seconds".', parameter: [
                    ]},
                ];
            }
            
        } else if(category == 'linkCondition'){
        }
        return null;
    };
    obj.initialize = function(settings){
        //console.log('no: initialize  ' + obj.internal.counter + ': ' + JSON.stringify(settings));
        if(settings === null) return;
        obj.internal = settings;
    };
    obj.finalize = function(){
    };

    obj.setLocale = function(_locale){
        obj.locale = _locale;
    };

    obj.setInternal = function(settings){
        if(typeof settings === 'object'){
            obj.internal = settings;
        }
    };
    obj.call = function(name, param1, param2){
    };

    obj.execActionCommand = function(index, valueJson, objectId, instanceId, actionId, commandId){
        if(index == 0){ // クリア回数取得
            var clearStageNumber = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageId')).getValue();
            if (!('stageClearCountList' in obj.internal)){
                obj.internal.stageClearCountList = [];
            }
            var count = 0;
            if (clearStageNumber >= 1 && clearStageNumber <= obj.internal.stageClearCountList.length){
                count = obj.internal.stageClearCountList[clearStageNumber - 1];
            }
            Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageClearCount')).setValue(count);
            return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
        }
        if(index == 1){ // クリア回数上書き
            var clearStageNumber = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageId')).getValue();
            var stageClearCount = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageClearCount')).getValue();
            if (!('stageClearCountList' in obj.internal)){
                obj.internal.stageClearCountList = [];
            }
            if (clearStageNumber < 1){
                // Bad stage number
                return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
            }
            var addCount = clearStageNumber - obj.internal.stageClearCountList.length;
            for (var i = 0; i < addCount; i++){
                obj.internal.stageClearCountList.push(0);
            }
            obj.internal.stageClearCountList[clearStageNumber - 1] = stageClearCount;
            return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
        }
        if(index == 2){ // クリアタイム取得
            var clearStageNumber = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageId')).getValue();
            if (!('stageClearTimeList' in obj.internal)){
                obj.internal.stageClearTimeList = [];
            }
            var time = 0;
            //Agtk.log('no: clearStageNumber: ' + clearStageNumber);
            //Agtk.log('no: time: ' + time);
            if (clearStageNumber >= 1 && clearStageNumber <= obj.internal.stageClearTimeList.length){
                time = obj.internal.stageClearTimeList[clearStageNumber - 1];
            }
            //Agtk.log('no: time2: ' + time);
            Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageClearTime')).setValue(time);
            return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
        }
        if(index == 3){ // クリアタイム上書き
            var clearStageNumber = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageId')).getValue();
            var stageClearTime = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageClearTime')).getValue();
            if (!('stageClearTimeList' in obj.internal)){
                obj.internal.stageClearTimeList = [];
            }
            if (clearStageNumber < 1){
                // Bad stage number
                return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
            }
            var addTime = clearStageNumber - obj.internal.stageClearTimeList.length;
            for (var i = 0; i < addTime; i++){
                obj.internal.stageClearTimeList.push(0);
            }
            obj.internal.stageClearTimeList[clearStageNumber - 1] = stageClearTime;
            return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
        }
        if(index == 4){ // クリアベストタイム更新
            var clearStageNumber = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageId')).getValue();
            var stageClearTime = Agtk.variables.get(Agtk.variables.getIdByName('PlugIn_StageClearTime')).getValue();
            if (!('stageClearTimeList' in obj.internal)){
                obj.internal.stageClearTimeList = [];
            }
            if (clearStageNumber < 1){
                // Bad stage number
                return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
            }
            var addTime = clearStageNumber - obj.internal.stageClearTimeList.length;
            for (var i = 0; i < addTime; i++){
                obj.internal.stageClearTimeList.push(0);
            }
            if (stageClearTime < obj.internal.stageClearTimeList[clearStageNumber - 1]){
                obj.internal.stageClearTimeList[clearStageNumber - 1] = stageClearTime;
            }
            return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
        }
    };

    obj.execLinkCondition = function(index, valueJson, objectId, instanceId, actionLinkId){
        return false;
    };

    obj.update = function(dt){
    };

    obj.completeValueJson = function(index, valueJson){
        var vj = obj.getInfo('actionCommand')[index];
        var parameter = vj.parameter;
        if(!!parameter){
            for(var i = 0; i < parameter.length; i++){
                var id = parameter[i].id;
                var found = false;
                for(var j = 0; j < valueJson.length; j++){
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
    obj.getValue = function(valueJson, id){
        for(var i = 0; i < valueJson.length; i++){
            if(valueJson[i].id == id){
                return valueJson[i].value;
            }
        }
        return null;
    };

    return obj;
}())
