(function(){
    var obj = {};
    obj.locale = null;

    obj.getInfo = function(category){
        if(category == 'name'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return 'ゲームをリセット';
			} else if(obj.locale.substr(0, 2) == 'zh'){
				return '重设游戏';
            } else {
                return 'Reset Game';
            }
        } else if(category == 'description'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return 'ゲームをリセットします。※F5リセットと同じ挙動';
			} else if(obj.locale.substr(0, 2) == 'zh'){
				return '重置游戏。 *与F5重置具有相同的行为';
            } else {
                return 'Reset the Game. *Has the same behavior as the F5 Reset';
            }
        } else if(category == 'author'){
            return 'Keiji Agusa';
        } else if(category == 'help'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return "ゲームをリセットします。※F5リセットと同じ挙動";
			} else if(obj.locale.substr(0, 2) == 'zh'){
				return "重置游戏。 *与F5重置具有相同的行为";
            } else {
                return "Reset the Game. *Has the same behavior as the F5 Reset";
            }
        } else if(category == 'parameter'){
            return [
            ];
        } else if(category == 'internal'){
            return null;
        } else if(category == 'actionCommand'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return [
					{id: 1, name: 'ゲームをリセット', description: 'ゲームをリセットします。※F5リセットと同じ挙動', parameter: []}  
                ];
			} else if(obj.locale.substr(0, 2) == 'zh'){
				return [
					{id: 1, name: '重设游戏', description: '重置游戏。 *与F5重置具有相同的行为', parameter: []}  
                ];
            } else {
                return [
					{id: 1, name: 'Reset Game', description: 'Reset the Game. *Has the same behavior as the F5 Reset', parameter: []}   
                ];
            }
        } 
        return null;
    };
    obj.initialize = function(settings){
        
    };
    obj.finalize = function(){
    };

    obj.setLocale = function(_locale){
        obj.locale = _locale;
    };

    obj.call = function(name, param1, param2){
    };

    obj.setParamValue = function(param){
        obj.paramValue = param;
    }

    obj.execActionCommand = function(index, valueJson, objectId, instanceId, actionId, commandId){
        Agtk.reset();
        return false;
    };

    obj.update = function(dt){
    };

    return obj;
}())
