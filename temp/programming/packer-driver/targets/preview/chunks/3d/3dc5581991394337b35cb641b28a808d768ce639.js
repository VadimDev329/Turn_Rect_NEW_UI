System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, assetManager, SpriteFrame, Sprite, Texture2D, _dec, _class, _crd, ccclass, property, Test;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      assetManager = _cc.assetManager;
      SpriteFrame = _cc.SpriteFrame;
      Sprite = _cc.Sprite;
      Texture2D = _cc.Texture2D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6cb314o90xL86dkvdT0UzKn", "test", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'ImageAsset', 'assetManager', 'SpriteFrame', 'Sprite', 'Texture2D']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Predefined variables
       * Name = Test
       * DateTime = Fri Nov 05 2021 14:35:29 GMT+0800 (中国标准时间)
       * Author = muxiandong
       * FileBasename = test.ts
       * FileBasenameNoExtension = test
       * URL = db://assets/test.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
       *
       */

      _export("Test", Test = (_dec = ccclass('Test'), _dec(_class = class Test extends Component {
        constructor() {
          super(...arguments);
          this.sprite = new Sprite();
        }

        start() {
          // let remoteUrl = "http://***/image/favicon.jpeg";
          // let remoteUrl = "https://www.cocos.com/wp-content/themes/cocos/image/home/product/creator.png?v=1619330967"
          var remoteUrl = "D:/ENGINES/Cocos/PROJECTS/103/Rect/f3.jpeg";
          var self = this;
          assetManager.loadRemote(remoteUrl, function (err, imageAsset) {
            if (err) {
              console.log("err, reason:", err);
              return;
            }

            var spriteFrame = new SpriteFrame();
            var texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            self.sprite = new Node('String(i)').addComponent(Sprite);
            self.node.getParent().addChild(this.sprite.node);
            self.sprite.spriteFrame = spriteFrame;
            self.sprite.node.setPosition(100, 100, 0);
            self.sprite.node.setScale(2, 1, 0); //self.node.getComponent(Sprite).spriteFrame = spriteFrame;
            // self.node.getComponent(Sprite).spriteFrame = spriteFrame;
          });
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3dc5581991394337b35cb641b28a808d768ce639.js.map