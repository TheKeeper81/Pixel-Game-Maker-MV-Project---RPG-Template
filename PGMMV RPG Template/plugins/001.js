(function(){
    var obj = {};
    obj.locale = null;
    obj.internal = {visitedSceneId: [], counter: 0, datetime: ""};

    obj.getInfo = function(category){
        console.log("getInfo: " + [category, obj.locale, 'internal', JSON.stringify(obj.internal)].join(", "));
        obj.internal.counter++;
        if(category == 'name'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return 'ミニマップ';
            } else {
                return 'Mini map';
            }
        } else if(category == 'description'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return 'ミニマップを表示します。';
            } else {
                return 'Show mini map';
            }
        } else if(category == 'author'){
            return 'Keiji Agusa / Jumpei Shinozaki';
        } else if(category == 'help'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return "■プラグイン概要\n実行アクションにてミニマップの表示/非表示や、リンク条件にマップ表示を取得することができるようになります。\n\n■使い方\n1.素材タブ→画像にて、MiniMap.pngを読み込みます。\n2.素材タブ→フォントにて、新規フォントを作成し、以下の通りに設定します。\n・「TrueTypeフォントを使用」を選択\n・使用するフォント：mplus-1m-regular\n3.プラグインタブよりプラグイン新規作成してMiniMap.jsを読み込み、パラメータ変更の値を以下の通りにします。\n・画像素材：1.を選択\n・フォント：2.を選択\n\n■注意点\nミニマップにはプレイヤーの位置も表示されますが、スタートポイントから生成する必要があり、プレイヤー1の場所のみ表示されます。";
            } 
            else if(obj.locale.substr(0, 2) == 'en'){
                return "■Plug-in Information\nDisplays or hides a minimap based on a Runtime Action, as well as add related Link Conditions.\n\n■How to Configure\n1. On the Resources tool, add the Minimap.png image.\n2. On the Resources tool, add a new Font configured as indicated below.\n　・Select Use TrueType Font\n　・Use the “mplus-1m-regular” font.\n3. On the Plug-ins tool, register the MiniMap.js and then configure it as follows.\n　・Image： Select the Minimap.png.\n　・Font：Select the font created in step 2.\n\n■Warning\nWhile the minimap can show the player’s location, it only works for  player 1 and they must be spawned by a Start Point. Other players and methods of spawning a player are not supported by this plug-in.";
            } 
            else if(obj.locale.substr(0, 2) == 'zh'){
                return "■插件简介\n关于实行动作小地图的显示/不显示，能够在连接条件中取得地图显示。\n\n■使用方法\n1.素材标签→画像，载入MiniMap.png\n2.素材标签→字体，新建字体，并按照以下的操作。\n  ·选择“使用TrueType字体”\n  ·使用字体：mplus-1m-regular\n3.从插件标签中新建插件，再读取之前制作的MiniMap.js，并按照以下来改变参数。\n  ·图像素材：选择1.\n  ·字体：选择2.\n\n■注意\n在小地图中如果要显示角色的位置，则需要生成起始点，小地图只显示角色1的位置。";
            } 
            else {
                return "This plugin displays mini map.";
            }
        } else if(category == 'parameter'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return [
                    {id: 1, name: '画像素材', type: 'ImageId', defaultValue: -1},
                    {id: 2, name: 'フォント', type: 'FontId', defaultValue: -1},
                ];
            } else {
                return [
                    {id: 1, name: 'Image', type: 'ImageId', defaultValue: -1},
                    {id: 2, name: 'Font', type: 'FontId', defaultValue: -1},
                ];
            }
        } else if(category == 'internal'){
            obj.internal.datetime = new Date().toString();
            return obj.internal;
        } else if(category == 'actionCommand'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return [
                    {id: 1, name: 'ミニマップ表示', description: 'ミニマップを表示します。', parameter: [
                        {id: 1, name: 'ミニマップ上シーンの幅', type: 'Number', minimumValue: 1, maximumValue: 9999, defaultValue: 24},
                        {id: 2, name: 'ミニマップ上シーンの高さ', type: 'Number', minimumValue: 1, maximumValue: 9999, defaultValue: 18},
                        {id: 3, name: '未開拓シーン', type: 'CustomId', defaultValue: 2, customParam: [
                            {id: 1, name: '表示しない'},
                            {id: 2, name: '表示する'}
                        ]},
                        {id: 4, name: '未開拓シーンのポータル', type: 'CustomId', defaultValue: 1, customParam: [
                            {id: 1, name: '表示しない'},
                            {id: 2, name: '表示する'}
                        ]},
                        {id: 5, name: 'シーン間のマージン', type: 'Number', minimumValue: 0, maximumValue: 10, defaultValue: 0},
                        {id: 6, name: 'ミニマップの不透明度', type: 'Number', minimumValue: 0, maximumValue: 255, defaultValue: 255},
                        {id: 7, name: '背景の不透明度', type: 'Number', minimumValue: 0, maximumValue: 255, defaultValue: 128},
                        {id: 8, name: 'シーン名', type: 'CustomId', defaultValue: 2, customParam: [
                            {id: 1, name: '表示しない'},
                            {id: 2, name: '表示する'}
                        ]},
                    ]},
                    {id: 2, name: 'ミニマップ非表示', description: 'ミニマップを消します。', parameter: [
                    ]}
                ];
            } else {
                return [
                    {id: 1, name: 'Show mini map', description: 'Show mini map on the screen', parameter: [
                        {id: 1, name: 'Scene Width on the mini map', type: 'Number', minimumValue: 1, maximumValue: 9999, defaultValue: 24},
                        {id: 2, name: 'Scene Height on the mini map', type: 'Number', minimumValue: 1, maximumValue: 9999, defaultValue: 18},
                        {id: 3, name: 'Display of unknown scenes', type: 'CustomId', defaultValue: 2, customParam: [
                            {id: 1, name: 'OFF'},
                            {id: 2, name: 'ON'}
                        ]},
                        {id: 4, name: 'Portal display of unknown scenes', type: 'CustomId', defaultValue: 1, customParam: [
                            {id: 1, name: 'OFF'},
                            {id: 2, name: 'ON'}
                        ]},
                        {id: 5, name: 'Margin between scenes', type: 'Number', minimumValue: 0, maximumValue: 10, defaultValue: 0},
                        {id: 6, name: 'Opacity of the mini map', type: 'Number', minimumValue: 0, maximumValue: 255, defaultValue: 255},
                        {id: 7, name: 'Opacity of the background', type: 'Number', minimumValue: 0, maximumValue: 255, defaultValue: 128},
                        {id: 8, name: 'Display of scene name', type: 'CustomId', defaultValue: 2, customParam: [
                            {id: 1, name: 'OFF'},
                            {id: 2, name: 'ON'}
                        ]},
                    ]},
                    {id: 2, name: 'Hide mini map', description: 'Hide mini map', parameter: [
                    ]}
                ];
            }
        } else if(category == 'linkCondition'){
            if(obj.locale.substr(0, 2) == 'ja'){
                return [
                    {id: 1, name: 'ミニマップ表示中か', description: 'ミニマップ表示中かを判定します。', parameter: [
                    ]}
                ];
            } else {
                return [
                    {id: 1, name: 'Mini map has been displayed', description: 'It judges whether minimap is currently displayed.', parameter: [
                    ]}
                ];
            }
        }
        return null;
    };
    obj.initialize = function(settings){
        console.log("initialize called: " + JSON.stringify(settings));
        obj.internal.datetime = new Date().toString();
        obj.minimapLayer = null;
        obj.showing = false;
        obj.currentSceneId = -1;
        obj.playerInstanceId = -1;
        obj.paramValue = [];
        obj.showMiniMapParamValue = [];
        obj.fadeFrame = 0;
        if(settings === null) return;
        if(typeof settings === 'object'){
            if('visitedSceneId' in settings){
                obj.internal.visitedSceneId = settings.visitedSceneId;
            }
            if('counter' in settings){
                obj.internal.counter = settings.counter;
            }
            if('datetime' in settings){
                obj.internal.datetime = settings.datetime;
            }
        }
        console.log("leave initialize: " + JSON.stringify(obj.internal));
    };
    obj.finalize = function(){
        console.log("finalize called.");
    };

    obj.setLocale = function(_locale){
        obj.locale = _locale;
    };

    obj.setInternal = function(settings){
        console.log("setInternal called: " + JSON.stringify(settings));
        if(typeof settings === 'object'){
            if('visitedSceneId' in settings){
                obj.internal.visitedSceneId = settings.visitedSceneId;
            }
            if('counter' in settings){
                obj.internal.counter = settings.counter;
            }
            if('datetime' in settings){
                obj.internal.counter = settings.datetime;
            }
        }
        console.log("obj.internal: " + JSON.stringify(obj.internal));
    };
    obj.call = function(name, param1, param2){
        console.log("call called: " + [name, param1, param2].join(', '));
    };

    obj.setParamValue = function(param){
        console.log("setParamValue called: " + JSON.stringify(param));
        obj.paramValue = param;
    }

    obj.execActionCommand = function(index, valueJson, objectId, instanceId, actionId, commandId){
        console.log("execActionCommand called: " + [index, JSON.stringify(valueJson), objectId, instanceId, actionId, commandId].join(", "));
        if(index == 0){
            if(obj.playerInstanceId != -1){
                obj.showMiniMapParamValue = obj.completeValueJson(index, valueJson);
                obj.destroyMinimap();
                obj.createMinimap();
                obj.showing = true;
            } else {
                console.log("Player1 instance not found");
            }
        } else if(index == 1){
            obj.destroyMinimap();
            obj.showing = false;
        }
    };
    obj.createMinimap = function()
    {
        var winSize = cc.director.getWinSize();
        obj.screenWidth = winSize.width;
        obj.screenHeight = winSize.height;

        obj.commandActive = true;
        var layerTag = (obj.id << 16);
        var MinimapLayer = cc.Layer.extend({
            ctor:function (instanceId) {
                this._super();
            
                this.instanceId = instanceId;
                this.sceneId = Agtk.sceneInstances.getCurrent().sceneId;
                var scene = Agtk.scenes.get(this.sceneId);
                var horzScreenCount = scene.horzScreenCount;
                var vertScreenCount = scene.vertScreenCount;

                this.minimapOpacity = obj.getValue(obj.showMiniMapParamValue, 6);
                var backGroundOpacity = obj.getValue(obj.showMiniMapParamValue, 7);

                var rect = cc.DrawNode.create();
                rect.drawRect(cc.p(0, 0), cc.p(obj.screenWidth, obj.screenHeight), cc.color(0, 0, 0, backGroundOpacity), 0, cc.color(0, 0, 0, backGroundOpacity));
                this.addChild(rect);
                this.fontDraw = null;
                this.fontUnderlineRect = null;

                var sceneNameFlag = obj.getValue(obj.showMiniMapParamValue, 8) == 2 ? true : false;
                if(sceneNameFlag){
                    var fontId = obj.getValue(obj.paramValue, 2);
                    if(fontId !== null){
                        var fontData = Agtk.fonts.get(fontId);
                        if(fontData != null){
                            this.fontDraw = new obj.FontDraw(this, 1, fontData);
                            this.fontDraw.letterLayer.x = 8;
                            this.fontDraw.letterLayer.y = obj.screenHeight - 8 - this.fontDraw.letterHeight;
        
                            var minimapName = scene.name;
                            for(var i = 0; i < minimapName.length; i++){
                                this.fontDraw.putLetter(minimapName[i]);
                            }
                            var rect = cc.DrawNode.create();
                            this.fontUnderlineRect = rect;
                            rect.drawSegment(cc.p(this.fontDraw.letterLayer.x, this.fontDraw.letterLayer.y - 16), cc.p(this.fontDraw.letterLayer.x + this.fontDraw.letterX, this.fontDraw.letterLayer.y - 16), 1, cc.color(255, 0, 0, 255));
                            this.addChild(rect);
                        }
                    }
                }

                if(!this.setMapImage()){
                    return false;
                }

                this.mapLayer = new cc.Layer();
                this.addChild(this.mapLayer);

                this.drawnSceneNodes = {};
                var originX = (obj.screenWidth / 2) - (this.scaledCellWidth * horzScreenCount / 2);
                var originY = (obj.screenHeight / 2) - (this.scaledCellWidth * vertScreenCount / 2);
                this.drawSceneMinimap(this.sceneId, originX, originY);
                if(!this.drawPlayerPosition(originX, originY, vertScreenCount)){
                    return false;
                }
                return true;
            },
            setMapImage: function(){
                var imageId = obj.getValue(obj.paramValue, 1);
                if(imageId === null){
                    console.log("imageId not specified");
                    return false;
                }
                var imageData = Agtk.images.get(imageId);
                if(imageData == null){
                    console.log("imageData not found");
                    return false;
                }
                this.imageTex = cc.TextureCache.getInstance().addImage(imageData.filename);
                this.cellWidth = this.imageTex.width / 3;
                this.cellHeight = this.imageTex.height / (3 * 3 + 1);
                this.scaledCellWidth = obj.getValue(obj.showMiniMapParamValue, 1);
                this.scaledCellHeight = obj.getValue(obj.showMiniMapParamValue, 2);
                this.drawScaleX = this.scaledCellWidth / this.cellWidth;
                this.drawScaleY = this.scaledCellHeight / this.cellHeight;
                //if(Number.isInteger(this.drawScaleX) && Number.isInteger(this.drawScaleY)){
                //    this.imageTex.setAliasTexParameters();
                //}
                return true;
            },
            drawSceneMinimap: function(sceneId, originX, originY){
                if(!(sceneId in this.drawnSceneNodes)){
                    this.drawnSceneNodes[sceneId] = [];
                    var scene = Agtk.scenes.get(sceneId);
                    var horzScreenCount = scene.horzScreenCount;
                    var vertScreenCount = scene.vertScreenCount;
                    var loc = 0;
                    if(sceneId == this.sceneId){
                        loc = 2;
                    }else if(obj.internal.visitedSceneId.indexOf(sceneId) != -1){
                        loc = 1;
                    }
                    var locV = this.cellHeight * 3 * loc;

                    var sceneDisplay = obj.getValue(obj.showMiniMapParamValue, 3) == 2 ? true : false;
                    if(sceneDisplay || obj.internal.visitedSceneId.indexOf(sceneId) != -1){

                        var spriteXInfo = new Array(horzScreenCount + 1);
                        var indexX = 0;
                        spriteXInfo[indexX] = {};
                        spriteXInfo[indexX].imageX = 0;
                        spriteXInfo[indexX].imageWidth = Math.ceil(this.cellWidth / 2);
                        spriteXInfo[indexX].x = Math.floor(originX);
                        spriteXInfo[indexX].scaleX = Math.round(spriteXInfo[indexX].imageWidth * this.drawScaleX) / spriteXInfo[indexX].imageWidth;
                        for(var i = 1; i < horzScreenCount; i++){
                            indexX++;
                            spriteXInfo[indexX] = {};
                            spriteXInfo[indexX].imageX = Math.floor(this.cellWidth / 2);
                            spriteXInfo[indexX].imageWidth = Math.ceil(this.cellWidth);
                            spriteXInfo[indexX].x = spriteXInfo[indexX - 1].x + Math.round(spriteXInfo[indexX - 1].imageWidth * spriteXInfo[indexX - 1].scaleX);
                            spriteXInfo[indexX].scaleX = Math.round(spriteXInfo[indexX].imageWidth * this.drawScaleX) / spriteXInfo[indexX].imageWidth;
                        }
                        indexX++;
                        spriteXInfo[indexX] = {};
                        spriteXInfo[indexX].imageX = Math.floor(this.cellWidth * 2 + this.cellWidth / 2);
                        spriteXInfo[indexX].imageWidth = Math.ceil(this.cellWidth / 2);
                        spriteXInfo[indexX].x = spriteXInfo[indexX - 1].x + Math.round(spriteXInfo[indexX - 1].imageWidth * spriteXInfo[indexX - 1].scaleX);
                        spriteXInfo[indexX].scaleX = Math.round(spriteXInfo[indexX].imageWidth * this.drawScaleX) / spriteXInfo[indexX].imageWidth;

                        var spriteYInfo = new Array(vertScreenCount + 1);
                        var indexY = 0;
                        spriteYInfo[indexY] = {};
                        spriteYInfo[indexY].imageY = Math.floor(locV + this.cellHeight * 2 + this.cellHeight / 2);
                        spriteYInfo[indexY].imageHeight = Math.ceil(this.cellHeight / 2);
                        spriteYInfo[indexY].y = Math.floor(originY);
                        spriteYInfo[indexY].scaleY = Math.round(spriteYInfo[indexY].imageHeight * this.drawScaleY) / spriteYInfo[indexY].imageHeight;
                        for(var j = 1; j < vertScreenCount; j++){
                            indexY++;
                            spriteYInfo[indexY] = {};
                            spriteYInfo[indexY].imageY = Math.floor(locV + this.cellHeight / 2);
                            spriteYInfo[indexY].imageHeight = Math.ceil(this.cellHeight);
                            spriteYInfo[indexY].y = spriteYInfo[indexY - 1].y + Math.round(spriteYInfo[indexY - 1].imageHeight * spriteYInfo[indexY - 1].scaleY);
                            spriteYInfo[indexY].scaleY = Math.round(spriteYInfo[indexY].imageHeight * this.drawScaleY) / spriteYInfo[indexY].imageHeight;
                        }
                        indexY++;
                        spriteYInfo[indexY] = {};
                        spriteYInfo[indexY].imageY = locV;
                        spriteYInfo[indexY].imageHeight = Math.ceil(this.cellHeight / 2);
                        spriteYInfo[indexY].y = spriteYInfo[indexY - 1].y + Math.round(spriteYInfo[indexY - 1].imageHeight * spriteYInfo[indexY - 1].scaleY);
                        spriteYInfo[indexY].scaleY = Math.round(spriteYInfo[indexY].imageHeight * this.drawScaleY) / spriteYInfo[indexY].imageHeight;

                        var sprite = null;
                        for(var x = 0; x < spriteXInfo.length; x++) {
                            for(var y = 0; y < spriteYInfo.length; y++) {
                                sprite = this.getMinimapSprite(spriteXInfo[x].imageX, spriteYInfo[y].imageY, spriteXInfo[x].imageWidth, spriteYInfo[y].imageHeight);
                                sprite.x = spriteXInfo[x].x;
                                sprite.y = spriteYInfo[y].y;
                                sprite.scaleX = spriteXInfo[x].scaleX;
                                sprite.scaleY = spriteYInfo[y].scaleY;
                                this.drawnSceneNodes[sceneId].push(sprite);
                                this.mapLayer.addChild(sprite);
                            }
                        }
                    }
                    var portalIds = Agtk.portals.getIdList();
                    var portalDisplay = obj.getValue(obj.showMiniMapParamValue, 4) == 2 ? true : false;
                    for(var i = 0; i < portalIds.length; i++){
                        var portal = Agtk.portals.get(portalIds[i]);
                        if(portal.a.sceneId == sceneId){
                            if((sceneDisplay && portalDisplay) || obj.internal.visitedSceneId.indexOf(sceneId) != -1){
                                this.drawPortal(portal.a, originX, originY, vertScreenCount);
                            }
                            var nextOrigin = this.getNextScenePosition(portal.a, portal.b, originX, originY);
                            this.drawSceneMinimap(portal.b.sceneId, nextOrigin.x, nextOrigin.y);
                        }
                        if(portal.b.sceneId == sceneId){
                            if((sceneDisplay && portalDisplay) || obj.internal.visitedSceneId.indexOf(sceneId) != -1){
                                this.drawPortal(portal.b, originX, originY, vertScreenCount);
                            }
                            var nextOrigin = this.getNextScenePosition(portal.b, portal.a, originX, originY);
                            this.drawSceneMinimap(portal.a.sceneId, nextOrigin.x, nextOrigin.y);
                        }
                    }
                }
            },
            getMinimapSprite: function(x, y, width, height){
                var sprite = cc.Sprite.create(this.imageTex, cc.rect(x, y, width, height));
                sprite.setAnchorPoint(0, 0);
                sprite.opacity = this.minimapOpacity;
                sprite.width = width;
                sprite.height = height;
                return sprite;
            },
            getNextScenePosition: function(basePortal, nextPortal, originX, originY){
                var origin = {};
                origin.x = originX;
                origin.y = originY;

                var baseScene = Agtk.scenes.get(basePortal.sceneId);
                var nextScene = Agtk.scenes.get(nextPortal.sceneId);
                var baseSceneWidth = Agtk.settings.screenWidth * baseScene.horzScreenCount;
                var baseSceneHeight = Agtk.settings.screenHeight * baseScene.vertScreenCount;

                var left0 = basePortal.x;
                var right1 = baseSceneWidth - (basePortal.x + basePortal.width);
                var up2 = basePortal.y;
                var down3 = baseSceneHeight - (basePortal.y + basePortal.height)

                var nearest = 0;
                var nearestDistance = left0;
                if(right1 < nearestDistance){
                    nearest = 1;
                    nearestDistance = right1;
                }
                if(up2 < nearestDistance){
                    nearest = 2;
                    nearestDistance = up2;
                }
                if(down3 < nearestDistance){
                    nearest = 3;
                    nearestDistance = down3;
                }

                var margin = obj.getValue(obj.showMiniMapParamValue, 5);
                if(margin === null){
                    margin = 0;
                }
                switch(nearest){
                    case 0:
                        origin.x -= this.scaledCellWidth * nextScene.horzScreenCount + margin;
                        origin.y += this.convertMinimapCoordY(basePortal.y + basePortal.height / 2, baseScene.vertScreenCount) - this.convertMinimapCoordY(nextPortal.y + nextPortal.height / 2, nextScene.vertScreenCount);
                        break;

                    case 1:
                        origin.x += this.scaledCellWidth * baseScene.horzScreenCount + margin;
                        origin.y += this.convertMinimapCoordY(basePortal.y + basePortal.height / 2, baseScene.vertScreenCount) - this.convertMinimapCoordY(nextPortal.y + nextPortal.height / 2, nextScene.vertScreenCount);
                        break;

                    case 2:
                        origin.x += this.convertMinimapCoordX(basePortal.x + basePortal.width / 2) - this.convertMinimapCoordX(nextPortal.x + nextPortal.width / 2);
                        origin.y += this.scaledCellHeight * baseScene.vertScreenCount + margin;
                        break;

                    case 3:
                        origin.x += this.convertMinimapCoordX(basePortal.x + basePortal.width / 2) - this.convertMinimapCoordX(nextPortal.x + nextPortal.width / 2);
                        origin.y -= this.scaledCellHeight * nextScene.vertScreenCount + margin;
                        break;
                }
                return origin;
            },
            drawPortal: function(portal, originX, originY, vertScreenCount){
                var rect = new cc.DrawNode();
                var x = originX + this.convertMinimapCoordX(portal.x);
                var y = originY + this.convertMinimapCoordY(portal.y, vertScreenCount);
                var width = this.convertMinimapWidth(portal.width);
                var height = this.convertMinimapHeight(portal.height);
                rect.drawRect(cc.p(x, y), cc.p(x + width, y - height), cc.color(255, 0, 0, this.minimapOpacity), 0, cc.color(255, 0, 0, this.minimapOpacity));
                this.mapLayer.addChild(rect, 1);
            },
            drawPlayerPosition: function(originX, originY, vertScreenCount){
                var playerSpriteMargin = 1;
                this.markerSprite = cc.Sprite.create(this.imageTex, cc.rect(0 + playerSpriteMargin, this.cellHeight * 9 + playerSpriteMargin, this.cellWidth - playerSpriteMargin * 2, this.cellHeight - playerSpriteMargin * 2));
                this.markerSprite.setAnchorPoint(0.5, 0.5);
                this.markerSprite.opacity = Math.round(this.minimapOpacity * ((Math.cos(obj.fadeFrame * 6 * Math.PI / 180) + 1) / 2));
                obj.fadeFrame = (obj.fadeFrame + 1) % 60;
                this.markerSprite.scaleX = this.drawScaleX;
                this.markerSprite.scaleY = this.drawScaleY;
                var instance = Agtk.objectInstances.get(this.instanceId);
                if(instance === null){
                    console.log("instance not found: " + this.instanceId);
                    return false;
                }
                var x = instance.variables.get(instance.variables.XId).getValue();
                var y = instance.variables.get(instance.variables.YId).getValue();
                this.markerSprite.x = originX + this.convertMinimapCoordX(x);
                this.markerSprite.y = originY + this.convertMinimapCoordY(y, vertScreenCount);
                this.mapLayer.addChild(this.markerSprite, 2);
                return true;
            },
            updatePlayerPosition: function(originX, originY, vertScreenCount){
                this.markerSprite.opacity = Math.round(this.minimapOpacity * ((Math.cos(obj.fadeFrame * 6 * Math.PI / 180) + 1) / 2));
                obj.fadeFrame = (obj.fadeFrame + 1) % 60;
                var instance = Agtk.objectInstances.get(this.instanceId);
                if(instance === null){
                    console.log("instance not found: " + this.instanceId);
                    return false;
                }
                var x = instance.variables.get(instance.variables.XId).getValue();
                var y = instance.variables.get(instance.variables.YId).getValue();
                this.markerSprite.x = originX + this.convertMinimapCoordX(x);
                this.markerSprite.y = originY + this.convertMinimapCoordY(y, vertScreenCount);
                return true;
            },
            convertMinimapCoordX: function(x){
                return this.convertMinimapWidth(x);
            },
            convertMinimapCoordY: function(y, vertScreenCount){
                return this.convertMinimapHeight(obj.screenHeight * vertScreenCount - 1 - y);
            },
            convertMinimapWidth: function(width){
                return width * this.scaledCellWidth / obj.screenWidth;
            },
            convertMinimapHeight: function(height){
                return height * this.scaledCellHeight / obj.screenHeight;
            },
            update: function(){
                var sceneId = Agtk.sceneInstances.getCurrent().sceneId;
                var lastSceneId = this.sceneId;
                var scene = Agtk.scenes.get(sceneId);
                var horzScreenCount = scene.horzScreenCount;
                var vertScreenCount = scene.vertScreenCount;
                if(this.sceneId != sceneId){
                    this.sceneId = sceneId;
                    if(this.fontDraw != null){
                        this.fontDraw.clearLetters();
                        this.fontUnderlineRect.removeFromParent();

                        var minimapName = scene.name;
                        for(var i = 0; i < minimapName.length; i++){
                            this.fontDraw.putLetter(minimapName[i]);
                        }
                        var rect = cc.DrawNode.create();
                        this.fontUnderlineRect = rect;
                        rect.drawSegment(cc.p(this.fontDraw.letterLayer.x, this.fontDraw.letterLayer.y - 16), cc.p(this.fontDraw.letterLayer.x + this.fontDraw.letterX, this.fontDraw.letterLayer.y - 16), 1, cc.color(255, 0, 0, 255));
                        this.addChild(rect);
                    }
                }

                var originX = (obj.screenWidth / 2) - (this.scaledCellWidth * horzScreenCount / 2);
                var originY = (obj.screenHeight / 2) - (this.scaledCellWidth * vertScreenCount / 2);
                if(this.sceneId != lastSceneId){
                    //シーンが変化したら、前のシーンと現在のシーンの色が変わるので更新する。
                    if(lastSceneId in this.drawnSceneNodes){
                        this.drawnSceneNodes[lastSceneId].forEach(function(node, index){
                            node.removeFromParent();
                        });
                        delete this.drawnSceneNodes[lastSceneId];
                    }
                    if(this.sceneId in this.drawnSceneNodes){
                        this.drawnSceneNodes[this.sceneId].forEach(function(node, index){
                            node.removeFromParent();
                        });
                        delete this.drawnSceneNodes[this.sceneId];
                    }
                    this.drawSceneMinimap(lastSceneId, originX, originY);
                    this.drawSceneMinimap(this.sceneId, originX, originY);
                }
                if(!this.updatePlayerPosition(originX, originY, vertScreenCount)){
                    return false;
                }
                return true;
            },
            onExit: function(){
                this._super();
                obj.minimapLayer = null;
            }
        });

        var agtkLayer = Agtk.sceneInstances.getCurrent().getMenuLayerById(Agtk.constants.systemLayers.HudLayerId);
        if(agtkLayer == null){
            return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorNext;
        }
        obj.minimapLayer = new MinimapLayer(obj.playerInstanceId);
        agtkLayer.addChild(obj.minimapLayer, 0, layerTag);
        //var result = obj.minimapLayer.updateMessage();
        //return result;
        return Agtk.constants.actionCommands.commandBehavior.CommandBehaviorBlock;
    };

    obj.updateMinimap = function()
    {
        var minimapLayer = obj.minimapLayer;
        if(minimapLayer == null){
            return;
        }

        obj.commandActive = true;
        minimapLayer.update();
    };

    obj.destroyMinimap = function()
    {
        if(obj.minimapLayer !== null){
            obj.minimapLayer.removeFromParent();
            obj.minimapLayer = null;
        }
    };

    obj.execLinkCondition = function(index, valueJson, objectId, instanceId, actionLinkId){
        console.log("execLinkCondition called: " + [index, JSON.stringify(valueJson), objectId, instanceId, actionLinkId].join(", "));
        if(index == 0){
            return obj.showing;
        }
        return false;
    };

    obj.update = function(dt){
        //console.log("update called: " + dt);
        var currentSceneInstance = Agtk.sceneInstances.getCurrent();
        if(currentSceneInstance !== null){
            if(obj.internal.visitedSceneId.indexOf(currentSceneInstance.sceneId) == -1){
                obj.internal.visitedSceneId.push(currentSceneInstance.sceneId);
            }
            if(obj.playerInstanceId == -1 || obj.currentSceneId != currentSceneInstance.sceneId){
                obj.playerInstanceId = Agtk.variables.get(Agtk.variables._1PInstanceId).getValue();
            }
            if(obj.currentSceneId != currentSceneInstance.sceneId){
                obj.currentSceneId = currentSceneInstance.sceneId;
            }
        }
        if(obj.playerInstanceId != -1 && obj.showing){
            obj.updateMinimap();
        }
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

    obj.FontDraw = function(layer, zIndex, fontData){
        this.letterX = 0;
        this.letterY = 0;
        this.letterSpacing = 0;
        this.lineSpacing = 0;
        this.fontData = fontData;
        this.imageFontFlag = fontData.imageFontFlag;
        if(this.imageFontFlag){
            var fontImageId = fontData.imageId;
            this.fixedWidth = fontData.fixedWidth;
            this.hankakuWidth = fontData.hankakuWidth;
            this.zenkakuWidth = fontData.zenkakuWidth;
            this.letterLayout = fontData.letterLayout;
            var fontImageData = Agtk.images.get(fontImageId);
            if(fontImageData == null){
                this.mode = this.kModeEnd;
                return false;
            }
            this.fontImageTex = cc.TextureCache.getInstance().addImage(fontImageData.filename);
            if(this.fontImageTex == null){
                return false;
            }
            this.fontImageTex.setAliasTexParameters();
            this.layoutLineList = this.letterLayout.split("\n");
            this.layoutLines = this.layoutLineList.length;
            var maxLetters = 0;
            for(var i = 0; i < this.layoutLineList.length; i++){
                maxLetters = Math.max(maxLetters, this.layoutLineList[i].length);
            }
            this.layoutLineLetters = maxLetters;
            this.letterWidth = Math.floor(this.fontImageTex.width / this.layoutLineLetters);
            this.letterHeight = Math.floor(this.fontImageTex.height / this.layoutLines);
        } else {
            this.fontSize = fontData.fontSize;
            this.letterHeight = fontData.fontSize;
            this.ttfFilename = "fonts/" + fontData.fontName + ".ttf";
            this.aliasThreshold = fontData.antialiasDisabled ? fontData.aliasThreshold : -1;
        }
        this.letterLayer = new cc.Layer();
        this.letterLayer.setAnchorPoint(0, 0);
        layer.addChild(this.letterLayer, zIndex);

        this.winHeight = this.letterHeight;
    };
    obj.FontDraw.prototype = {
        clearLetters: function(){
            this.letterLayer.removeAllChildren();
        },
        putLetter: function(letter){
            if(this.imageFontFlag){
                var isHankaku = (!letter.match(/[^\x01-\x7E]/) || !letter.match(/[^\uFF65-\uFF9F]/));
                var cx = -1;
                var cy = -1;
                for(var i = 0; i < this.layoutLineList.length; i++){
                    var index = this.layoutLineList[i].indexOf(letter);
                    if(index >= 0){
                        cx = index;
                        cy = i;
                        break;
                    }
                }
                if(cx >= 0 && cy >= 0){
                    var sprite = cc.Sprite.create(this.fontImageTex, cc.rect(cx * this.letterWidth, cy * this.letterHeight, this.letterWidth, this.letterHeight));
                    sprite.setAnchorPoint(0, 0);
                    sprite.x = this.letterX;
                    sprite.y = this.winHeight - 16 - this.letterHeight - this.letterY;
                    this.letterLayer.addChild(sprite);
                    this.letterX += (this.fixedWidth ? this.letterWidth : isHankaku ? this.hankakuWidth : this.zenkakuWidth) + this.letterSpacing;
                }
            } else {
                var label = new cc.LabelTTF(letter, this.ttfFilename, this.fontSize, undefined, undefined, undefined, this.aliasThreshold);
                label.color = cc.color(255, 255, 255);
                label.setAnchorPoint(0, 0);
                label.x = this.letterX;
                label.y = this.winHeight - 16 - this.fontSize - this.letterY;
                this.letterLayer.addChild(label);
                this.letterX += label.width + this.letterSpacing;
            }
        },
        newline: function(){
            this.letterX = 0;
            this.letterY += this.letterHeight + 8 + this.lineSpacing;
        }
    };

    return obj;
}())
