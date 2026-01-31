System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, resources, Sprite, SpriteFrame, assetManager, Texture2D, _dec, _class, _crd, eventTarget, ccclass, property, Game;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      assetManager = _cc.assetManager;
      Texture2D = _cc.Texture2D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "20d07XiJm9PZoGXUahNF55j", "Game_Turn3", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'resources', 'Sprite', 'SpriteFrame', 'assetManager', 'ImageAsset', 'Texture2D', 'Canvas']);

      eventTarget = new EventTarget();
      ({
        ccclass,
        property
      } = _decorator);

      _export("Game", Game = (_dec = ccclass('Game'), _dec(_class = class Game extends Component {
        constructor() {
          super(...arguments);
          this.sprite = new Sprite();
          this.sprite2 = new Sprite();
          this.spriteN2 = [];
        }

        onLoad() {
          resources.load('images/38-4/spriteFrame', SpriteFrame, (err, image) => {
            if (err) {
              console.log(err);
            }

            this.sprite = new Node('String(i)').addComponent(Sprite);
            this.node.getParent().addChild(this.sprite.node);
            this.sprite.spriteFrame = image;
            this.sprite.node.setPosition(0, 0, 0);
            this.sprite.node.setScale(0.5, 0.5, 0);
            console.log('image.height = ' + image.height);
            console.log('image.width = ' + image.width); // console.log('this.sprite.spriteFrame.height = '+ this.sprite.spriteFrame.texture.height);
            // console.log('this.sprite.spriteFrame.width = '+ this.sprite.spriteFrame.width);

            console.log('this.sprite.spriteFrame.originalSize = ' + this.sprite.spriteFrame.originalSize);
            console.log('this.sprite.spriteFrame.originalSize.height = ' + this.sprite.spriteFrame.originalSize.height);
            console.log('this.sprite.spriteFrame.originalSize.width = ' + this.sprite.spriteFrame.originalSize.width); //  console.log('this.sprite.spriteFrame.originalSize.x = '+this.sprite.spriteFrame.originalSize.x);
            //  console.log('this.sprite.spriteFrame.originalSize.y = '+this.sprite.spriteFrame.originalSize.y);
            // console.log('this.sprite.requestRenderData().getMeshBuffer() = '+ this.sprite.requestRenderData().getMeshBuffer());
            // this.sprite.spriteFrame.nativeUrl
            //this.sprite. 
            //  this.spriteN2[0] = [];
            //  this.spriteN2[0][0] = this.sprite;
            // console.log('array = '+ this.spriteN2[0][0]);
            // this.spriteN2[0][0].node.setPosition(100, -80, 0);
            // this.sprite_pos(this.spriteN2);
          }); // Use absolute path to load files on device storage
          // let absolutePath = "/dara/data/some/path/to/image.png"
          // let absolutePath =  "https://img.freepik.com/premium-photo/blue-city-car-with-blank-surface-for-your-creative-design-d-rendering_101266-5844.jpg?size=626&ext=jpg"
          // let absolutePath = "https://klike.net/uploads/posts/2019-01/1547367940_5.jpg"
          // let absolutePath = "https://www.corsproxy.com/klike.net/uploads/posts/2019-01/1547368065_29.jpg"
          // let absolutePath = "https://www.corsproxy.com/klike.net/uploads/posts/2019-01/1547368065_29.jpg"
          //let absolutePath = "https://klike.net/uploads/posts/2019-01/1547368031_32.jpg"
          // let absolutePath = "https:///www.corsproxy.com/klike.net/uploads/posts/2019-01/medium/1547368031_32.jpg"
          // let absolutePath = "https://bipbap.ru/wp-content/uploads/2017/08/kartinki24_horses_0006-1.jpg"

          var self = this; // let context = this;

          var absolutePath = "D:/ENGINES/Cocos/PROJECTS/103/Rect/f3.jpeg";
          var as = assetManager.loadRemote(absolutePath, function (err, imageAsset) {
            var spriteFrame = new SpriteFrame();
            var texture = new Texture2D(); // const sprite = new Sprite();

            texture.image = imageAsset;
            spriteFrame.texture = texture; // sprite.spriteFrame = spriteFrame;
            //this.sprite2 =  new Node('String(i)').addComponent(Sprite); 
            // Canvas.addChild(sprite.node);
            //   sprite.node.setPosition(100,100,0);
            // console.log(err);
            //this.sprite.spriteFrame = spriteFrame;
            // self.node.getComponent(Sprite).spriteFrame = spriteFrame;

            self.sprite.spriteFrame = spriteFrame; //context.sprite.spriteFrame = spriteFrame;

            console.log(spriteFrame); // ...
          }); // let a:any  = assetManager.assets.get('spriteFrame');
          // this.sprite.spriteFrame = a;
          // assetManager.resources.load(absolutePath, SpriteFrame, (err, image) => {
          //  this.sprite.spriteFrame = assetManager.assets[0];

          /*  this.sprite =  new Node('String(i)').addComponent(Sprite); 
           this.node.getParent().addChild(this.sprite.node);
           this.sprite.spriteFrame = image;
           this.sprite.node.setPosition(100,100,0);
           this.sprite.node.setScale(2,1,0);
           console.log('image.height = '+ image.height);
           console.log('image.width = '+ image.width);  */
          //  });
        }

        sprite_pos(spr) {
          spr[0] = [];
          spr[0][0] = this.sprite;
          spr[0][0].node.setPosition(200, 180, 0);
          spr[0][0].node.setRotationFromEuler(0, 0, 90);
          console.log('sprite = ' + this.sprite.node.angle);
          console.log('sprite_spr = ' + spr[0][0].node.angle); // for (let i = 0; i < this.row; i++) {
          //     for (let j = 0; j < this.col; j++) {
          // this.spriteN2[i][j].node.setPosition(100, 280, 0); 
          //     }
          // }
          //FileSystemDirectoryReader
          // FileUtils
        }

        start() {
          console.log('start'); // console.log('this.sprite.spriteFrame.height = '+ this.sprite.spriteFrame.height);
          // console.log('this.sprite.spriteFrame.width = '+ this.sprite.spriteFrame.width);

          this.sprite.node.setPosition(100, 0, 0);
        }

        update() {// console.log('this.sprite.spriteFrame.height = '+ this.sprite.spriteFrame.height);
          // console.log('this.sprite.spriteFrame.width = '+ this.sprite.spriteFrame.width);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=94a91071636dfaa6a0eb05264f373f0fb335f1ce.js.map