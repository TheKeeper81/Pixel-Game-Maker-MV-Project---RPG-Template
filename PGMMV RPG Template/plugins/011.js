(function(){
    var obj         = {};
    obj.internal    = {};

    var baz = {
        // USEFUL FUNCTIONS
        Log: function(event){
            return Agtk.log(event);
        },
        Lerp: function(start, end, time){
            var _dist = (1 - time) * start + time * end;
            return Math.round(_dist * 10) / 10;
        },
        ConvertTimeTo300: function(timeToConvert){
            return timeToConvert * 300;
        },
        GetAngleAway: function(startX, startY, endX, endY){
            var _pi = Math.PI;
            var _x = startX - endX;
            var _y = endY - startY;
            var _angle = Math.atan2(_x, _y) * (180 / _pi);
            return (_angle < 0) ? (360 + _angle) : _angle;
        },
        GetAngleToward: function(startX, startY, endX, endY){
            var _pi = Math.PI;
            var _x = endX - startX;
            var _y = startY - endY;
            var _angle = Math.atan2(_x, _y) * (180 / _pi);
            return (_angle < 0) ? (360 + _angle) : _angle;
        },
        // INPUT RELATED FUNCTIONS
        IsKeyPressed: function(keyId){
            for(var i = 0; i <= Agtk.controllers.MaxControllerId; i++){
                if(Agtk.controllers.getOperationKeyPressed(i, keyId)){
                    return true;
                }
            }
        },
        // INSTANCE RELATED FUNCTIONS
        GetSelf: function(instance){
            return Agtk.objectInstances.get(instance);
        },
        GetOtherInstance: function(nameOrId){
            if(isNaN(nameOrId)){
                return Agtk.objectInstances.get(Agtk.objectInstances.getIdByName(-1, nameOrId));
            }
            return Agtk.objectInstances.get(nameOrId);
        },
        GetParentInstance: function(childNameOrId){
            var _child;
            if(isNaN(childNameOrId)){
                _child = Agtk.objectInstances.get(Agtk.objectInstances.getIdByName(-1, childNameOrId));
            }else{
            _child = Agtk.objectInstances.get(childNameOrId);
            }
            var _parentId = _child.variables.get(_child.variables.ParentObjectInstanceIDId).getValue();
            return Agtk.objectInstances.get(_parentId);
        },
        GetAttackerInstance: function(instance){
            var _attackerList = instance.getAttackerInstanceIdList();
            for(var attacker in _attackerList){
                return Agtk.objectInstances.get(_attackerList[attacker]);
            }
        },
        // INSTANCE SWITCH/VARIABLE RELATED FUNCTIONS
        GetInstanceSwitch: function(instance, nameOrId){
            if(isNaN(nameOrId)){
                return instance.switches.get(instance.switches.getIdByName(nameOrId)).getValue();
            }
            return instance.switches.get(nameOrId).getValue();
        },
        SetInstanceSwitch: function(instance, nameOrId, value){
            if(isNaN(nameOrId)){
                instance.switches.get(instance.switches.getIdByName(nameOrId)).setValue(value);
                return;
            }
            instance.switches.get(nameOrId).setValue(value);
        },
        GetInstanceVariable: function(instance, nameOrId){
            if(isNaN(nameOrId)){
                return instance.variables.get(instance.variables.getIdByName(nameOrId)).getValue();
            }
            return instance.variables.get(nameOrId).getValue();
        },
        SetInstanceVariable: function(instance, nameOrId, value){
            if(isNaN(nameOrId)){
                instance.variables.get(instance.variables.getIdByName(nameOrId)).setValue(value);
                return;
            }
            instance.variables.get(nameOrId).setValue(value);
        },
        // COMMON SWITCH/VARIABLE RELATED FUNCTIONS
        GetCommonSwitch: function(nameOrId){
            if(isNaN(nameOrId)){
                return Agtk.switches.get(Agtk.switches.getIdByName(nameOrId)).getValue();
            }
            return Agtk.switches.get(nameOrId).getValue();
        },
        SetCommonSwitch: function(nameOrId, value){
            if(isNaN(nameOrId)){
                Agtk.switches.get(Agtk.switches.getIdByName(nameOrId)).setValue(value);
                return;
            }
            Agtk.switches.get(nameOrId).setValue(value);
        },
        GetCommonVariable: function(nameOrId){
            if(isNaN(nameOrId)){
                return Agtk.variables.get(Agtk.variables.getIdByName(nameOrId)).getValue();
            }
            return Agtk.variables.get(nameOrId).getValue();
        },
        SetCommonVariable: function(nameOrId, value){
            if(isNaN(nameOrId)){
                Agtk.variables.get(Agtk.variables.getIdByName(nameOrId)).setValue(value);
                return;
            }
            Agtk.variables.get(nameOrId).setValue(value);
        }
    }

    obj.getInfo = function(category){
        if(category == 'name'){
            return "Menu Scene Mouse";
        } else if(category == 'description'){
            return "Sets menu obj xy relative to mouse xy.";
        } else if(category == 'author'){
            return "baz";
        } else if(category == 'help'){
            return  "Version: 1.01"+
                    "\n\nFollow the instructions below to setup plugin:"+
                    "\n\n1. In the params, set the common vars that will store the xy of the camera object"+
                    "\n\n2. Add the 'Get Camera XY And Set Self XY To Mouse XY' link in the mouse that is on the NORMAL scene"+
                    "\n--This condition needs to be async, preferably as a Common Action (refer to video below)"+
                    "\n--Inside the condition set which object is the camera (can be player if not using a camera obj)"+
                    "\n\n3. Add the 'Set Menu Object XY Relative To Mouse XY' link condition in the mouse object on the MENU scene"+
                    "\n--This condition needs to be async, preferably as a Common Action (refer to video below)"+
                    "\n\nFor more info on setting up async processes refer to this video: https://youtu.be/mMxrAT04Hz0"
        } else if(category == 'parameter'){
            return [
                {id: -1, name: '', type: 'embedded', defaultValue: -1},
                {id: 100, name: '(Common Variable)', type: 'SwitchVariableObjectId', option: [""],defaultValue: 0},
                {id: 200, name: 'Camera Object X:', type: 'VariableId', referenceId: 100,defaultValue: 0},
                {id: 300, name: 'Camera Object Y:', type: 'VariableId', referenceId: 100,defaultValue: 0},
                {id: -1, name: '', type: 'embedded', defaultValue: -1}
            ];
        } else if(category == 'internal'){
            return obj.internal;
        } else if(category == 'actionCommand'){
            return [];
        } else if(category == 'linkCondition'){
            return [
                {id: 1, name: 'Get Camera XY And Set Self XY To Mouse XY', description: 'Gets camera obj xy (can be player if not using a camera obj) and sets obj self xy to mouse xy.', parameter: [
                    {id: 3, name: 'Camera Object:', type: 'ObjectId', defaultValue: -1}
                ]},
                {id: 2, name: 'Set Menu Object XY Relative To Mouse XY', description: 'Sets menu obj xy relative to the mouse xy.', parameter: []}
            ];
        }
        return null;
    };
    obj.initialize = function(settings){
    };
    obj.finalize = function(){
    };
    obj.setLocale = function(_locale){
    };
    obj.setInternal = function(settings){
        obj.internal = settings;
    };
    obj.setParamValue = function(param){
        obj.commonVarX = obj.getValueJson(param, 200);
        obj.commonVarY = obj.getValueJson(param, 300);
    };
    obj.call = function(name, param1, param2){
    };
    obj.update = function(dt){
    };
    obj.execActionCommand = function(index, valueJson, objectId, instanceId, actionId, commandId){
        var paramId = obj.getInfo("actionCommand")[index].id;
        valueJson = obj.completeValueJson(index, valueJson, "actionCommand");
        switch(paramId){
            case 1:
                break;
        }
        return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
    };
    obj.execLinkCondition = function(index, valueJson, objectId, instanceId, actionLinkId){
        var paramId = obj.getInfo("linkCondition")[index].id;
        valueJson = obj.completeValueJson(index, valueJson, "linkCondition");
        switch(paramId){
            case 1: //----------Get Camera Object XY AND Set Self XY To Mouse XY
                //get params
                var commonVarX = obj.commonVarX;
                var commonVarY = obj.commonVarY;
                var referenceObjectId = obj.getValueJson(valueJson, 3);
                var referenceObjectName = Agtk.objects.get(referenceObjectId).name;

                //settings
                var self = baz.GetSelf(instanceId);
                var referenceObj = baz.GetOtherInstance(referenceObjectName);
                var referenceObjX = baz.GetInstanceVariable(referenceObj, 9); //x coord
                var referenceObjY = baz.GetInstanceVariable(referenceObj, 10); //y coord
                var mouseX = baz.GetCommonVariable(22); //mousex
                var mouseY = baz.GetCommonVariable(23); //mousey


                baz.SetInstanceVariable(self, 9, mouseX);
                baz.SetInstanceVariable(self, 10, mouseY);
                baz.SetCommonVariable(commonVarX, referenceObjX);
                baz.SetCommonVariable(commonVarY, referenceObjY);
                break;
            case 2: //----------Set Menu Scene Object Mouse XY
                //get mouse and reference obj xy
                var self = baz.GetSelf(instanceId);
                var mouseX = baz.GetCommonVariable(22);
                var mouseY = baz.GetCommonVariable(23);
                var sceneReferenceX = baz.GetCommonVariable(obj.commonVarX);
                var sceneReferenceY = baz.GetCommonVariable(obj.commonVarY);

                //get scene/res info
                var scene = Agtk.scenes.get(Agtk.sceneInstances.getCurrent().sceneId);
                var resWidth = Agtk.settings.screenWidth;
                var resHeight = Agtk.settings.screenHeight;
                var sceneWidth = resWidth * scene.horzScreenCount;
                var sceneHeight = resHeight * scene.vertScreenCount;
                var midWidth = resWidth / 2;
                var midHeight = resHeight / 2;
                var endHalfWidth = sceneWidth - midWidth;
                var endHalfHeight = sceneHeight - midHeight;

                //calculate distances of reference obj and mouse on normal scene
                var x = sceneReferenceX - mouseX;
                var y = sceneReferenceY - mouseY;
                var distX = Math.sqrt(x * x);
                var distY = Math.sqrt(y * y);

                //set x and y
                var newX, newY;
                if(sceneReferenceX < endHalfWidth)
                {
                    if(mouseX >= sceneReferenceX)
                    {
                        if(midWidth > sceneReferenceX)
                        {
                            newX = mouseX;
                        }
                        else
                        {
                            newX = midWidth + distX;
                        }
                    }
                    else
                    {
                        if(midWidth > sceneReferenceX)
                        {
                            newX = mouseX;
                        }
                        else
                        {
                            newX = midWidth - distX;
                        }
                    }
                }
                else
                {
                    //setup for end wid of scene
                    x = endHalfWidth - mouseX;
                    distX = Math.sqrt(x * x);

                    if(mouseX >= sceneReferenceX)
                    {
                        if(midWidth > sceneReferenceX)
                        {
                            newX = mouseX;
                        }
                        else
                        {
                            newX = midWidth + distX;
                        }
                    }
                    else
                    {
                        if(endHalfWidth > mouseX)
                        {
                            newX = midWidth - distX;
                        }
                        else
                        {
                            newX = midWidth + distX;
                        }
                    }
                }

                if(sceneReferenceY < endHalfHeight)
                {
                    if(mouseY >= sceneReferenceY)
                    {
                        if(midHeight > sceneReferenceY)
                        {
                            newY = mouseY;
                        }
                        else
                        {
                            newY = midHeight + distY;
                        }
                    }
                    else
                    {
                        if(midHeight > sceneReferenceY)
                        {
                            newY = mouseY;
                        }
                        else
                        {
                            newY = midHeight - distY;
                        }
                    }
                }
                else
                {
                    //setup for end height of scene
                    y = endHalfHeight - mouseY;
                    distY = Math.sqrt(y * y);

                    if(mouseY >= sceneReferenceY)
                    {
                        if(midHeight > sceneReferenceY)
                        {
                            newY = mouseY;
                        }
                        else
                        {
                            newY = midHeight + distY;
                        }
                    }
                    else
                    {
                        if(endHalfHeight > mouseY)
                        {
                            newY = midHeight - distY;
                        }
                        else
                        {
                            newY = midHeight + distY;
                        }
                    }
                }

                baz.SetInstanceVariable(self, 9, newX);
                baz.SetInstanceVariable(self, 10, newY);
                break;
        }
        return false;
    };
    obj.completeValueJson = function(index, valueJson, type){
        var vj = obj.getInfo(type)[index];
        var parameter = vj.parameter;
        if(!!parameter){
            var paramLen = parameter.length;
            for(var _i = 0; _i < paramLen; _i++){
                var id = parameter[_i].id;
                var found = false;
                var valueLen = valueJson.length;
                for(var j = 0; j < valueLen; j++){
                    if(valueJson[j].id == id){
                        found = true;
                        break;
                    }
                }
                if(!found){
                    valueJson.push({id: id, value: parameter[_i].defaultValue});
                }
            }
        }
        return valueJson;
    };
    obj.getValueJson = function(valueJson, id){
        var len = valueJson.length;
        for(var _i = 0; _i < len; _i++){
            if(valueJson[_i].id == id){
                return valueJson[_i].value;
            }
        }
        return null;
    };
    return obj;
}())